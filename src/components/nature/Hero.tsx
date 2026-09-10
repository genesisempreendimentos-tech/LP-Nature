import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import { gsap, SplitText, natureEase } from "../../motion/gsap"
import { useLeadModal } from "../../context/LeadModalContext"
import Header from "./Header"

export function Hero({ ready = true }: { ready?: boolean }) {
  const heroRef = useRef<HTMLElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)
  const { openLeadModal } = useLeadModal()
  useGSAP(
    () => {
      if (!ready) return
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".hero-title", {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          aria: "auto",
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 110,
              rotate: 2,
              duration: 1.05,
              stagger: 0.06,
              delay: 0.12,
              ease: natureEase,
            })
          },
        })

        gsap.from(
          ".hero-kicker, .hero-description, .hero-actions",
          {
            opacity: 0,
            y: 18,
            duration: 0.8,
            stagger: 0.06,
            delay: 0.4,
            ease: natureEase,
            clearProps: "transform,opacity",
          },
        )
        gsap.fromTo(
          ".hero-background-image",
          { scale: 1.065 },
          {
            scale: 1,
            duration: 1.5,
            ease: natureEase,
          },
        )

        const facts = factsRef.current
        if (facts) {
          const factsTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: facts,
              start: "top 88%",
              once: true,
            },
          })
          factsTimeline
            .from(".facts-rule", {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.65,
              ease: natureEase,
            })
            .from(
              ".fact-item",
              {
                opacity: 0,
                y: 14,
                duration: 0.65,
                stagger: 0.07,
                ease: natureEase,
                clearProps: "opacity,transform",
              },
              0.12,
            )
            .from(
              ".fact-item strong, .fact-item > span, .fact-item svg",
              {
                opacity: 0,
                duration: 0.45,
                stagger: 0.035,
                ease: natureEase,
                clearProps: "opacity",
              },
              0.26,
            )
        }
        return () => split.revert()
      })

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(".hero-background", {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
        },
      )

      return () => mm.revert()
    },
    { scope: heroRef, dependencies: [ready], revertOnUpdate: true },
  )
  return (
    <section id="inicio" className="nature-hero" ref={heroRef}>
      <Header ready={ready} />
      <div className="hero-stage">
        <div className="hero-background">
          <img
            className="hero-background-image"
            src="https://wp.residencialnature.com.br/wp-content/uploads/2026/03/fachadas-nature.png"
            alt="Fachada do Nature Residencial, com varandas e paisagismo"
            fetchPriority="high"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content shell">
          <p className="hero-kicker eyebrow">
            <span className="status-dot" /> ALTO, TERESÓPOLIS · RJ
          </p>
          <h1 className="hero-title">
            O essencial.
            <br /> Em um <em>novo padrão.</em>
          </h1>
          <div className="hero-bottom">
            <p className="hero-description">
              Um lugar para respirar fundo.
              <br />E viver tudo o que importa.
            </p>
            <div className="hero-actions">
              <button type="button" className="button-primary" onClick={openLeadModal}>
                Encontre o seu espaço <ArrowUpRight size={19} />
              </button>
              <a
                className="hero-explore"
                href="#nature"
                aria-label="Descubra o Nature"
              >
                <ArrowDown size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div ref={factsRef} className="hero-facts shell">
        <span className="facts-rule" aria-hidden="true" />
        <p className="fact-item">
          <strong>2 e 3</strong>
          <span>quartos</span>
        </p>
        <p className="fact-item">
          <strong>
            56,60 a 292,49 <small>m²</small>
          </strong>
          <span>espaços para a sua vida</span>
        </p>
        <p className="fact-item">
          <strong>Alto</strong>
          <span>o seu endereço em Teresópolis</span>
        </p>
        <a className="fact-item" href="#lazer">
          Natureza, lazer
          <br />e conveniência <ArrowUpRight size={23} />
        </a>
      </div>
    </section>
  )
}
export default Hero
