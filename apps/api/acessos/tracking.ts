/**
 * Tracking unificado → public.acessos_user (+ acessos_redes, RPC registrar_bot).
 */

import type {
  AceitePayload,
  AcessoEntradaPayload,
  AcessoSaidaPayload,
  Consentimento,
  OrigemBruta,
} from "../../../packages/shared/src/tracking.ts"
import {
  supabaseInsert,
  supabaseRpc,
  supabaseSelect,
  supabaseUpdateById,
} from "./supabase.ts"

export const ACESSOS_TABLE = "acessos_user"

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const BOT_UA =
  /bot|crawler|spider|crawling|headless|puppeteer|playwright|phantomjs|slurp|bingpreview|facebookexternalhit|whatsapp|telegram/i
const TABLET_UA = /ipad|tablet|playbook|silk|(android(?!.*mobile))/i
const MOBILE_UA =
  /android|iphone|ipod|windows phone|iemobile|blackberry|opera mini/i

const BUSCADORES = ["google.", "bing.", "yahoo.", "duckduckgo."]
const SOCIAIS = [
  "facebook.",
  "instagram.",
  "linkedin.",
  "tiktok.",
  "youtube.",
  "t.co",
  "x.com",
]
const MEDIUM_PAGO = new Set([
  "cpc",
  "ppc",
  "paid",
  "paid_social",
  "ads",
])

const REDES_CACHE_MS = 5 * 60 * 1000

export type TrackingContext = {
  headers: Headers
  clientAddress: string | undefined
}

export type RedeRow = {
  id: string
  nome: string | null
  ip: string | null
  ativo: boolean
  track_pagina: boolean
  track_regiao: boolean
  track_dispositivo: boolean
  track_origem: boolean
  track_tempo_permanencia: boolean
  track_tempo_ativo: boolean
  track_scroll: boolean
  track_leitura: boolean
}

type RedesCache = { at: number; rows: RedeRow[] }
let redesCache: RedesCache | null = null

export function getSiteId(): number | null {
  const raw = process.env.SITE_ID?.trim()
  if (!raw) return null
  const n = Number(raw)
  if (!Number.isInteger(n)) return null
  return n
}

export function normalizarIp(ip: string | null | undefined): string | null {
  if (!ip) return null
  const t = ip.trim()
  if (!t) return null
  return t.startsWith("::ffff:") ? t.slice(7) : t
}

/**
 * TRUST_PROXY !== 'true' → clientAddress.
 * Senão: última entrada de X-Forwarded-For; senão X-Real-IP; senão clientAddress.
 * Não usa app.set('trust proxy').
 */
export function extrairIp(
  headers: Headers,
  clientAddress: string | undefined,
): string | null {
  if (process.env.TRUST_PROXY !== "true") {
    return normalizarIp(clientAddress)
  }
  const xff = headers.get("x-forwarded-for")
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean)
    if (parts.length > 0) return normalizarIp(parts[parts.length - 1])
  }
  const real = headers.get("x-real-ip")
  if (real) return normalizarIp(real)
  return normalizarIp(clientAddress)
}

export function classificarUserAgent(ua: string | null | undefined): {
  dispositivo: "mobile" | "desktop" | "tablet" | "unknown"
  bot: boolean
} {
  if (!ua || !ua.trim()) return { dispositivo: "unknown", bot: false }
  if (BOT_UA.test(ua)) return { dispositivo: "unknown", bot: true }
  if (TABLET_UA.test(ua)) return { dispositivo: "tablet", bot: false }
  if (MOBILE_UA.test(ua)) return { dispositivo: "mobile", bot: false }
  return { dispositivo: "desktop", bot: false }
}

async function loadRedes(): Promise<RedeRow[]> {
  const now = Date.now()
  if (redesCache && now - redesCache.at < REDES_CACHE_MS) {
    return redesCache.rows
  }
  const rows = await supabaseSelect<RedeRow>(
    "acessos_redes",
    "select=*&ativo=eq.true",
  )
  redesCache = { at: now, rows }
  return rows
}

