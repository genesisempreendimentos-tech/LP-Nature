/**
 * Captura e persistência UTM (first-touch / last-touch).
 * Roda sempre — essencial/operação de negócio, independente do banner LGPD.
 */

import type { UtmPair, UtmTouch } from "@nature/shared"

export type { UtmTouch, UtmPair }

const COOKIE_FIRST = "nature_utm_first"
const COOKIE_LAST = "nature_utm_last"
/** 30 dias */
const MAX_AGE_SEC = 2592000

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const prefix = `${encodeURIComponent(name)}=`
  for (const part of document.cookie.split(";")) {
    const trimmed = part.trim()
    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.slice(prefix.length))
    }
  }
  return null
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return
  document.cookie = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${MAX_AGE_SEC}`,
    "SameSite=Lax",
  ].join("; ")
}

function parseTouch(raw: string | null): UtmTouch | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<UtmTouch>
    if (!data || typeof data !== "object") return null
    if (typeof data.landing_page !== "string" || typeof data.captured_at !== "string") {
      return null
    }
    return {
      source: typeof data.source === "string" ? data.source : null,
      medium: typeof data.medium === "string" ? data.medium : null,
      campaign: typeof data.campaign === "string" ? data.campaign : null,
      term: typeof data.term === "string" ? data.term : null,
      content: typeof data.content === "string" ? data.content : null,
      landing_page: data.landing_page,
      referrer: typeof data.referrer === "string" ? data.referrer : null,
      captured_at: data.captured_at,
    }
  } catch {
    return null
  }
}

function campaignKey(touch: Pick<UtmTouch, "source" | "medium" | "campaign" | "term" | "content">) {
  return [
    touch.source ?? "",
    touch.medium ?? "",
    touch.campaign ?? "",
    touch.term ?? "",
    touch.content ?? "",
  ].join("\0")
}

function paramOrNull(params: URLSearchParams, key: string): string | null {
  const v = params.get(key)?.trim()
  return v ? v.slice(0, 200) : null
}

/** Lê UTMs da URL atual; null se nenhum utm_* presente. */
function readUrlTouch(): UtmTouch | null {
  if (typeof window === "undefined") return null
  const params = new URLSearchParams(window.location.search)
  const hasUtm = UTM_KEYS.some((key) => {
    const v = params.get(key)?.trim()
    return Boolean(v)
  })
  if (!hasUtm) return null

  return {
    source: paramOrNull(params, "utm_source"),
    medium: paramOrNull(params, "utm_medium"),
    campaign: paramOrNull(params, "utm_campaign"),
    term: paramOrNull(params, "utm_term"),
    content: paramOrNull(params, "utm_content"),
    landing_page: window.location.pathname || "/",
    referrer: document.referrer?.trim() ? document.referrer.trim().slice(0, 500) : null,
    captured_at: new Date().toISOString(),
  }
}

export function getUtmFirst(): UtmTouch | null {
  return parseTouch(readCookie(COOKIE_FIRST))
}

export function getUtmLast(): UtmTouch | null {
  return parseTouch(readCookie(COOKIE_LAST))
}

export function getUtmPair(): UtmPair {
  return {
    utm_first: getUtmFirst(),
    utm_last: getUtmLast(),
  }
}

/**
 * First-touch: grava só se cookie ainda não existir (e houver UTM na URL).
 * Last-touch: atualiza só com UTM na URL e valores diferentes do salvo.
 */
export function captureUtm(): UtmPair {
  if (typeof window === "undefined") {
    return { utm_first: null, utm_last: null }
  }

  const fromUrl = readUrlTouch()
  let first = getUtmFirst()
  let last = getUtmLast()

  if (fromUrl) {
    if (!first) {
      writeCookie(COOKIE_FIRST, JSON.stringify(fromUrl))
      first = fromUrl
    }

    if (!last || campaignKey(last) !== campaignKey(fromUrl)) {
      writeCookie(COOKIE_LAST, JSON.stringify(fromUrl))
      last = fromUrl
    }
  }

  return { utm_first: first, utm_last: last }
}
