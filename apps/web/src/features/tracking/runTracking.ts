import {
  COOKIE_CONSENT_EVENT,
  getTrackingConsent,
} from "./cookieConsent"
import { getOrCaptureOrigemBruta } from "./origemBruta"
import { patchAceite, postEntrada, postSaida } from "./trackingClient"
import { ensureMetaPixel, trackMeta } from "../../lib/metaPixel"

const SESSAO_KEY = "nature_sessao_id"
const PAGEVIEW_KEY = "nature_pageview_id"
/** Intervalo de amostragem: 1 seção por vez (centro da viewport). */
const SECOES_TICK_MS = 1000

type Runtime = {
  pageviewId: string
  startedAt: number
  activeMs: number
  lastVisibleAt: number | null
  maxScroll: number
  clicouWhatsapp: boolean
  secoesMs: Map<string, number>
  saidaEnviada: boolean
}

let runtime: Runtime | null = null

function getSessaoId(): string {
  try {
    const existing = sessionStorage.getItem(SESSAO_KEY)
    if (existing) return existing
    const id = crypto.randomUUID()
    sessionStorage.setItem(SESSAO_KEY, id)
    return id
  } catch {
    return crypto.randomUUID()
  }
}

function readScrollPct(): number {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  if (scrollable <= 0) return 100
  return Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100)))
}

/**
 * Seção mais interna sob o centro da viewport (elementFromPoint + closest).
 * Assim hero-facts vence o hero pai quando o centro está nos facts.
 */
function secaoNoCentroViewport(): string | null {
  const midX = window.innerWidth / 2
  const midY = window.innerHeight / 2
  const hit = document.elementFromPoint(midX, midY)
  if (!(hit instanceof Element)) return null
  const section = hit.closest<HTMLElement>("[data-section]")
  return section?.getAttribute("data-section") || null
}

function tickSecao(rt: Runtime) {
  if (document.visibilityState !== "visible") return
  const key = secaoNoCentroViewport()
  if (!key) return
  rt.secoesMs.set(key, (rt.secoesMs.get(key) ?? 0) + SECOES_TICK_MS)
}

function buildSecoes(
  rt: Runtime,
  ativo_s: number,
): Record<string, number> | undefined {
  if (rt.secoesMs.size === 0) return undefined
  const out: Record<string, number> = {}
  let sum = 0
  for (const [k, ms] of rt.secoesMs) {
    const s = Math.min(86400, Math.max(0, Math.round(ms / 1000)))
    if (s <= 0) continue
    out[k] = s
    sum += s
  }
  if (Object.keys(out).length === 0) return undefined
  // Garante soma(secoes) <= ativo_s (ticks de 1s vs ms contínuos / arredondamento).
  if (sum > ativo_s && ativo_s >= 0 && sum > 0) {
    const scale = ativo_s / sum
    let adjusted = 0
    const keys = Object.keys(out)
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]
      if (i === keys.length - 1) {
        out[k] = Math.max(0, ativo_s - adjusted)
      } else {
        out[k] = Math.max(0, Math.floor(out[k] * scale))
        adjusted += out[k]
      }
      if (out[k] === 0) delete out[k]
    }
    if (Object.keys(out).length === 0) return undefined
  }
  return out
}

function sendSaida(rt: Runtime) {
  if (rt.saidaEnviada) return
  rt.saidaEnviada = true

  const now = Date.now()
  if (rt.lastVisibleAt !== null) {
    rt.activeMs += Math.max(0, now - rt.lastVisibleAt)
    rt.lastVisibleAt = null
  }

  const permanencia_s = Math.min(
    86400,
    Math.max(0, Math.round((now - rt.startedAt) / 1000)),
  )
  const ativo_s = Math.min(86400, Math.max(0, Math.round(rt.activeMs / 1000)))
  const scroll_pct = rt.maxScroll
  const leu_conteudo = scroll_pct >= 60 && ativo_s >= 15

  postSaida({
    id: rt.pageviewId,
    permanencia_s,
    ativo_s,
    scroll_pct,
    leu_conteudo,
    clicou_whatsapp: rt.clicouWhatsapp,
    secoes: buildSecoes(rt, ativo_s),
  })
}

