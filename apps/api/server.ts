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
import { getLeadsTableName, getPool } from "./db.mjs"
import { parseTrackingBody, toAcessosNatureRow } from "./tracking.ts"
import { flattenUtmColumns, parseUtmTouch } from "./utm.ts"
import { getSupabaseAdmin } from "./supabase.ts"

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
const PAGINA_ORIGEM =
  process.env.PAGINA_ORIGEM?.trim() || "Página de Vendas"
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
    telefone: telefoneRaw || telefoneDigits,
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

const app = express()
app.set("trust proxy", 1)
app.use(express.json({ limit: "32kb" }))

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
  windowMs: 10 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
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

  let table: string
  try {
    table = getLeadsTableName()
  } catch (err) {
    console.error((err as Error).message)
    return json(res, 503, {
      error:
        "API não configurada (tabela). Use banco de desenvolvimento até o admin confirmar.",
    })
  }

  try {
    const pool = getPool()
    const first = flattenUtmColumns("utm_first", data.utm_first)
    const last = flattenUtmColumns("utm_last", data.utm_last)
    // canal/parameter: NÃO popular com utm_source/campaign — valores históricos
    // em site_nature são rótulos humanos (Facebook, Site, Whatsapp…), não UTM cru.
    const result = await pool.query(
      `INSERT INTO ${table}
         (name, email, phone, pagina_origem,
          utm_first_source, utm_first_medium, utm_first_campaign, utm_first_term,
          utm_first_content, utm_first_landing_page, utm_first_referrer, utm_first_at,
          utm_last_source, utm_last_medium, utm_last_campaign, utm_last_term,
          utm_last_content, utm_last_landing_page, utm_last_referrer, utm_last_at)
       VALUES ($1, $2, $3, $4,
          $5, $6, $7, $8, $9, $10, $11, $12,
          $13, $14, $15, $16, $17, $18, $19, $20)
       RETURNING id`,
      [
        data.nome,
        data.email,
        data.telefone,
        PAGINA_ORIGEM,
        first.utm_first_source,
        first.utm_first_medium,
        first.utm_first_campaign,
        first.utm_first_term,
        first.utm_first_content,
        first.utm_first_landing_page,
        first.utm_first_referrer,
        first.utm_first_at,
        last.utm_last_source,
        last.utm_last_medium,
        last.utm_last_campaign,
        last.utm_last_term,
        last.utm_last_content,
        last.utm_last_landing_page,
        last.utm_last_referrer,
        last.utm_last_at,
      ],
    )
    const insertedId = String(result.rows[0]?.id ?? "")
    if (!insertedId) {
      return json(res, 500, { error: "Erro ao salvar contato. Tente novamente." })
    }
    const response: LeadCreateResponse = { id: insertedId }
    return json(res, 201, response)
  } catch (err) {
    console.error("[nature-api] POST /api/leads falhou:", err)
    const pgErr = err as { code?: string }
    if (pgErr?.code === "23505") {
      return json(res, 409, {
        error:
          "Esse e-mail já está cadastrado. Nossa equipe já tem seu contato.",
      })
    }
    if (pgErr?.code === "42P01") {
      return json(res, 503, {
        error:
          "Tabela de leads não encontrada. Confirme LEADS_TABLE_NAME com o admin (dev only).",
      })
    }
    if (pgErr?.code === "42703") {
      return json(res, 503, {
        error:
          "Coluna ausente no schema (pagina_origem?). Migration pendente com o admin.",
      })
    }
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

  let table: string
  try {
    table = getLeadsTableName()
  } catch (err) {
    console.error((err as Error).message)
    return json(res, 503, {
      error:
        "API não configurada (tabela). Use banco de desenvolvimento até o admin confirmar.",
    })
  }

  const entries = Object.entries(parsed.data).filter(
    ([, value]) => value !== undefined,
  )
  if (entries.length === 0) {
    return json(res, 400, { error: "Body vazio." })
  }

  const setFragments: string[] = []
  const values: unknown[] = []
  let i = 1
  for (const [col, value] of entries) {
    // col vem só da allowlist — seguro para interpolar como identificador.
    setFragments.push(`${col} = $${i}`)
    values.push(value)
    i += 1
  }
  setFragments.push(`updated_at = now()`)
  values.push(id)

  try {
    const pool = getPool()
    const result = await pool.query(
      `UPDATE ${table}
       SET ${setFragments.join(", ")}
       WHERE id = $${i}
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
    if (pgErr?.code === "42703") {
      return json(res, 503, {
        error: "Coluna ausente no schema. Migration pendente com o admin.",
      })
    }
    return json(res, 500, {
      error: "Erro ao atualizar contato. Tente novamente.",
    })
  }
})

/**
 * Analytics / acessos — validação + INSERT em acessos_nature (Supabase).
 * `pagina_origem` só do servidor (PAGINA_ORIGEM). consentimento não é coluna.
 */
app.post("/api/tracking", trackingLimiter, async (req, res) => {
  const parsed = parseTrackingBody(
    (req.body && typeof req.body === "object" ? req.body : {}) as Record<
      string,
      unknown
    >,
    PAGINA_ORIGEM || null,
  )

  if (!parsed.ok || !parsed.data) {
    return json(res, 400, { error: parsed.error ?? "Dados inválidos" })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return json(res, 503, {
      error: "Tracking não configurado (Supabase). Verifique o .env da API.",
    })
  }

  const row = toAcessosNatureRow(parsed.data)

  try {
    const { data: inserted, error } = await supabase
      .from("acessos_nature")
      .insert(row)
      .select("id")
      .single()

    if (error) {
      console.error("[nature-api] INSERT acessos_nature falhou:", error)
      return json(res, 500, {
        error: "Erro ao registrar acesso. Tente novamente.",
      })
    }

    return json(res, 200, {
      ok: true,
      persisted: true,
      id: inserted?.id ?? row.id,
      ...(parsed.discardedCompleteFields.length > 0
        ? { discardedCompleteFields: parsed.discardedCompleteFields }
        : {}),
    })
  } catch (err) {
    console.error("[nature-api] POST /api/tracking falhou:", err)
    return json(res, 500, {
      error: "Erro ao registrar acesso. Tente novamente.",
    })
  }
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
    `[nature-api] POST/PATCH /api/leads + POST /api/tracking em http://localhost:${PORT} (CORS: ${ALLOWED_ORIGIN || "não definido"})`,
  )
})
