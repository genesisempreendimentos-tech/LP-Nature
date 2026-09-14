import { COOKIE_CONSENT_EVENT, getTrackingConsent } from "./cookieConsent"
import { postTracking } from "./trackingClient"

const SESSAO_KEY = "nature_sessao_id"
/** traffic_type 0 e 9 = humano (coluna is_bot gerada no banco). */
const TRAFFIC_HUMAN = 9

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

function detectDispositivo(): "desktop" | "mobile" | "tablet" {
  const ua = navigator.userAgent
  if (/iPad|Tablet|PlayBook/i.test(ua)) return "tablet"
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile"
  return "desktop"
}

function detectOrigem(): string {
  const params = new URLSearchParams(window.location.search)
  const utm = params.get("utm_source")?.trim()
  if (utm) return utm.slice(0, 120)

  const ref = document.referrer
  if (!ref) return "direto"
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "")
    if (host.includes("google.")) return "google"
    if (host.includes("facebook.") || host.includes("fb.")) return "facebook"
    if (host.includes("instagram.")) return "instagram"
    if (host.includes("tiktok.")) return "tiktok"
    if (host.includes("bing.")) return "bing"
    return host.slice(0, 120) || "direto"
  } catch {
    return "direto"
  }
}

function basePayload() {
  return {
    sessao_id: getSessaoId(),
    traffic_type: TRAFFIC_HUMAN,
    origem_captura: "navegador" as const,
    criado_em: new Date().toISOString(),
    pagina: "/",
    origem: detectOrigem(),
  }
}

function completeFields() {
  return {
    dispositivo: detectDispositivo(),
    user_agent: navigator.userAgent.slice(0, 500),
    colaborador: false,
  }
}

/**
 * Dispara pageview + (se consentimento aceito) engajamento no pagehide.
 * Meta Pixel permanece independente.
 */
export function bootTracking() {
  if (typeof window === "undefined") return () => {}

  const navKey = `nature_pv_${Math.floor(performance.timeOrigin)}`
  try {
    if (sessionStorage.getItem(navKey) === "1") {
      // já disparou neste document (ex. remount Strict Mode)
    } else {
      sessionStorage.setItem(navKey, "1")
      const consent = getTrackingConsent()
      void postTracking({
        ...basePayload(),
        ...(consent === "aceito" ? completeFields() : {}),
      }).catch(() => {
        // silencioso — tracking não deve quebrar a página
      })
    }
  } catch {
    void postTracking(basePayload()).catch(() => {})
  }

  const startedAt = Date.now()
  let maxScroll = 0
  let engagementSent = false

  const onScroll = () => {
    const doc = document.documentElement
    const scrollable = doc.scrollHeight - window.innerHeight
    if (scrollable <= 0) {
      maxScroll = 100
      return
    }
    const pct = Math.round((window.scrollY / scrollable) * 100)
    maxScroll = Math.min(100, Math.max(maxScroll, pct))
  }

  const sendEngagement = () => {
    if (engagementSent) return
    if (getTrackingConsent() !== "aceito") return
    engagementSent = true
    const tempoTela = Math.max(1, Math.round((Date.now() - startedAt) / 1000))
    void postTracking({
      ...basePayload(),
      ...completeFields(),
      tempo_tela: tempoTela,
      tempo_ativo: tempoTela,
      scroll: maxScroll,
      leitura: maxScroll >= 50,
      score_engajamento: Math.min(100, Math.round(maxScroll * 0.6 + Math.min(tempoTela, 120) * 0.3)),
    }).catch(() => {})
  }

  const onConsent = (event: Event) => {
    const detail = (event as CustomEvent<{ consentimento?: string }>).detail
    if (detail?.consentimento !== "aceito") return
    // Aceite tardio: registra acesso completo agora (sem esperar pagehide).
    void postTracking({
      ...basePayload(),
      ...completeFields(),
    }).catch(() => {})
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("pagehide", sendEngagement)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") sendEngagement()
  })
  window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)

  return () => {
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("pagehide", sendEngagement)
    window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
  }
}
