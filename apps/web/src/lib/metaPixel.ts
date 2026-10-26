/** Meta Pixel — carrega só com consentimento 'aceito'. Sem Pixel, trackMeta é no-op. */

const PIXEL_ID = "2204287590401451"

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  push: FbqFn
  loaded: boolean
  version: string
}

type PixelWindow = Window & {
  fbq?: FbqFn
  _fbq?: FbqFn
}

let loadPromise: Promise<void> | null = null

function ensureFbqStub(): void {
  const w = window as PixelWindow
  if (typeof w.fbq === "function") return

  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args)
    else n.queue.push(args)
  } as FbqFn

  n.queue = []
  n.loaded = true
  n.version = "2.0"
  n.push = n
  w.fbq = n
  if (!w._fbq) w._fbq = n
}

export function ensureMetaPixel(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve) => {
    ensureFbqStub()
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-nature-meta-pixel="1"]',
    )
    const initAndPageView = () => {
      const fbq = (window as PixelWindow).fbq
      if (typeof fbq === "function") {
        fbq("init", PIXEL_ID)
        fbq("track", "PageView")
      }
      resolve()
    }

    if (existing) {
      initAndPageView()
      return
    }

    const script = document.createElement("script")
    script.async = true
    script.src = "https://connect.facebook.net/en_US/fbevents.js"
    script.dataset.natureMetaPixel = "1"
    script.onload = initAndPageView
    script.onerror = () => resolve()
    document.head.appendChild(script)
  })

  return loadPromise
}

/** Dispara evento se `fbq` estiver disponível (Pixel já injetado). */
export function trackMeta(
  event: string,
  params?: Record<string, unknown>,
): void {
  const fbq = (window as PixelWindow).fbq
  if (typeof fbq !== "function") return
  if (params) fbq("track", event, params)
  else fbq("track", event)
}
