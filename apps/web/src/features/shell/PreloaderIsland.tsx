import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, natureEase } from "../../motion/gsap"
import { markAppReady } from "./appReady"

/** Só texto emocional — sem marca, sem endereço. */
const PHRASES = [
  "Você conquistou tanto.",
  "Merece viver à altura.",
] as const

/**
 * Preloader textual rápido — frases só, depois libera appReady.
 * Escape / “Pular” / reduced-motion aceleram a saída.
 */
export default function PreloaderIsland() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const phraseRef = useRef<HTMLParagraphElement>(null)
  const exitRef = useRef<() => void>(() => {})

  useGSAP(
    () => {
      document.getElementById("nature-preloader-boot")?.remove()

      const overlay = overlayRef.current
      const phraseEl = phraseRef.current
      if (!overlay || !phraseEl) return

      let disposed = false
      let exiting = false
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")

      const releaseReady = () => {
        document.documentElement.dataset.appReady = "1"
        try {
          window.dispatchEvent(new CustomEvent("nature:app-ready"))
        } catch {
          // ignore
        }
        markAppReady()
      }

      const finish = () => {
        if (disposed) return
        document.body.style.overflow = prevOverflow
        overlay.setAttribute("aria-busy", "false")
        overlay.remove()
        releaseReady()
      }

      const exit = () => {
        if (disposed || exiting) return
        exiting = true
        if (reduce.matches) {
          finish()
          return
        }
        gsap.to(overlay, {
          yPercent: -110,
          duration: 0.5,
          ease: natureEase,
          onComplete: finish,
        })
      }
      exitRef.current = exit

      if (reduce.matches) {
        const t = window.setTimeout(exit, 100)
        return () => {
          disposed = true
          window.clearTimeout(t)
          document.body.style.overflow = prevOverflow
        }
      }

      gsap.set(phraseEl, { opacity: 1 })

      const tl = gsap.timeline({
        defaults: { ease: natureEase },
        onComplete: exit,
      })

      PHRASES.forEach((text, i) => {
        const at = 0.08 + i * 0.55
        tl.call(
          () => {
            phraseEl.textContent = text
          },
          undefined,
          at,
        )
        tl.fromTo(
          phraseEl,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.42 },
          at,
        )
        if (i < PHRASES.length - 1) {
          tl.to(phraseEl, { opacity: 0, y: -16, duration: 0.22 }, at + 0.4)
        }
      })

      tl.to({}, { duration: 0.36 })

      const safety = window.setTimeout(exit, 2000)
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") exit()
      }
      document.addEventListener("keydown", onKey)

      return () => {
        disposed = true
        window.clearTimeout(safety)
        document.removeEventListener("keydown", onKey)
        document.body.style.overflow = prevOverflow
        tl.kill()
      }
    },
    { scope: overlayRef },
  )

  useEffect(() => {
    const failsafe = window.setTimeout(() => {
      if (document.documentElement.dataset.appReady === "1") return
      exitRef.current()
    }, 2600)
    return () => window.clearTimeout(failsafe)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="nature-preloader"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Carregando"
    >
      <div className="preloader-center">
        <p ref={phraseRef} className="preloader-phrase preloader-phrase--solo">
          {"\u00A0"}
        </p>
      </div>
      <div className="preloader-bottom">
        <span className="preloader-status" aria-hidden="true" />
        <button
          type="button"
          className="preloader-skip"
          onClick={() => exitRef.current()}
        >
          Pular
        </button>
      </div>
    </div>
  )
}
