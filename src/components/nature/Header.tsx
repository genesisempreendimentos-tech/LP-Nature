import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { gsap, natureEase } from "../../motion/gsap"
import { useLeadModal } from "../../context/LeadModalContext"
import NatureLogo from "./NatureLogo"

export default function Header({ ready = true }: { ready?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSolid, setIsSolid] = useState(() => window.scrollY > 80)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { openLeadModal } = useLeadModal()

  useEffect(() => {
    let frame = 0
    let solid = window.scrollY > 80
    const update = () => {
      frame = 0
      // Separate thresholds prevent flickering around the surface boundary.
      const next = solid ? window.scrollY > 40 : window.scrollY > 80
      if (next !== solid) { solid = next; setIsSolid(next) }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) { setMenuOpen(false); toggleRef.current?.focus() }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 761px)")
    const onResize = () => { if (desktop.matches) setMenuOpen(false) }
    setIsSolid(solid)
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    desktop.addEventListener("change", onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
      desktop.removeEventListener("change", onResize)
    }
  }, [menuOpen])

  useGSAP(() => {
    if (!ready) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".header-pill", { opacity: 0, duration: .5, ease: natureEase, clearProps: "opacity" })
    })
    return () => mm.revert()
  }, { scope: headerRef, dependencies: [ready], revertOnUpdate: true })

  return <header ref={headerRef} className="site-header">
    <div className="header-pill" data-scrolled={isSolid || menuOpen}>
      <a href="#inicio" className="brand-link header-brand" aria-label="Nature Residencial — início" onClick={() => setMenuOpen(false)}><NatureLogo /></a>
      <button ref={toggleRef} className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav id="main-nav" className={`header-nav main-nav${menuOpen ? " is-open" : ""}`} aria-label="Navegação principal">
        <div className="header-nav-links">
          <a className="nav-item" href="#nature" onClick={() => setMenuOpen(false)}>O Nature</a>
          <a className="nav-item" href="#plantas" onClick={() => setMenuOpen(false)}>Plantas</a>
          <a className="nav-item" href="#lazer" onClick={() => setMenuOpen(false)}>Lazer</a>
          <a className="nav-item" href="#localizacao" onClick={() => setMenuOpen(false)}>Localização</a>
        </div>
        <button
          type="button"
          className="header-cta nav-contact"
          onClick={() => {
            setMenuOpen(false)
            openLeadModal()
          }}
        >
          <span className="header-cta-label">Conheça seu novo endereço <ArrowUpRight size={16} /></span>
          <span className="header-cta-fill" aria-hidden="true">Conheça seu novo endereço <ArrowUpRight size={16} /></span>
        </button>
      </nav>
    </div>
  </header>
}