export async function casarRede(ip: string | null): Promise<RedeRow | null> {
  if (!ip) return null
  const norm = normalizarIp(ip)
  if (!norm) return null
  try {
    const rows = await loadRedes()
    return (
      rows.find((r) => r.ip && normalizarIp(r.ip) === norm) ?? null
    )
  } catch (err) {
    console.error("[nature-api] casarRede falhou:", err)
    return null
  }
}

function hostFromReferrer(referrer: string | undefined): string | null {
  if (!referrer) return null
  try {
    return new URL(referrer).hostname.replace(/^www\./, "").toLowerCase()
  } catch {
    return null
  }
}

function pathFromReferrer(referrer: string | undefined): string | null {
  if (!referrer) return null
  try {
    const u = new URL(referrer)
    return (u.pathname + u.search).slice(0, 300) || "/"
  } catch {
    return null
  }
}

function isSameSite(refHost: string | null, hostDoSite: string): boolean {
  if (!refHost) return false
  const site = hostDoSite.replace(/^www\./, "").toLowerCase()
  return refHost === site || refHost.endsWith(`.${site}`)
}

export function classificarOrigem(
  origem_bruta: OrigemBruta | undefined,
  hostDoSite: string,
): string {
  const o = origem_bruta ?? {}
  const clickTipo = (o.click_id_tipo || "").toLowerCase()
  const source = (o.utm_source || "").toLowerCase()
  const medium = (o.utm_medium || "").toLowerCase()

  if (
    clickTipo === "gclid" ||
    clickTipo === "gbraid" ||
    clickTipo === "wbraid" ||
    (source === "google" && MEDIUM_PAGO.has(medium))
  ) {
    return "anuncio-google"
  }

  if (
    clickTipo === "fbclid" ||
    ((source === "facebook" ||
      source === "instagram" ||
      source === "meta") &&
      MEDIUM_PAGO.has(medium))
  ) {
    return "anuncio-meta"
  }

  if (o.utm_source && o.utm_source.trim()) return "campanha"

  const refHost = hostFromReferrer(o.referrer)
  if (refHost) {
    if (BUSCADORES.some((b) => refHost.includes(b))) return "busca-organica"
    if (
      SOCIAIS.some(
        (s) => refHost === s || refHost.includes(s) || refHost.endsWith(s),
      )
    ) {
      return "social"
    }
    if (!isSameSite(refHost, hostDoSite)) return "referencia"
  }

  return "direto"
}

type Geo = {
  geo_pais: string | null
  geo_uf: string | null
  geo_cidade: string | null
}

let maxmindReader: {
  get: (ip: string) => {
    country?: { iso_code?: string }
    subdivisions?: Array<{ iso_code?: string }>
    city?: { names?: { en?: string } }
  } | null
} | null = null
let maxmindTried = false

async function lookupGeo(ip: string | null): Promise<Geo> {
  const empty: Geo = { geo_pais: null, geo_uf: null, geo_cidade: null }
  const dbPath = process.env.MAXMIND_DB_PATH?.trim()
  if (!dbPath || !ip) return empty

  try {
    if (!maxmindTried) {
      maxmindTried = true
      const maxmind = await import("maxmind")
      maxmindReader = await maxmind.open(dbPath)
    }
    if (!maxmindReader) return empty
    const r = maxmindReader.get(ip)
    if (!r) return empty
    return {
      geo_pais: r.country?.iso_code ?? null,
      geo_uf: r.subdivisions?.[0]?.iso_code ?? null,
      geo_cidade: r.city?.names?.en ?? null,
    }
  } catch (err) {
    console.warn("[nature-api] MaxMind geo falhou (ignorado):", err)
    return empty
  }
}

function isUuid(v: unknown): v is string {
  return typeof v === "string" && UUID_RE.test(v.trim())
}

