import type { Consentimento } from "@nature/shared"

export const COOKIE_CONSENT_KEY = "nature_cookie_consent"
export const COOKIE_CONSENT_EVENT = "nature:cookie-consent"

export type CookieConsentValue = Consentimento

function normalizeStored(raw: string | null): CookieConsentValue | null {
  if (raw === "aceito" || raw === "pendente" || raw === "rejeitado") return raw
  // Legado acessos_nature
  if (raw === "negado") return "rejeitado"
  return null
}

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    const value = normalizeStored(raw)
    // Migra 'negado' → 'rejeitado' no storage
    if (raw === "negado" && value === "rejeitado") {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, "rejeitado")
    }
    return value
  } catch {
    return null
  }
}

/**
 * Valor efetivo para tracking: sem escolha → 'pendente' (opt-in LGPD).
 */
export function getTrackingConsent(): CookieConsentValue {
  return readCookieConsent() ?? "pendente"
}

export function writeCookieConsent(value: CookieConsentValue): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
  } catch {
    // storage bloqueado — tracking segue no default 'pendente'
  }
  try {
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_EVENT, { detail: { consentimento: value } }),
    )
  } catch {
    /* ignore */
  }
}
