/**
 * Atribuição de pageview (aba) — sessionStorage.
 * Independente dos cookies nature_utm_* usados pelos leads (opção A).
 */

import type { OrigemBruta } from "@nature/shared"

const STORAGE_KEY = "nature_origem_bruta"

const CLICK_PARAMS: Array<{ param: string; tipo: string }> = [
  { param: "gclid", tipo: "gclid" },
  { param: "gbraid", tipo: "gbraid" },
  { param: "wbraid", tipo: "wbraid" },
  { param: "fbclid", tipo: "fbclid" },
]

function readStored(): OrigemBruta | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as OrigemBruta
    return data && typeof data === "object" ? data : null
  } catch {
    return null
  }
}

function writeStored(value: OrigemBruta): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

function fromUrlAndReferrer(): OrigemBruta | null {
  const params = new URLSearchParams(window.location.search)
  const out: OrigemBruta = {}

  const utm_source = params.get("utm_source")?.trim()
  const utm_medium = params.get("utm_medium")?.trim()
  const utm_campaign = params.get("utm_campaign")?.trim()
  const utm_content = params.get("utm_content")?.trim()
  const utm_term = params.get("utm_term")?.trim()
  if (utm_source) out.utm_source = utm_source.slice(0, 200)
  if (utm_medium) out.utm_medium = utm_medium.slice(0, 200)
  if (utm_campaign) out.utm_campaign = utm_campaign.slice(0, 200)
  if (utm_content) out.utm_content = utm_content.slice(0, 200)
  if (utm_term) out.utm_term = utm_term.slice(0, 200)

  for (const { param, tipo } of CLICK_PARAMS) {
    const v = params.get(param)?.trim()
    if (v) {
      out.click_id = v.slice(0, 200)
      out.click_id_tipo = tipo
      break
    }
  }

  const ref = document.referrer?.trim()
  if (ref) out.referrer = ref.slice(0, 2000)

  return Object.keys(out).length > 0 ? out : null
}

/**
 * No primeiro pageview da aba captura e persiste; nos seguintes reutiliza.
 */
export function getOrCaptureOrigemBruta(): OrigemBruta | undefined {
  if (typeof window === "undefined") return undefined
  const existing = readStored()
  if (existing) return existing
  const captured = fromUrlAndReferrer()
  if (captured) {
    writeStored(captured)
    return captured
  }
  // Sem UTM/click/referrer: grava {} para não re-capturar em SPA-ish remounts
  writeStored({})
  return undefined
}
