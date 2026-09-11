import { useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { siteData } from "../../data/siteData"
import SectionCta from "./SectionCta"

export default function AmenitiesIsland() {
  const railRef = useRef<HTMLDivElement>(null)
  const pauseUntil = useRef(0)
  const spaces = siteData.amenities.gallery

  const move = (direction: -1 | 1) => {
    const rail = railRef.current
    if (!rail) return
    pauseUntil.current = performance.now() + 4500
    rail.classList.remove("is-auto-scrolling")
    const card = rail.querySelector<HTMLElement>(".amenity-card")
    const step = card ? card.offsetWidth + 4 : Math.min(window.innerWidth * 0.72, 520)
    rail.scrollBy({
      left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    })
  }

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduce.matches) return

    let raf = 0
    let last = 0
    let visible = false
    let pointerInside = false
    const speed = 0.45

    const tick = (now: number) => {
      if (!last) last = now
      const dt = Math.min(32, now - last)
      last = now

      const paused =
        !visible ||
        pointerInside ||
        document.hidden ||
        now < pauseUntil.current

      if (paused) {
        rail.classList.remove("is-auto-scrolling")
      } else {
        rail.classList.add("is-auto-scrolling")
        const max = rail.scrollWidth - rail.clientWidth
        if (max > 8) {
          let next = rail.scrollLeft + speed * (dt / 16.67)
          if (next >= max - 1) next = 0
          rail.scrollLeft = next
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      pointerInside = true
    }
    const onLeave = () => {
      pointerInside = false
      pauseUntil.current = performance.now() + 900
    }
    const onInteract = () => {
      pauseUntil.current = performance.now() + 4500
      rail.classList.remove("is-auto-scrolling")
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.2
      },
      { threshold: [0, 0.2, 0.5] },
    )
    io.observe(rail)

    rail.addEventListener("pointerenter", onEnter)
    rail.addEventListener("pointerleave", onLeave)
    rail.addEventListener("wheel", onInteract, { passive: true })
    rail.addEventListener("touchstart", onInteract, { passive: true })
    rail.addEventListener("pointerdown", onInteract)

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      rail.removeEventListener("pointerenter", onEnter)
      rail.removeEventListener("pointerleave", onLeave)
      rail.removeEventListener("wheel", onInteract)
      rail.removeEventListener("touchstart", onInteract)
      rail.removeEventListener("pointerdown", onInteract)
      rail.classList.remove("is-auto-scrolling")
    }
  }, [])

  return (
    <section
      id="lazer"
      className="amenities-section"
      data-marketing-reveal
      data-section="lazer"
    >
      <div className="shell amenities-heading">
        <div>
          <p className="eyebrow">04 / TEMPO BEM VIVIDO</p>
          <h2 data-motion-heading>
            Um espaço para cada
            <br />
            <em>parte do seu dia.</em>
          </h2>
        </div>
        <div className="amenities-intro">
          <SectionCta>Conhecer toda a estrutura de lazer</SectionCta>
        </div>
      </div>

      <div className="amenities-rail-wrap">
        <button
          type="button"
          className="amenities-nav amenities-nav-prev"
          onClick={() => move(-1)}
          aria-label="Ver ambientes anteriores"
        >
          <ArrowLeft size={18} />
        </button>

        <div
          className="amenities-rail"
          ref={railRef}
          aria-label="Galeria de ambientes do Nature"
        >
          <div className="amenities-rail-spacer" aria-hidden="true" />
          {spaces.map((space, index) => (
            <figure className="amenity-card" key={`${space.name}-${index}`}>
              <img
                src={space.image}
                alt={`Nature Residencial, ${space.name}`}
                loading={index < 2 ? "eager" : "lazy"}
              />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{space.name}</h3>
              </figcaption>
            </figure>
          ))}
          <div className="amenities-rail-end" aria-hidden="true">
            <span>11</span>
            <p>
              ambientes
              <br />
              para viver mais.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="amenities-nav amenities-nav-next"
          onClick={() => move(1)}
          aria-label="Ver próximos ambientes"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  )
}
