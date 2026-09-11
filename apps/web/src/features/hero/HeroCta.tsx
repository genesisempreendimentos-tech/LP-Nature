import { ArrowUpRight } from "lucide-react"
import { openLeadModal } from "../lead/store"

/** CTA do hero — mesma store de lead; sem interessePlanta. */
export default function HeroCta() {
  return (
    <button
      type="button"
      className="button-primary"
      data-hero-cta="true"
      onClick={() => openLeadModal()}
    >
      Encontre o seu espaço <ArrowUpRight size={19} />
    </button>
  )
}
