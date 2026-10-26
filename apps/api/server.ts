import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"
import cors from "cors"
import express from "express"
import rateLimit from "express-rate-limit"
import type {
  LeadCreatePayload,
  LeadCreateResponse,
  LeadPatchPayload,
  LeadPatchResponse,
} from "../../packages/shared/src/lead.ts"
import {
  LEAD_PATCH_ALLOWLIST,
  LEAD_PATCH_BOOLEAN_FIELDS,
} from "../../packages/shared/src/lead.ts"
import { getPool } from "./db.mjs"
import {
  insertLeadCreate,
  LEADS_TABLE,
  ORIGEM_DETALHE,
  ORIGEM_TIPO,
} from "./leadCreateQuery.ts"
import { parseUtmTouch } from "./utm.ts"
import {
  extrairIp,
  registrarAceiteConsentimento,
  registrarEntrada,
  registrarSaida,
} from "./acessos/tracking.ts"
import type {
  AceitePayload,
  AcessoEntradaPayload,
  AcessoSaidaPayload,
} from "../../packages/shared/src/tracking.ts"

const monorepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
)
dotenv.config({ path: path.join(monorepoRoot, ".env") })
dotenv.config({ path: path.join(monorepoRoot, "apps/api/.env") })

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
// Campo do contrato PATCH → coluna em public.leads. Campos sem coluna
// equivalente (monthly_investment, profile_completed) são ignorados.
const PATCH_COLUMN_MAP: Partial<Record<keyof LeadPatchPayload, string>> = {
  relationship_status: "estado_civil",
  children_status: "filhos",
  profession: "profissao",
  monthly_income: "renda_familiar",
  sexo: "genero",
  current_city: "cidade",
  birth_date: "data_nascimento",
  profile_type: "perfil",
  whatsapp_clicked: "whatsapp_clicked",
}
const PORT = Number(process.env.API_PORT || 8787)
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN?.trim()

const BOOLEAN_FIELDS = new Set<string>(LEAD_PATCH_BOOLEAN_FIELDS)
const ALLOWLIST = new Set<string>(LEAD_PATCH_ALLOWLIST)

if (!ALLOWED_ORIGIN) {
  console.warn(
    "[nature-api] ALLOWED_ORIGIN vazio — CORS recusará browsers. Defina no .env.",
  )
}

function digitsOnly(value: unknown) {
  return String(value ?? "").replace(/\D/g, "")
}

function json(res: express.Response, status: number, data: unknown) {
  return res.status(status).json(data)
}

function validateCreateBody(body: Record<string, unknown>): {
  ok: boolean
  errors: Record<string, string>
  data: LeadCreatePayload
} {
  const errors: Record<string, string> = {}
  const nome = typeof body.nome === "string" ? body.nome.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const telefoneRaw =
    typeof body.telefone === "string" ? body.telefone.trim() : ""
  const telefoneDigits = digitsOnly(telefoneRaw)

  if (!nome) errors.nome = "Informe o nome."
  if (!email) errors.email = "Informe o e-mail."
  else if (!EMAIL_PATTERN.test(email)) errors.email = "E-mail inválido."
  if (telefoneDigits.length !== 11) {
    errors.telefone = "Telefone deve ter 11 dígitos (DDD + número)."
  }

  const data: LeadCreatePayload = {
    nome,
    email,
    telefone: telefoneDigits,
    utm_first: parseUtmTouch(body.utm_first),
    utm_last: parseUtmTouch(body.utm_last),
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data,
  }
}

function isValidIsoDate(value: string) {
  if (!DATE_PATTERN.test(value)) return false
  const [y, m, d] = value.split("-").map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  )
}

function parsePatchBody(body: Record<string, unknown>): {
  ok: boolean
  error?: string
  data: LeadPatchPayload
} {
  const data: LeadPatchPayload = {}
  let hasField = false

  for (const key of Object.keys(body)) {
    if (!ALLOWLIST.has(key)) {
      return { ok: false, error: `Campo não permitido: ${key}`, data: {} }
    }
    const value = body[key]
    hasField = true

    if (BOOLEAN_FIELDS.has(key)) {
      if (typeof value !== "boolean") {
        return {
          ok: false,
          error: `Campo ${key} deve ser boolean.`,
          data: {},
        }
      }
      if (key === "whatsapp_clicked") data.whatsapp_clicked = value
      if (key === "profile_completed") data.profile_completed = value
      continue
    }

    if (value === null) {
      ;(data as Record<string, string | null>)[key] = null
      continue
    }

    if (typeof value !== "string") {
      return {
        ok: false,
        error: `Campo ${key} deve ser string.`,
        data: {},
      }
    }

    const trimmed = value.trim()
    if (key === "birth_date") {
      if (!isValidIsoDate(trimmed)) {
        return {
          ok: false,
          error: "birth_date inválida. Use YYYY-MM-DD.",
          data: {},
        }
      }
      data.birth_date = trimmed
      continue
    }

    if (!trimmed) {
      return {
        ok: false,
        error: `Campo ${key} não pode ser vazio.`,
        data: {},
      }
    }

    ;(data as Record<string, string>)[key] = trimmed
  }

  if (!hasField) {
    return { ok: false, error: "Body vazio.", data: {} }
  }

  return { ok: true, data }
}

function toWebHeaders(req: express.Request): Headers {
  const h = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      for (const v of value) h.append(key, v)
    } else {
      h.set(key, value)
    }
  }
  return h
}

function trackingContext(req: express.Request) {
  return {
    headers: toWebHeaders(req),
    clientAddress: req.socket.remoteAddress,
  }
}