function isWhatsAppHref(href: string | null): boolean {
  if (!href) return false
  try {
    const u = new URL(href, window.location.origin)
    return (
      u.hostname.includes("wa.me") ||
      u.hostname.includes("api.whatsapp.com") ||
      u.hostname.includes("whatsapp.com")
    )
  } catch {
    return /wa\.me|whatsapp/i.test(href)
  }
}

/**
 * Dispara entrada + engajamento/saída + seções + WhatsApp.
 * Meta Pixel só via ensureMetaPixel quando consentimento === 'aceito'.
 */
export function bootTracking() {
  if (typeof window === "undefined") return () => {}

  const consent = getTrackingConsent()
  const pageviewId = crypto.randomUUID()
  try {
    sessionStorage.setItem(PAGEVIEW_KEY, pageviewId)
  } catch {
    /* ignore */
  }

  const rt: Runtime = {
    pageviewId,
    startedAt: Date.now(),
    activeMs: 0,
    lastVisibleAt: document.visibilityState === "visible" ? Date.now() : null,
    maxScroll: readScrollPct(),
    clicouWhatsapp: false,
    secoesMs: new Map(),
    saidaEnviada: false,
  }
  runtime = rt

  const origem_bruta = getOrCaptureOrigemBruta()
  const entrada = {
    id: pageviewId,
    caminho: window.location.pathname || "/",
    titulo: document.title?.slice(0, 200) || undefined,
    ocorrido_em: new Date().toISOString(),
    consentimento: consent,
    origem_bruta,
    ...(consent === "aceito" ? { sessao_id: getSessaoId() } : {}),
  }

  void postEntrada(entrada)

  if (consent === "aceito") {
    void ensureMetaPixel()
  }

  const onScroll = () => {
    rt.maxScroll = Math.max(rt.maxScroll, readScrollPct())
  }

  const onVisibility = () => {
    const now = Date.now()
    if (document.visibilityState === "hidden") {
      if (rt.lastVisibleAt !== null) {
        rt.activeMs += Math.max(0, now - rt.lastVisibleAt)
        rt.lastVisibleAt = null
      }
      sendSaida(rt)
    } else {
      rt.lastVisibleAt = now
      // Permite outro PATCH de saída se a aba voltar a ficar hidden.
      rt.saidaEnviada = false
    }
  }

  const onPageHide = () => sendSaida(rt)

  const onClick = (event: MouseEvent) => {
    const target = event.target
    if (!(target instanceof Element)) return
    const anchor = target.closest("a")
    if (anchor && isWhatsAppHref(anchor.getAttribute("href"))) {
      rt.clicouWhatsapp = true
      return
    }
    // LeadFork abre wa.me via window.open — marca se o texto/aria sugere WhatsApp
    const btn = target.closest("button")
    if (btn) {
      const label = `${btn.textContent || ""} ${btn.getAttribute("aria-label") || ""}`
      if (/whatsapp/i.test(label)) rt.clicouWhatsapp = true
    }
  }

  const secoesTimer = window.setInterval(() => tickSecao(rt), SECOES_TICK_MS)

  // ViewContent quando o footer entra — só se Pixel já carregado
  let viewContentFired = false
  const footerObserver =
    typeof IntersectionObserver === "function"
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting || viewContentFired) continue
              viewContentFired = true
              trackMeta("ViewContent")
              footerObserver?.disconnect()
            }
          },
          { threshold: 0.15 },
        )
      : null
  const footer = document.getElementById("site-footer")
  if (footer && footerObserver) footerObserver.observe(footer)

  const onConsent = (event: Event) => {
    const detail = (event as CustomEvent<{ consentimento?: string }>).detail
    if (detail?.consentimento !== "aceito") return
    const sessao_id = getSessaoId()
    void patchAceite({ id: rt.pageviewId, sessao_id })
    void ensureMetaPixel()
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("pagehide", onPageHide)
  document.addEventListener("visibilitychange", onVisibility)
  document.addEventListener("click", onClick, true)
  window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)

  return () => {
    window.clearInterval(secoesTimer)
    footerObserver?.disconnect()
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("pagehide", onPageHide)
    document.removeEventListener("visibilitychange", onVisibility)
    document.removeEventListener("click", onClick, true)
    window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
    if (runtime === rt) runtime = null
  }
}

/** Expõe o pageview atual (ex. testes). */
export function getCurrentPageviewId(): string | null {
  return runtime?.pageviewId ?? null
}
