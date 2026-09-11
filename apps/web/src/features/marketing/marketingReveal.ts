import { $appReady } from "../shell/appReady"

/**
 * Scroll-reveal sem island React.
 * Espera `$appReady` / dataset.appReady antes de observar seções.
 */
export function initMarketingReveal() {
  if (typeof window === "undefined") return

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
  const markAll = () => {
    document
      .querySelectorAll<HTMLElement>("[data-marketing-reveal]")
      .forEach((el) => el.classList.add("is-revealed"))
  }

  const start = () => {
    document
      .querySelectorAll<HTMLElement>("[data-hero-ready]")
      .forEach((el) => el.classList.add("is-ready"))

    if (reduce.matches) {
      markAll()
      return
    }
    const nodes = document.querySelectorAll<HTMLElement>(
      "[data-marketing-reveal]",
    )
    if (!nodes.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-revealed")
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )
    nodes.forEach((n) => io.observe(n))
  }

  const boot = () => {
    if (
      document.documentElement.dataset.appReady === "1" ||
      $appReady.get()
    ) {
      start()
      return
    }
    const onReady = () => {
      window.removeEventListener("nature:app-ready", onReady)
      unsub?.()
      start()
    }
    const unsub = $appReady.subscribe((ready) => {
      if (ready) onReady()
    })
    window.addEventListener("nature:app-ready", onReady)
  }

  boot()
}
