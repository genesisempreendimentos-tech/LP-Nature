import type { MouseEventHandler, ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { openLeadModal } from "../lead/store"

type SectionCtaProps = {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

/** CTA de seção — Montserrat/accent interativo; abre a store de lead compartilhada. */
export function SectionCta({
  children,
  onClick,
  className = "",
}: SectionCtaProps) {
  return (
    <button
      type="button"
      className={`section-cta ${className}`.trim()}
      data-section-cta="true"
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          openLeadModal()
        }
      }}
    >
      <span className="section-cta-label">{children}</span>
      <ArrowUpRight
        className="section-cta-arrow"
        size={22}
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </button>
  )
}

export default SectionCta