function clampStr(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null
  const t = v.trim()
  if (!t) return null
  return t.slice(0, max)
}

function parseOcorridoEm(raw: unknown): string {
  const now = new Date()
  if (typeof raw !== "string" || !raw.trim()) return now.toISOString()
  const t = Date.parse(raw.trim())
  if (!Number.isFinite(t)) return now.toISOString()
  const diff = Math.abs(now.getTime() - t)
  if (diff > 24 * 60 * 60 * 1000) return now.toISOString()
  return new Date(t).toISOString()
}

function hostDoSiteFromHeaders(headers: Headers): string {
  const host = headers.get("x-forwarded-host") || headers.get("host") || ""
  return host.split(":")[0].replace(/^www\./, "").toLowerCase() || "localhost"
}

function clampInt(
  value: unknown,
  min: number,
  max: number,
): number | undefined {
  if (value === undefined || value === null) return undefined
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : NaN
  if (!Number.isFinite(n)) return undefined
  return Math.min(max, Math.max(min, Math.trunc(n)))
}

function sanitizeSecoes(
  raw: unknown,
): Record<string, number> | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined
  const entries = Object.entries(raw as Record<string, unknown>)
  if (entries.length === 0 || entries.length > 30) return undefined
  const out: Record<string, number> = {}
  for (const [k, v] of entries) {
    if (typeof k !== "string" || k.length === 0 || k.length > 50) return undefined
    const n = clampInt(v, 0, 86400)
    if (n === undefined) return undefined
    out[k] = n
  }
  return out
}

function asConsentimento(v: unknown): Consentimento | null {
  if (v === "pendente" || v === "aceito" || v === "rejeitado") return v
  return null
}

export async function registrarEntrada(
  payload: AcessoEntradaPayload,
  ctx: TrackingContext,
): Promise<void> {
  const siteId = getSiteId()
  if (siteId === null) {
    console.error(
      "[nature-api] SITE_ID ausente ou inválido — tracking entrada ignorado.",
    )
    return
  }

  if (!isUuid(payload?.id)) {
    console.warn("[nature-api] entrada: id inválido")
    return
  }

  const caminho = clampStr(payload.caminho, 500)
  if (!caminho) {
    console.warn("[nature-api] entrada: caminho inválido")
    return
  }

  const consentimento = asConsentimento(payload.consentimento)
  if (!consentimento) {
    console.warn("[nature-api] entrada: consentimento inválido")
    return
  }

  const titulo = clampStr(payload.titulo, 200)
  const ocorrido_em = parseOcorridoEm(payload.ocorrido_em)
  const origem = payload.origem_bruta ?? {}

  const ip = extrairIp(ctx.headers, ctx.clientAddress)
  const rede = await casarRede(ip)

  if (rede && !rede.track_pagina) return

  const ua = ctx.headers.get("user-agent")
  const { dispositivo, bot } = classificarUserAgent(ua)
  if (bot) {
    try {
      await supabaseRpc("registrar_bot", { p_site_id: siteId })
    } catch (err) {
      console.error("[nature-api] registrar_bot falhou:", err)
    }
    return
  }

  const consentiu = consentimento === "aceito"
  const host = hostDoSiteFromHeaders(ctx.headers)

  const row: Record<string, unknown> = {
    id: payload.id.trim(),
    site_id: siteId,
    caminho,
    titulo,
    ocorrido_em,
    consentimento,
    colaborador: Boolean(rede),
    rede_id: rede?.id ?? null,
    clicou_whatsapp: false,
  }

  if (!rede || rede.track_dispositivo) {
    row.dispositivo = dispositivo
  }

  if (!rede || rede.track_regiao) {
    const geo = await lookupGeo(ip)
    row.geo_pais = geo.geo_pais
    row.geo_uf = geo.geo_uf
    row.geo_cidade = geo.geo_cidade
  }

  if (!rede || rede.track_origem) {
    row.referrer_host = clampStr(hostFromReferrer(origem.referrer) ?? "", 255)
    row.referrer_caminho = pathFromReferrer(origem.referrer)
    row.origem = classificarOrigem(origem, host)
    row.utm_source = clampStr(origem.utm_source, 200)
    row.utm_medium = clampStr(origem.utm_medium, 200)
    row.utm_campaign = clampStr(origem.utm_campaign, 200)
    row.utm_content = clampStr(origem.utm_content, 200)
    row.utm_term = clampStr(origem.utm_term, 200)
  }

  if (consentiu && !rede) {
    row.ip = ip
    row.user_agent = clampStr(ua, 500)
    row.sessao_id = isUuid(payload.sessao_id) ? payload.sessao_id.trim() : null
    row.click_id = clampStr(origem.click_id, 200)
    row.click_id_tipo = clampStr(origem.click_id_tipo, 50)
  } else {
    row.ip = null
    row.user_agent = null
    row.sessao_id = null
    row.click_id = null
    row.click_id_tipo = null
  }

  await supabaseInsert(ACESSOS_TABLE, row)
}

