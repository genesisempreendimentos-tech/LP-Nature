/**
 * UTM first/last-touch — shape compartilhado (cookies, leads, tracking).
 * Operação de negócio / atribuição; independente de consentimento de analytics.
 */

export type UtmTouch = {
  source: string | null
  medium: string | null
  campaign: string | null
  term: string | null
  content: string | null
  landing_page: string
  referrer: string | null
  captured_at: string
}

export type UtmPair = {
  utm_first: UtmTouch | null
  utm_last: UtmTouch | null
}
