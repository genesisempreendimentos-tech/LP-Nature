/**
 * Contrato unificado de acessos — POST/PATCH /api/tracking*
 * Persistência: public.acessos_user (Supabase).
 */

export const CONSENTIMENTO = ["pendente", "aceito", "rejeitado"] as const
export type Consentimento = (typeof CONSENTIMENTO)[number]

/** @deprecated Use Consentimento. Alias durante migração de imports. */
export type TrackingConsent = Consentimento

export type OrigemBruta = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  click_id?: string
  click_id_tipo?: string
  /** URL completa do document.referrer, se houver. */
  referrer?: string
}

/** Body de POST /api/tracking (entrada / pageview). */
export type AcessoEntradaPayload = {
  id: string
  caminho: string
  titulo?: string
  /** ISO 8601 */
  ocorrido_em: string
  consentimento: Consentimento
  origem_bruta?: OrigemBruta
  /** Somente quando consentimento === 'aceito'. */
  sessao_id?: string
}

/** Body de POST /api/tracking/saida (pagehide / hidden). */
export type AcessoSaidaPayload = {
  id: string
  permanencia_s?: number
  ativo_s?: number
  scroll_pct?: number
  leu_conteudo?: boolean
  clicou_whatsapp?: boolean
  /** Segundos visíveis por seção (chave = data-section). */
  secoes?: Record<string, number>
}

/** Body de PATCH /api/tracking/consentimento. */
export type AceitePayload = {
  id: string
  sessao_id: string
}
