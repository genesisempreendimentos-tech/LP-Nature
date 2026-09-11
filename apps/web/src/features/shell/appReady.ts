import { atom } from "nanostores"

/**
 * Gate global de “página pronta” para reveals de marketing.
 * Disparado no load (inline em index.astro) via dataset + `nature:app-ready`.
 */
export const $appReady = atom(false)

export function markAppReady() {
  if ($appReady.get()) return
  $appReady.set(true)
}

/** Sync do sinal DOM (dataset / CustomEvent) → store React/nanostores. */
export function bindAppReadyFromDom() {
  if (typeof window === "undefined") return
  const sync = () => {
    if (document.documentElement.dataset.appReady === "1") markAppReady()
  }
  sync()
  window.addEventListener("nature:app-ready", sync)
}
