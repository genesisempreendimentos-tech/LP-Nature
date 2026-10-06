import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { openLeadModal } from "../lead/store"
import { $appReady, bindAppReadyFromDom } from "./appReady"
import NatureLogo from "./NatureLogo"
import { shellNav } from "../../data/shell"
import { gsap, natureEase } from "../../motion/gsap"

/** Solidifica >80; só volta transparente ≤40 (paridade Header.tsx / BR-MIGRAR-014). */
const SOLID_ON = 80
const SOLID_OFF = 40

export default function HeaderIsland() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSolid, setIsSolid] = useState(false)
  const [entranceReady, setEntranceReady] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const solidRef = useRef(false)

  useEffect(() => {
    bindAppReadyFromDom()
    const sync = () => {
      if (
        document.documentElement.dataset.appReady === "1" ||
        $appReady.get()
      ) {
        setEntranceReady(true)
      }
    }
    sync()
    const unsub = $appReady.subscribe((v) => {
      if (v) setEntranceReady(true)
    })
    window.addEventListener("nature:app-ready", sync)
    return () => {
      unsub()
      window.removeEventListener("nature:app-ready", sync)
    }
  }, [])

  useGSAP(
    () => {
      if (!entranceReady) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".header-pill", {
          opacity: 0,
          duration: 0.5,
          ease: natureEase,
          clearProps: "opacity",
        })
      })
      return () => mm.revert()
    },
    { scope: headerRef, dependencies: [entranceReady], revertOnUpdate: true },
  )

  useEffect(() => {
    solidRef.current = window.scrollY > SOLID_ON
    setIsSolid(solidRef.current)

    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const solid = solidRef.current ? y > SOLID_OFF : y > SOLID_ON
      if (solid !== solidRef.current) {
        solidRef.current = solid
        setIsSolid(solid)
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    const desktop = window.matchMedia("(min-width: 1051px)")
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false)
    }

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

  const surfaceOn = isSolid || menuOpen

  return (
    <header ref={headerRef} className="site-header" data-shell-header>
      <div
        className="header-pill"
        data-scrolled={surfaceOn ? "true" : "false"}
      >
        <a
          href="#inicio"
          className="brand-link header-brand"
          aria-label="Nature Residencial — início"
          onClick={() => setMenuOpen(false)}
        >
          <NatureLogo />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav
          id="main-nav"
          className={`header-nav main-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Navegação principal"
        >
          <div className="header-nav-links">
            {shellNav.map((item) => (
              <a
                key={item.id}
                className="nav-item"
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="header-cta nav-contact"
            onClick={() => {
              setMenuOpen(false)
              openLeadModal()
            }}
          >
            <span className="header-cta-label">
              Conheça seu novo endereço <ArrowUpRight size={16} />
            </span>
            <span className="header-cta-fill" aria-hidden="true">
              Conheça seu novo endereço <ArrowUpRight size={16} />
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
