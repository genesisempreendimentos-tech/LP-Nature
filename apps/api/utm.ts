import type { UtmTouch } from "../../packages/shared/src/utm.ts"

const TOUCH_KEYS = [
  "source",
  "medium",
  "campaign",
  "term",
  "content",
  "landing_page",
  "referrer",
  "captured_at",
] as const

function isIsoLike(value: string): boolean {
  return Number.isFinite(Date.parse(value))
}

function trimOrNull(value: unknown, max = 500): string | null {
  if (value === null || value === undefined) return null
  if (typeof value !== "string") return null
  const t = value.trim()
  if (!t) return null
  return t.slice(0, max)
}

/**
 * Aceita objeto UTM do client ou null. Inválido → null (não falha o request).
 */
export function parseUtmTouch(raw: unknown): UtmTouch | null {
  if (raw === null || raw === undefined) return null
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null
  const o = raw as Record<string, unknown>

  const landing_page = trimOrNull(o.landing_page, 500)
  const captured_at = trimOrNull(o.captured_at, 64)
  if (!landing_page || !captured_at || !isIsoLike(captured_at)) return null

  for (const key of TOUCH_KEYS) {
    if (!(key in o)) continue
    const v = o[key]
    if (v !== null && typeof v !== "string") return null
  }

  return {
    source: trimOrNull(o.source, 200),
    medium: trimOrNull(o.medium, 200),
    campaign: trimOrNull(o.campaign, 200),
    term: trimOrNull(o.term, 200),
    content: trimOrNull(o.content, 200),
    landing_page,
    referrer: trimOrNull(o.referrer, 500),
    captured_at,
  }
}

/** Flatten para colunas DB `utm_{first|last}_*`. */
export function flattenUtmColumns(
  prefix: "utm_first" | "utm_last",
  touch: UtmTouch | null | undefined,
): Record<string, string | null> {
  if (!touch) {
    return {
      [`${prefix}_source`]: null,
      [`${prefix}_medium`]: null,
      [`${prefix}_campaign`]: null,
      [`${prefix}_term`]: null,
      [`${prefix}_content`]: null,
      [`${prefix}_landing_page`]: null,
      [`${prefix}_referrer`]: null,
      [`${prefix}_at`]: null,
    }
  }
  return {
    [`${prefix}_source`]: touch.source,
    [`${prefix}_medium`]: touch.medium,
    [`${prefix}_campaign`]: touch.campaign,
    [`${prefix}_term`]: touch.term,
    [`${prefix}_content`]: touch.content,
    [`${prefix}_landing_page`]: touch.landing_page,
    [`${prefix}_referrer`]: touch.referrer,
    [`${prefix}_at`]: touch.captured_at,
  }
}
