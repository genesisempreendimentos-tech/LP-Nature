import { randomUUID } from "node:crypto"
import {
  TRACKING_COMPLETE_FIELDS,
  TRACKING_CONSENT,
  type TrackingCompleteField,
  type TrackingConsent,
  type TrackingSanitizedPayload,
} from "../../packages/shared/src/tracking.ts"
import type { UtmTouch } from "../../packages/shared/src/utm.ts"
import { flattenUtmColumns, parseUtmTouch } from "./utm.ts"

const COMPLETE_SET = new Set<string>(TRACKING_COMPLETE_FIELDS)
const CONSENT_SET = new Set<string>(TRACKING_CONSENT)

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/** Valor neutro quando `dispositivo` (NOT NULL) não pode ser gravado (consentimento negado). */
const DISPOSITIVO_OMITIDO = "desconhecido"
const DISPOSITIVO_ALLOWED = new Set([
  "desktop",
  "mobile",
  "tablet",
  "bot",
  "desconhecido",
])

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isIsoLike(value: string): boolean {
  const t = Date.parse(value)
  return Number.isFinite(t)
}

function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value.trim())
}

/** Aceita number ou string numérica; retorna int truncado ou null. */
function toOptionalInt(value: unknown): number | null | undefined {
  if (value === null) return null
  if (value === undefined) return undefined
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.trunc(value)
  }
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value)
    if (Number.isFinite(n)) return Math.trunc(n)
  }
  return undefined
}

/**
 * Valida e sanitiza o body de POST /api/tracking.
 * - `pagina_origem` sempre vem do servidor (nunca do client).
 * - Com consentimento "negado", campos "completo" são descartados.
 */
export function parseTrackingBody(
  body: Record<string, unknown>,
  paginaOrigemServidor: string | null,
): {
  ok: boolean
  error?: string
  data?: TrackingSanitizedPayload
  discardedCompleteFields: TrackingCompleteField[]
} {
  const discardedCompleteFields: TrackingCompleteField[] = []

  if (!body || typeof body !== "object") {
    return { ok: false, error: "Body inválido.", discardedCompleteFields }
  }

  const consentRaw = body.consentimento
  if (typeof consentRaw !== "string" || !CONSENT_SET.has(consentRaw)) {
    return {
      ok: false,
      error: 'consentimento deve ser "aceito" ou "negado".',
      discardedCompleteFields,
    }
  }
  const consentimento = consentRaw as TrackingConsent

  if (!isNonEmptyString(body.sessao_id) || !isUuid(body.sessao_id)) {
    return {
      ok: false,
      error: "sessao_id deve ser um UUID válido.",
      discardedCompleteFields,
    }
  }

  const trafficType = toOptionalInt(body.traffic_type)
  if (trafficType === undefined || trafficType === null) {
    return {
      ok: false,
      error: "traffic_type deve ser um inteiro.",
      discardedCompleteFields,
    }
  }

  if (!isNonEmptyString(body.origem_captura)) {
    return {
      ok: false,
      error: "origem_captura é obrigatório.",
      discardedCompleteFields,
    }
  }
  if (!isNonEmptyString(body.criado_em) || !isIsoLike(body.criado_em.trim())) {
    return {
      ok: false,
      error: "criado_em deve ser data/hora ISO válida.",
      discardedCompleteFields,
    }
  }

  // Coluna `pagina` (seção) — distinta de `pagina_origem`.
  const paginaSecao = isNonEmptyString(body.pagina)
    ? body.pagina.trim()
    : "/"

  const data: TrackingSanitizedPayload = {
    pagina_origem: paginaOrigemServidor,
    consentimento,
    sessao_id: body.sessao_id.trim(),
    traffic_type: trafficType,
    origem_captura: body.origem_captura.trim(),
    criado_em: body.criado_em.trim(),
    pagina: paginaSecao,
  }

  if (isNonEmptyString(body.origem)) {
    data.origem = body.origem.trim()
  }

  // UTM — essencial; independente de consentimento.
  data.utm_first = parseUtmTouch(body.utm_first)
  data.utm_last = parseUtmTouch(body.utm_last)

  // Client pode tentar mandar pagina_origem — ignorado (garantia server-side).
  void body.pagina_origem

  for (const key of TRACKING_COMPLETE_FIELDS) {
    if (!(key in body) || body[key] === undefined) continue

    if (consentimento === "negado") {
      discardedCompleteFields.push(key)
      continue
    }

    const value = body[key]

    if (key === "usuario_id") {
      if (value === null) {
        data.usuario_id = null
        continue
      }
      if (typeof value !== "string" || !isUuid(value)) {
        return {
          ok: false,
          error: "usuario_id deve ser UUID ou null.",
          discardedCompleteFields,
        }
      }
      data.usuario_id = value.trim()
      continue
    }

    if (
      key === "tempo_tela" ||
      key === "tempo_ativo" ||
      key === "scroll" ||
      key === "score_engajamento" ||
      key === "tempo_leitura_estimado"
    ) {
      const n = toOptionalInt(value)
      if (n === undefined) {
        return {
          ok: false,
          error: `Campo ${key} deve ser inteiro ou null.`,
          discardedCompleteFields,
        }
      }
      data[key] = n
      continue
    }

    if (key === "colaborador" || key === "leitura") {
      if (value !== null && typeof value !== "boolean") {
        return {
          ok: false,
          error: `Campo ${key} deve ser boolean ou null.`,
          discardedCompleteFields,
        }
      }
      data[key] = value as boolean | null
      continue
    }

    // regiao, user_agent, dispositivo, rede_nome — text (regiao: nullable, tipo frouxo)
    if (key === "dispositivo") {
      if (value === null || typeof value !== "string" || !DISPOSITIVO_ALLOWED.has(value.trim())) {
        return {
          ok: false,
          error:
            'dispositivo deve ser "desktop", "mobile", "tablet", "bot" ou "desconhecido".',
          discardedCompleteFields,
        }
      }
      data.dispositivo = value.trim()
      continue
    }

    if (value !== null && typeof value !== "string") {
      // regiao: não forçar tipo — se vier number por engano, stringify leve
      if (key === "regiao" && (typeof value === "number" || typeof value === "boolean")) {
        data.regiao = String(value)
        continue
      }
      return {
        ok: false,
        error: `Campo ${key} com tipo inválido.`,
        discardedCompleteFields,
      }
    }
    data[key] = value as string | null
  }

  for (const key of Object.keys(body)) {
    if (
      key === "pagina" ||
      key === "pagina_origem" ||
      key === "origem" ||
      key === "consentimento" ||
      key === "sessao_id" ||
      key === "traffic_type" ||
      key === "origem_captura" ||
      key === "criado_em" ||
      key === "utm_first" ||
      key === "utm_last" ||
      COMPLETE_SET.has(key)
    ) {
      continue
    }
  }

  return { ok: true, data, discardedCompleteFields }
}

