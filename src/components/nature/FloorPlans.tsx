import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { siteData } from "../../data/nature"
import SectionCta from "./SectionCta"

export function FloorPlans() {
  const [activeIdx, setActiveIdx] = useState(0)
  const plan = siteData.floorPlans.plans[activeIdx]
  return (
    <section id="plantas" className="plans-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / SEU PRÓXIMO ESPAÇO</p>
            <h2 data-motion-heading>
              À medida
              <br /> da <em>sua vida.</em>
            </h2>
          </div>
          <p>
            Apartamentos de 2 e 3 quartos. Diferentes configurações para
            encontrar o seu jeito de morar.
          </p>
        </div>
        <div className="plan-layout">
          <div className="plan-options">
            <p className="eyebrow">EXPLORE AS METRAGENS</p>
            {siteData.floorPlans.plans.map((item, i) => (
              <button
                key={item.area}
                aria-pressed={i === activeIdx}
                aria-controls="plan-preview"
                onClick={() => setActiveIdx(i)}
                className={
                  i === activeIdx ? "plan-option active" : "plan-option"
                }
              >
                <span>{item.area}</span>
                <ArrowUpRight size={22} />
              </button>
            ))}
            <p className="plan-note">
              Consulte as plantas técnicas e a disponibilidade de cada
              configuração com a equipe comercial.
            </p>
            <SectionCta
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("nature:plan", { detail: plan.area }),
                )
              }
            >
              Quero conhecer esta opção
            </SectionCta>
          </div>
          <figure id="plan-preview" className="plan-preview">
            <img
              key={plan.image}
              src={plan.image}
              alt={`Planta de ${plan.area}`}
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
export default FloorPlans
