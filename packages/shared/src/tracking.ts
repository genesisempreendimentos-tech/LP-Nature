/**
 * Contrato POST /api/tracking — analytics (Supabase acessos_nature).
 * Colunas confirmadas por dump/information_schema (2026-09-11).
 */

import type { UtmTouch } from "./utm"

export const TRACKING_CONSENT = ["aceito", "negado"] as const
export type TrackingConsent = (typeof TRACKING_CONSENT)[number]

/**
 * Campos sempre aceitos (cadastro simples).
 * `pagina` aqui = seção/página no site (ex. "/", "Formulário") — NÃO é pagina_origem.
 */
export const TRACKING_SIMPLE_FIELDS = [
  "sessao_id",
  "traffic_type",
  "origem_captura",
  "criado_em",
  "pagina",
  "origem",
] as const

/**
 * Campos só permitidos com consentimento === 'aceito'.
 * Se vierem com 'negado', o servidor descarta (não grava).
 */
export const TRACKING_COMPLETE_FIELDS = [
  "regiao",
  "user_agent",
  "dispositivo",
  "tempo_tela",
  "tempo_ativo",
  "scroll",
  "leitura",
  "score_engajamento",
  "tempo_leitura_estimado",
  "colaborador",
  "rede_nome",
  "usuario_id",
] as const

export type TrackingSimpleField = (typeof TRACKING_SIMPLE_FIELDS)[number]
export type TrackingCompleteField = (typeof TRACKING_COMPLETE_FIELDS)[number]

/** Body que o client pode enviar (`pagina_origem` nunca vem do client). */
export type TrackingClientPayload = {
  consentimento: TrackingConsent
  sessao_id: string
  /** smallint no banco — número (ex. 0, 5, 9). */
  traffic_type: number
  origem_captura: string
  criado_em: string
  /** Seção/página visitada (coluna `pagina`). Default servidor: "/". */
  pagina?: string
  /** Canal de origem (coluna `origem`). Default DB: "direto". */
  origem?: string
  /** First-touch UTM — essencial; independente de consentimento. */
  utm_first?: UtmTouch | null
  /** Last-touch UTM — essencial; independente de consentimento. */
  utm_last?: UtmTouch | null
} & Partial<Record<TrackingCompleteField, string | number | boolean | null>>

/**
 * Payload sanitizado + `pagina_origem` do servidor.
 * `consentimento` não é coluna — só controla o que entra no INSERT.
 * `is_bot` não entra no contrato: coluna GENERATED no banco a partir de traffic_type.
 */
export type TrackingSanitizedPayload = {
  pagina_origem: string | null
  consentimento: TrackingConsent
  sessao_id: string
  traffic_type: number
  origem_captura: string
  criado_em: string
  pagina: string
  origem?: string
  utm_first?: UtmTouch | null
  utm_last?: UtmTouch | null
} & Partial<Record<TrackingCompleteField, string | number | boolean | null>>

export type TrackingCreateResponse = {
  ok: true
  persisted: boolean
  id?: string
  discardedCompleteFields?: TrackingCompleteField[]
}
