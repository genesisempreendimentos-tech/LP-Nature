import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"
import cors from "cors"
import express from "express"
import rateLimit from "express-rate-limit"
import type { LeadCreatePayload, LeadCreateResponse } from "../../packages/shared/src/lead.ts"
import { LEAD_PATCH_ALLOWLIST } from "../../packages/shared/src/lead.ts"
import { getLeadsTableName, getPool } from "./db.mjs"

// Reserva fase 2 (PATCH / LGPD) — contrato tipado em packages/shared.
void LEAD_PATCH_ALLOWLIST

const monorepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
)
dotenv.config({ path: path.join(monorepoRoot, ".env") })

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PAGINA_ORIGEM =
  process.env.PAGINA_ORIGEM?.trim() || "Página de Vendas"
const PORT = Number(process.env.API_PORT || 8787)
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN?.trim()

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

function validateBody(body: Record<string, unknown>): {
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
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data,
  }
}

const app = express()
app.set("trust proxy", 1)
app.use(express.json({ limit: "32kb" }))

app.use(
  cors({
    origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (!origin) return callback(null, true)
      if (ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN) {
        return callback(null, true)
      }
      return callback(null, false)
    },
    methods: ["POST", "OPTIONS", "GET"],
    allowedHeaders: ["Content-Type"],
  }),
)

const leadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
  },
})

app.get("/api/health", (_req, res) => {
  json(res, 200, { ok: true, service: "nature-leads-api" })
})

app.post("/api/leads", leadLimiter, async (req, res) => {
  const { ok, errors, data } = validateBody(req.body ?? {})
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
    const result = await pool.query(
      `INSERT INTO ${table}
         (name, email, phone, pagina_origem)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [data.nome, data.email, data.telefone, PAGINA_ORIGEM],
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

app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("[nature-api]", err)
  if (res.headersSent) return next(err)
  return json(res, 500, { error: "Erro interno." })
})

app.listen(PORT, () => {
  console.log(
    `[nature-api] POST /api/leads em http://localhost:${PORT} (CORS: ${ALLOWED_ORIGIN || "não definido"})`,
  )
})
