/**
 * Formulário global Genesis — desligado por padrão (PUBLIC_FORMULARIO_GLOBAL≠1).
 * Com a chave off, as funções são no-op e o código do widget não entra no bundle.
 *
 * getTracking / ids:
 * - first/last: cookies nature_utm_* (paridade com o lead nativo; sem consentimento).
 * - sessao_id: nature_sessao_id do tracker (runTracking) quando existir — só após
 *   aceite de cookies; senão usa efêmero nature_form_sid.
 * - usuario_id: a LP não tem id de usuário persistente; usa nature_form_uid efêmero.
 * - Sem UTM e sem ids do tracker: {} (não gera efêmeros à toa).
 * - Com UTM (ou id parcial): completa com UUIDs efêmeros (nature_form_uid / nature_form_sid)
 *   para o servidor não descartar o tracking/UTM.
 */

import { getUtmFirst, getUtmLast, type UtmTouch } from "../../lib/utmTracking"
import { trackMeta } from "../../lib/metaPixel"

const ATIVO = import.meta.env.PUBLIC_FORMULARIO_GLOBAL === "1"

const FORM_UID_KEY = "nature_form_uid"
const FORM_SID_KEY = "nature_form_sid"
const TRACKER_SESSAO_KEY = "nature_sessao_id"

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type GenesisTouch = {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  referrer?: string
  landing_page?: string
  at?: string
}

type GenesisTracking = {
  usuario_id?: string
  sessao_id?: string
  first?: GenesisTouch
  last?: GenesisTouch
}

type GenesisFormApi = {
  init: (opts: {
    formId: string
    apiBase: string
    preview: boolean
    silentUnavailable: boolean
    getTracking: () => GenesisTracking
  }) => void
  isReady: () => boolean
  open: () => boolean
}

declare global {
  interface Window {
    GenesisForm?: GenesisFormApi
  }
}

let iniciado = false
let leadPixelOnce = false

function omitEmptyTouch(touch: UtmTouch | null): GenesisTouch | undefined {
  if (!touch) return undefined
  const out: GenesisTouch = {}
  if (touch.source) out.source = touch.source
  if (touch.medium) out.medium = touch.medium
  if (touch.campaign) out.campaign = touch.campaign
  if (touch.term) out.term = touch.term
  if (touch.content) out.content = touch.content
  if (touch.referrer) out.referrer = touch.referrer
  if (touch.landing_page) out.landing_page = touch.landing_page
  if (touch.captured_at) out.at = touch.captured_at
  return Object.keys(out).length > 0 ? out : undefined
}

function readSession(key: string): string | null {
  try {
    const v = sessionStorage.getItem(key)
    return v && UUID_RE.test(v) ? v : null
  } catch {
    return null
  }
}

function ensureEphemeral(key: string): string | null {
  const existing = readSession(key)
  if (existing) return existing
  try {
    const id = crypto.randomUUID()
    sessionStorage.setItem(key, id)
    return id
  } catch {
    return null
  }
}

/** Exportado para testes do contrato getTracking. */
export function getTracking(): GenesisTracking {
  const first = omitEmptyTouch(getUtmFirst())
  const last = omitEmptyTouch(getUtmLast())
  const hasUtm = Boolean(first || last)

  // Tracker LP: só sessao_id (sem usuario_id persistente). Sem trava extra de
  // consentimento além da do próprio runTracking (grava sessao no pageview).
  let sessao_id = readSession(TRACKER_SESSAO_KEY)
  let usuario_id: string | null = null

  if (!hasUtm && !sessao_id && !usuario_id) {
    return {}
  }

  if (!usuario_id) usuario_id = ensureEphemeral(FORM_UID_KEY)
  if (!sessao_id) sessao_id = ensureEphemeral(FORM_SID_KEY)
  if (!usuario_id || !sessao_id) return {}

  const out: GenesisTracking = {
    usuario_id,
    sessao_id,
  }
  if (first) out.first = first
  if (last) out.last = last
  return out
}

function pixelAllowed(): boolean {
  if (import.meta.env.DEV) return false
  if (import.meta.env.PUBLIC_FORMS_REAL !== "1") return false
  return true
}

function onGenesisEvent(event: Event) {
  const detail = (event as CustomEvent<{ type?: string; concluido?: boolean }>)
    .detail
  const type = detail?.type
  if (type === "closed") {
    leadPixelOnce = false
    return
  }
  if (type === "lead_created") {
    if (!pixelAllowed()) return
    if (leadPixelOnce) return
    leadPixelOnce = true
    trackMeta("Lead")
  }
  // completed / CompleteRegistration: paridade com o nativo (comentado) — não dispara.
}

function scheduleIdle(fn: () => void) {
  const ric = (
    window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number
    }
  ).requestIdleCallback
  if (typeof ric === "function") {
    ric(fn, { timeout: 3000 })
  } else {
    window.setTimeout(fn, 2000)
  }
}

function loadWidgetAndInit() {
  const base = (import.meta.env.PUBLIC_FORMS_WIDGET_BASE || "").replace(
    /\/$/,
    "",
  )
  const formId = import.meta.env.PUBLIC_FORMS_ID || "nature-lp"
  if (!base) return

  const preview = import.meta.env.PUBLIC_FORMS_REAL !== "1"
  const src = `${base}/widget/v1/widget.js`

  const existing = document.querySelector<HTMLScriptElement>(
    `script[data-genesis-forms-widget="1"]`,
  )
  if (existing) {
    if (window.GenesisForm) {
      window.GenesisForm.init({
        formId,
        apiBase: base,
        preview,
        silentUnavailable: true,
        getTracking,
      })
    }
    return
  }

  const script = document.createElement("script")
  script.src = src
  script.async = true
  script.dataset.genesisFormsWidget = "1"
  script.onload = () => {
    try {
      window.GenesisForm?.init({
        formId,
        apiBase: base,
        preview,
        silentUnavailable: true,
        getTracking,
      })
    } catch {
      /* silencioso */
    }
  }
  script.onerror = () => {
    /* falha de script: nada acontece */
  }
  document.head.appendChild(script)
}

/**
 * Uma vez na carga do cliente: após load + tempo ocioso injeta o widget.
 * No-op se PUBLIC_FORMULARIO_GLOBAL ≠ "1".
 */
export function iniciarFormularioGlobal() {
  if (!ATIVO) return
  if (typeof window === "undefined") return
  if (iniciado) return
  iniciado = true

  window.addEventListener("genese-forms:event", onGenesisEvent)

  const boot = () => scheduleIdle(loadWidgetAndInit)
  if (document.readyState === "complete") boot()
  else window.addEventListener("load", boot, { once: true })
}

/**
 * Tenta abrir o widget. true só se isReady() e open() forem true.
 * No-op (false) com a chave desligada.
 */
export function abrirFormularioGlobal(): boolean {
  if (!ATIVO) return false
  if (typeof window === "undefined") return false

  const api = window.GenesisForm
  if (!api || typeof api.isReady !== "function" || !api.isReady()) {
    console.warn("[formulario] fallback", "not_ready")
    return false
  }
  try {
    const opened = api.open()
    if (!opened) {
      console.warn("[formulario] fallback", "open_false")
      return false
    }
    return true
  } catch (err) {
    console.warn("[formulario] fallback", err)
    return false
  }
}
