import type { LeadCreatePayload } from "../../packages/shared/src/lead.ts"
import { flattenUtmColumns } from "./utm.ts"

/** Tabela única de leads (Neon) compartilhada por todas as LPs. */
export const LEADS_TABLE = "public.leads"
export const ORIGEM_TIPO = "site"
export const ORIGEM_DETALHE = "lpe"
export const ORIGEM_EMPREENDIMENTO = "Nature"

/**
 * Monta o INSERT de cadastro (POST /api/leads).
 * Extraído só para teste com cliente SQL simulado — mesmo SQL/valores do handler.
 */
export function buildLeadCreateQuery(data: LeadCreatePayload): {
  text: string
  values: unknown[]
} {
  const first = flattenUtmColumns("utm_first", data.utm_first)
  const last = flattenUtmColumns("utm_last", data.utm_last)
  const text = `INSERT INTO ${LEADS_TABLE}
         (nome, email, telefone, empreendimento_interesse,
          origem_tipo, origem_detalhe,
          utm_first_source, utm_first_medium, utm_first_campaign, utm_first_term,
          utm_first_content, utm_first_landing_page, utm_first_referrer, utm_first_at,
          utm_last_source, utm_last_medium, utm_last_campaign, utm_last_term,
          utm_last_content, utm_last_landing_page, utm_last_referrer, utm_last_at)
       VALUES ($1, $2, $3, $4,
          $5, $6,
          $7, $8, $9, $10, $11, $12, $13, $14,
          $15, $16, $17, $18, $19, $20, $21, $22)
       RETURNING id`
  const values = [
    data.nome,
    data.email,
    data.telefone,
    ORIGEM_EMPREENDIMENTO,
    ORIGEM_TIPO,
    ORIGEM_DETALHE,
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
  ]
  return { text, values }
}

/** Executa o INSERT; pool.query é o único I/O (testável com mock). */
export async function insertLeadCreate(
  pool: { query: (text: string, values: unknown[]) => Promise<{ rows: { id?: unknown }[] }> },
  data: LeadCreatePayload,
): Promise<{ id: string } | { error: string; status: number }> {
  const { text, values } = buildLeadCreateQuery(data)
  try {
    const result = await pool.query(text, values)
    const insertedId = String(result.rows[0]?.id ?? "")
    if (!insertedId) {
      return { error: "Erro ao salvar contato. Tente novamente.", status: 500 }
    }
    return { id: insertedId }
  } catch (err) {
    console.error("[nature-api] POST /api/leads falhou:", err)
    return { error: "Erro ao salvar contato. Tente novamente.", status: 500 }
  }
}
