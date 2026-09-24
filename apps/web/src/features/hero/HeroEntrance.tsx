import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { $appReady, bindAppReadyFromDom } from "../shell/appReady"
import { gsap, SplitText, natureEase } from "../../motion/gsap"

/**
 * Entrada do hero — paridade com src/components/nature/Hero.tsx (SplitText + settle).
 * Escopo: #inicio (markup estático em Hero.astro).
 */
export default function HeroEntrance() {
  const [ready, setReady] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    bindAppReadyFromDom()
    const sync = () => {
      if (
        document.documentElement.dataset.appReady === "1" ||
        $appReady.get()
      ) {
        setReady(true)
      }
    }
    sync()
    const unsub = $appReady.subscribe((v) => {
      if (v) setReady(true)
    })
    window.addEventListener("nature:app-ready", sync)
    return () => {
      unsub()
      window.removeEventListener("nature:app-ready", sync)
    }
  }, [])

  useGSAP(
    () => {
      if (!ready || started.current) return
      const hero = document.getElementById("inicio")
      if (!hero) return
      started.current = true
      hero.classList.add("is-ready")
      hero.setAttribute("data-hero-motion", "gsap")

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

        gsap.from(".hero-kicker, .hero-description, .hero-actions", {
          opacity: 0,
          y: 18,
          duration: 0.8,
          stagger: 0.06,
          delay: 0.4,
          ease: natureEase,
          clearProps: "transform,opacity",
        })

        gsap.fromTo(
          ".hero-background-image",
          { scale: 1.065 },
          {
            scale: 1,
            duration: 1.5,
            ease: natureEase,
          },
        )

        const badge = hero.querySelector(".hero-dezconto-badge")
        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, scale: 0.55, rotate: -22, y: 20 },
            {
              opacity: 1,
              scale: 1,
              rotate: -8,
              y: 0,
              duration: 1.05,
              delay: 0.55,
              ease: natureEase,
            },
          )
        }

        const facts = hero.querySelector(".hero-facts")
        if (facts) {
          const factsTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: facts,
              start: "top 88%",
              once: true,
            },
          })
          factsTimeline
            .from(facts.querySelector(".facts-rule"), {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.65,
              ease: natureEase,
            })
            .from(
              facts.querySelectorAll(".fact-item"),
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
              facts.querySelectorAll(
                ".fact-item strong, .fact-item > span, .fact-item svg",
              ),
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
          gsap.to(hero.querySelector(".hero-background"), {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
        },
      )

      return () => mm.revert()
    },
    { dependencies: [ready], revertOnUpdate: true },
  )

  return null
}