const app = express()
// trust proxy do Express NÃO é usado para extrairIp do tracking (ver TRUST_PROXY).
app.set("trust proxy", 1)
app.use(
  express.json({
    limit: "32kb",
    // sendBeacon com Blob costuma mandar text/plain ou application/json
    type: ["application/json", "text/plain"],
  }),
)

app.use(
  cors({
    origin(
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) {
      if (!origin) return callback(null, true)
      if (ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN) {
        return callback(null, true)
      }
      return callback(null, false)
    },
    methods: ["POST", "PATCH", "OPTIONS", "GET"],
    allowedHeaders: ["Content-Type"],
  }),
)

const leadCreateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
  },
})

const leadPatchLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
  },
})

const trackingLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator(req) {
    return (
      extrairIp(toWebHeaders(req), req.socket.remoteAddress) ||
      req.socket.remoteAddress ||
      "unknown"
    )
  },
  message: {
    error: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
  },
})

app.get("/api/health", (_req, res) => {
  json(res, 200, { ok: true, service: "nature-leads-api" })
})

app.post("/api/leads", leadCreateLimiter, async (req, res) => {
  const { ok, errors, data } = validateCreateBody(req.body ?? {})
  if (!ok) {
    return json(res, 400, { error: "Dados inválidos", fields: errors })
  }

  try {
    const pool = getPool()
    const inserted = await insertLeadCreate(pool, data)
    if ("error" in inserted) {
      return json(res, inserted.status, { error: inserted.error })
    }
    const response: LeadCreateResponse = { id: inserted.id }
    return json(res, 201, response)
  } catch (err) {
    console.error("[nature-api] POST /api/leads falhou:", err)
    return json(res, 500, {
      error: "Erro ao salvar contato. Tente novamente.",
    })
  }
})

app.patch("/api/leads/:id", leadPatchLimiter, async (req, res) => {
  const id = String(req.params.id ?? "").trim()
  if (!UUID_PATTERN.test(id)) {
    return json(res, 400, { error: "ID inválido." })
  }

  const parsed = parsePatchBody(
    (req.body && typeof req.body === "object" ? req.body : {}) as Record<
      string,
      unknown
    >,
  )
  if (!parsed.ok) {
    return json(res, 400, { error: parsed.error ?? "Dados inválidos" })
  }

  const setFragments: string[] = []
  const values: unknown[] = []
  let i = 1
  for (const [field, value] of Object.entries(parsed.data)) {
    // Coluna vem só do PATCH_COLUMN_MAP — seguro para interpolar como identificador.
    const col = PATCH_COLUMN_MAP[field as keyof LeadPatchPayload]
    if (!col || value === undefined) continue
    setFragments.push(`${col} = $${i}`)
    values.push(value)
    i += 1
  }
  setFragments.push(`updated_at = now()`)
  values.push(id, ORIGEM_TIPO, ORIGEM_DETALHE)

  try {
    const pool = getPool()
    const result = await pool.query(
      `UPDATE ${LEADS_TABLE}
       SET ${setFragments.join(", ")}
       WHERE id = $${i} AND origem_tipo = $${i + 1} AND origem_detalhe = $${i + 2}
       RETURNING id`,
      values,
    )
    const updatedId = String(result.rows[0]?.id ?? "")
    if (!updatedId) {
      return json(res, 404, { error: "Lead não encontrado." })
    }
    const response: LeadPatchResponse = { id: updatedId }
    return json(res, 200, response)
  } catch (err) {
    console.error("[nature-api] PATCH /api/leads falhou:", err)
    const pgErr = err as { code?: string }
    if (pgErr?.code === "22P02") {
      return json(res, 400, { error: "Valor inválido para o campo." })
    }
    if (pgErr?.code === "23514") {
      return json(res, 400, {
        error: "Valor fora do permitido para este campo.",
      })
    }
    return json(res, 500, {
      error: "Erro ao atualizar contato. Tente novamente.",
    })
  }
})

/**
 * Analytics unificado → acessos_user.
 * Erros de banco / validação: log + 204 (nunca quebra a página).
 */
app.post("/api/tracking", trackingLimiter, async (req, res) => {
  try {
    await registrarEntrada(
      (req.body ?? {}) as AcessoEntradaPayload,
      trackingContext(req),
    )
  } catch (err) {
    console.error("[nature-api] POST /api/tracking falhou:", err)
  }
  return res.status(204).end()
})

app.post("/api/tracking/saida", trackingLimiter, async (req, res) => {
  try {
    await registrarSaida(
      (req.body ?? {}) as AcessoSaidaPayload,
      trackingContext(req),
    )
  } catch (err) {
    console.error("[nature-api] POST /api/tracking/saida falhou:", err)
  }
  return res.status(204).end()
})

app.patch("/api/tracking/consentimento", trackingLimiter, async (req, res) => {
  try {
    await registrarAceiteConsentimento(
      (req.body ?? {}) as AceitePayload,
      trackingContext(req),
    )
  } catch (err) {
    console.error(
      "[nature-api] PATCH /api/tracking/consentimento falhou:",
      err,
    )
  }
  return res.status(204).end()
})

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("[nature-api]", err)
    if (res.headersSent) return next(err)
    return json(res, 500, { error: "Erro interno." })
  },
)

app.listen(PORT, () => {
  console.log(
    `[nature-api] leads + tracking (entrada/saida/consentimento) em http://localhost:${PORT} (CORS: ${ALLOWED_ORIGIN || "não definido"})`,
  )
})
