import { useRef, type RefObject } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, natureEase } from "../../motion/gsap"
import NatureLogo from "./NatureLogo"

interface PreloaderProps {
  onReveal: () => void
  onComplete: () => void
  pageRef: RefObject<HTMLDivElement | null>
}
export default function Preloader({ onReveal, onComplete, pageRef }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const finishRef = useRef<() => void>(() => {})
  useGSAP(
    () => {
      const overlay = overlayRef.current
      if (!overlay) return
      let disposed = false
      let exiting = false
      const overflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
      const finish = () => {
        if (disposed) return
        if (overlay.contains(document.activeElement) && pageRef.current) {
          pageRef.current.inert = false
          pageRef.current.querySelector<HTMLElement>(".skip-link")?.focus()
        }
        onComplete()
      }
      const exitAnimation = gsap.to(overlay, {
        yPercent: -100,
        duration: 0.65,
        ease: natureEase,
        paused: true,
        onComplete: finish,
      })
      const exit = () => {
        if (disposed || exiting) return
        exiting = true
        if (reduce.matches) {
          finish()
          return
        }
        onReveal()
        exitAnimation.play()
      }
      finishRef.current = exit
      const keydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") exit()
      }
      document.addEventListener("keydown", keydown)
      reduce.addEventListener("change", exit)
      const entry = gsap.from(".preloader-brand, .preloader-caption", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        stagger: 0.06,
        ease: natureEase,
      })
      const image = pageRef.current?.querySelector<HTMLImageElement>(
        ".hero-background-image",
      )
      const imageReady = image?.decode().catch(() => {}) ?? Promise.resolve()
      // Font/image readiness is bounded: slow assets must never trap the visitor.
      const ready = Promise.all([
        imageReady,
        document.fonts.ready,
        entry.then(),
      ])
      ready.then(exit)
      const assetTimeout = window.setTimeout(exit, 1800)
      const safetyTimeout = window.setTimeout(finish, 2800)
      return () => {
        disposed = true
        window.clearTimeout(assetTimeout)
        window.clearTimeout(safetyTimeout)
        document.removeEventListener("keydown", keydown)
        reduce.removeEventListener("change", exit)
        document.body.style.overflow = overflow
      }
    },
    { scope: overlayRef },
  )
  return (
    <div className="nature-preloader" ref={overlayRef}>
      <div className="preloader-center">
        <div className="preloader-brand">
          <NatureLogo light />
        </div>
        <p className="preloader-caption">O ESSENCIAL EM UM NOVO PADRÃO.</p>
        <div className="preloader-line" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="preloader-bottom">
        <span role="status">Preparando seu próximo endereço</span>
        <button onClick={() => finishRef.current()}>Pular introdução ↗</button>
      </div>
    </div>
  )
}
