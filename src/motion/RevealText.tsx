import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, SplitText, natureEase } from "./gsap"

interface RevealTextProps {
  text: string
  as?: React.ElementType
  className?: string
  delay?: number
}
export function RevealText({
  text,
  as: Component = "p",
  className = "",
  delay = 0,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (Component === "h2" || Component === "h3") {
          const split = SplitText.create(containerRef.current, {
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
                delay,
                ease: natureEase,
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 90%",
                  once: true,
                },
              })
            },
          })
          return () => split.revert()
        }
        gsap.from(containerRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          delay,
          ease: natureEase,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 92%",
            once: true,
          },
          clearProps: "opacity,transform",
        })
      })
      return () => mm.revert()
    },
    {
      scope: containerRef,
      dependencies: [text, Component, delay],
      revertOnUpdate: true,
    },
  )
  return (
    <Component ref={containerRef} className={`reveal-text ${className}`}>
      {text}
    </Component>
  )
}
export default RevealText

