import type { MouseEventHandler, ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { useLeadModal } from "../../context/LeadModalContext"

type SectionCtaProps = {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function SectionCta({
  children,
  onClick,
  className = "",
}: SectionCtaProps) {
  const { openLeadModal } = useLeadModal()

  return (
    <button
      type="button"
      className={`section-cta ${className}`.trim()}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) openLeadModal()
      }}
    >
      <span className="section-cta-label">{children}</span>
      <ArrowUpRight className="section-cta-arrow" size={22} strokeWidth={2.25} aria-hidden="true" />
    </button>
  )
}

export default SectionCta