export async function registrarSaida(
  payload: AcessoSaidaPayload,
  ctx: TrackingContext,
): Promise<void> {
  const siteId = getSiteId()
  if (siteId === null) {
    console.error(
      "[nature-api] SITE_ID ausente ou inválido — tracking saída ignorado.",
    )
    return
  }
  if (!isUuid(payload?.id)) return

  const ip = extrairIp(ctx.headers, ctx.clientAddress)
  const rede = await casarRede(ip)

  const patch: Record<string, unknown> = {}

  let permanencia = clampInt(payload.permanencia_s, 0, 86400)
  let ativo = clampInt(payload.ativo_s, 0, 86400)
  let scroll = clampInt(payload.scroll_pct, 0, 100)
  let leu =
    typeof payload.leu_conteudo === "boolean"
      ? payload.leu_conteudo
      : undefined
  const secoes = sanitizeSecoes(payload.secoes)

  if (rede) {
    if (!rede.track_tempo_permanencia) permanencia = undefined
    if (!rede.track_tempo_ativo) {
      ativo = undefined
    }
    if (!rede.track_scroll) scroll = undefined
    if (!rede.track_leitura) leu = undefined
  }

  if (permanencia !== undefined) patch.permanencia_s = permanencia
  if (ativo !== undefined) patch.ativo_s = ativo
  if (scroll !== undefined) patch.scroll_pct = scroll
  if (leu !== undefined) patch.leu_conteudo = leu
  if (!rede || rede.track_tempo_ativo) {
    if (secoes) patch.secoes = secoes
  }
  if (typeof payload.clicou_whatsapp === "boolean") {
    patch.clicou_whatsapp = payload.clicou_whatsapp
  }

  if (Object.keys(patch).length === 0) return
  await supabaseUpdateById(ACESSOS_TABLE, payload.id.trim(), patch)
}

export async function registrarAceiteConsentimento(
  payload: AceitePayload,
  ctx: TrackingContext,
): Promise<void> {
  const siteId = getSiteId()
  if (siteId === null) {
    console.error(
      "[nature-api] SITE_ID ausente ou inválido — aceite ignorado.",
    )
    return
  }
  if (!isUuid(payload?.id)) return

  const ip = extrairIp(ctx.headers, ctx.clientAddress)
  const rede = await casarRede(ip)
  const ua = ctx.headers.get("user-agent")

  const patch: Record<string, unknown> = {
    consentimento: "aceito",
  }

  if (!rede) {
    if (isUuid(payload.sessao_id)) patch.sessao_id = payload.sessao_id.trim()
    patch.ip = ip
    patch.user_agent = clampStr(ua, 500)
  }

  await supabaseUpdateById(
    ACESSOS_TABLE,
    payload.id.trim(),
    patch,
    "consentimento=eq.pendente",
  )
}
