import { type RefObject } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, SplitText, natureEase } from "./gsap"

export default function usePageMotion(
  scope: RefObject<HTMLDivElement | null>,
  ready: boolean,
) {
  useGSAP(
    () => {
      if (!ready) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const splits = gsap.utils
          .toArray<HTMLElement>("[data-motion-heading]")
          .map((heading) =>
            SplitText.create(heading, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              aria: "auto",
              onSplit(self) {
                return gsap.from(self.lines, {
                  yPercent: 35,
                  opacity: 0,
                  duration: 0.65,
                  stagger: 0.06,
                  ease: natureEase,
                  scrollTrigger: {
                    trigger: heading,
                    start: "top 90%",
                    once: true,
                  },
                })
              },
            }),
          )
        gsap.utils
          .toArray<HTMLElement>(
            ".contact-copy > p",
          )
          .forEach((element) => {
            gsap.from(element, {
              opacity: 0,
              y: 12,
              duration: 0.7,
              ease: natureEase,
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
              clearProps: "opacity,transform",
            })
          })
        const pillarTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".pillar-grid",
            start: "top 86%",
            once: true,
          },
        })
        pillarTimeline
          .from(".pillar-item", {
            opacity: 0,
            y: 28,
            duration: 0.8,
            stagger: 0.09,
            ease: natureEase,
            clearProps: "opacity,transform",
          })
          .from(
            ".pillar-photo img",
            {
              scale: 1.08,
              duration: 1.05,
              stagger: 0.09,
              ease: natureEase,
              clearProps: "transform",
            },
            0,
          )
        const locationTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".location-experience",
            start: "top 88%",
            once: true,
          },
        })
        locationTimeline
          .from(".location-map", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: natureEase,
            clearProps: "opacity,transform",
          })
          .from(
            ".location-panel",
            {
              opacity: 0,
              x: 22,
              duration: 0.75,
              ease: natureEase,
              clearProps: "opacity,transform",
            },
            0.08,
          )
          .from(
            ".location-proximity-item",
            {
              opacity: 0,
              y: 14,
              duration: 0.55,
              stagger: 0.06,
              ease: natureEase,
              clearProps: "opacity,transform",
            },
            0.34,
          )
        gsap.from(".amenity-card", {
          opacity: 0,
          y: 22,
          duration: 0.75,
          stagger: 0.055,
          ease: natureEase,
          scrollTrigger: {
            trigger: ".amenities-rail",
            start: "top 90%",
            once: true,
          },
          clearProps: "opacity,transform",
        })
        gsap.from(".architecture-image", {
          opacity: 0,
          y: 24,
          duration: 0.85,
          stagger: 0.09,
          ease: natureEase,
          scrollTrigger: {
            trigger: ".architecture-gallery",
            start: "top 88%",
            once: true,
          },
          clearProps: "opacity,transform",
        })
        gsap.from(".trust-certificate", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.08,
          ease: natureEase,
          scrollTrigger: {
            trigger: ".trust-certifications",
            start: "top 88%",
            once: true,
          },
          clearProps: "opacity,transform",
        })
        return () => splits.forEach((split) => split.revert())
      })
      return () => mm.revert()
    },
    { scope, dependencies: [ready], revertOnUpdate: true },
  )
}

