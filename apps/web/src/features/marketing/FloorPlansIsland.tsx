import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { siteData } from "../../data/siteData"
import SectionCta from "./SectionCta"

export default function FloorPlansIsland() {
  const [activeIdx, setActiveIdx] = useState(0)
  const plan = siteData.floorPlans.plans[activeIdx]

  return (
    <section
      id="plantas"
      className="plans-section"
      data-marketing-reveal
      data-section="plantas"
    >
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
            {siteData.floorPlans.plans.map((item, i) => {
              const match = item.area.match(/^(.+?)\s*(m²)$/u)
              const value = match?.[1] ?? item.area
              const unit = match?.[2] ?? ""
              return (
                <button
                  key={item.area}
                  type="button"
                  aria-pressed={i === activeIdx}
                  aria-controls="plan-preview"
                  onClick={() => setActiveIdx(i)}
                  className={i === activeIdx ? "plan-option active" : "plan-option"}
                >
                  <span className="plan-option-label">
                    <span className="plan-option-area">{value}</span>
                    {unit ? <span className="plan-option-unit">{unit}</span> : null}
                  </span>
                  <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" />
                </button>
              )
            })}
            <p className="plan-note">
              Consulte as plantas técnicas e a disponibilidade de cada
              configuração com a equipe comercial.
            </p>
            <SectionCta>Quero conhecer esta opção</SectionCta>
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
