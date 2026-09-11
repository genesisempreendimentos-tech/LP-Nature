import type { TrackingConsent } from "@nature/shared"

export const COOKIE_CONSENT_KEY = "nature_cookie_consent"
export const COOKIE_CONSENT_EVENT = "nature:cookie-consent"

export type CookieConsentValue = TrackingConsent

function isConsent(value: unknown): value is CookieConsentValue {
  return value === "aceito" || value === "negado"
}

/** Lê a escolha salva; `null` = ainda não decidiu. */
export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    return isConsent(raw) ? raw : null
  } catch {
    return null
  }
}

/**
 * Valor efetivo para tracking: sem escolha → 'negado' (opt-in LGPD).
 * Não implica que o banner já tenha sido respondido.
 */
export function getTrackingConsent(): CookieConsentValue {
  return readCookieConsent() ?? "negado"
}

export function writeCookieConsent(value: CookieConsentValue): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
  } catch {
    // storage bloqueado — tracking segue no default 'negado'
  }
  try {
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_EVENT, { detail: { consentimento: value } }),
    )
  } catch {
    // ignore
  }
}