/** Linha pronta para supabase.from('acessos_nature').insert(...) */
export type AcessosNatureInsertRow = {
  id: string
  criado_em: string
  pagina: string
  pagina_origem: string | null
  sessao_id: string
  traffic_type: number
  origem_captura: string
  origem?: string
  dispositivo: string
  tempo_tela?: number
  tempo_ativo?: number | null
  scroll?: number | null
  leitura?: boolean | null
  score_engajamento?: number | null
  tempo_leitura_estimado?: number | null
  colaborador?: boolean
  rede_nome?: string | null
  regiao?: string | null
  user_agent?: string | null
  usuario_id?: string | null
  utm_first_source?: string | null
  utm_first_medium?: string | null
  utm_first_campaign?: string | null
  utm_first_term?: string | null
  utm_first_content?: string | null
  utm_first_landing_page?: string | null
  utm_first_referrer?: string | null
  utm_first_at?: string | null
  utm_last_source?: string | null
  utm_last_medium?: string | null
  utm_last_campaign?: string | null
  utm_last_term?: string | null
  utm_last_content?: string | null
  utm_last_landing_page?: string | null
  utm_last_referrer?: string | null
  utm_last_at?: string | null
}

export function toAcessosNatureRow(
  data: TrackingSanitizedPayload,
): AcessosNatureInsertRow {
  const utmFirst = flattenUtmColumns("utm_first", data.utm_first)
  const utmLast = flattenUtmColumns("utm_last", data.utm_last)

  const row: AcessosNatureInsertRow = {
    id: randomUUID(),
    criado_em: data.criado_em,
    pagina: data.pagina,
    pagina_origem: data.pagina_origem,
    sessao_id: data.sessao_id,
    traffic_type: data.traffic_type,
    origem_captura: data.origem_captura,
    // dispositivo é NOT NULL sem default — placeholder se consentimento negado / ausente
    dispositivo:
      typeof data.dispositivo === "string" && data.dispositivo.trim()
        ? data.dispositivo.trim()
        : DISPOSITIVO_OMITIDO,
    ...utmFirst,
    ...utmLast,
  }

  if (data.origem) row.origem = data.origem

  if (data.consentimento !== "aceito") {
    return row
  }

  if (typeof data.tempo_tela === "number") row.tempo_tela = data.tempo_tela
  if (data.tempo_ativo !== undefined) row.tempo_ativo = data.tempo_ativo as number | null
  if (data.scroll !== undefined) row.scroll = data.scroll as number | null
  if (data.leitura !== undefined) row.leitura = data.leitura as boolean | null
  if (data.score_engajamento !== undefined) {
    row.score_engajamento = data.score_engajamento as number | null
  }
  if (data.tempo_leitura_estimado !== undefined) {
    row.tempo_leitura_estimado = data.tempo_leitura_estimado as number | null
  }
  if (typeof data.colaborador === "boolean") row.colaborador = data.colaborador
  if (data.rede_nome !== undefined) row.rede_nome = data.rede_nome as string | null
  if (data.regiao !== undefined) row.regiao = data.regiao as string | null
  if (data.user_agent !== undefined) {
    row.user_agent = data.user_agent as string | null
  }
  if (data.usuario_id !== undefined) {
    row.usuario_id = data.usuario_id as string | null
  }

  return row
}

// re-export type for callers that need UtmTouch through this module
export type { UtmTouch }
