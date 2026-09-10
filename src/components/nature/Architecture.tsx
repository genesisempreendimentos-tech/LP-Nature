import { siteData } from "../../data/nature"
import { RevealText } from "../../motion/RevealText"
import SectionCta from "./SectionCta"

const facades = [
  "https://wp.residencialnature.com.br/wp-content/uploads/2026/03/fachadas-nature.png",
  "https://wp.residencialnature.com.br/wp-content/uploads/2026/03/fachadas-nature-1-scaled.png",
  "https://wp.residencialnature.com.br/wp-content/uploads/2026/03/fachadas-nature-2-scaled.png",
]

export function Architecture() {
  const { architecture } = siteData

  return (
    <section className="architecture-section">
      <div className="shell">
        <div className="architecture-heading">
          <p className="eyebrow">05 / ARQUITETURA E PAISAGEM</p>
          <RevealText as="h2" text={architecture.headline} />
          <div className="architecture-copy">
            <SectionCta>Ver o projeto arquitetônico completo</SectionCta>
          </div>
        </div>

        <div className="architecture-gallery">
          <figure className="architecture-image architecture-image-main">
            <img src={facades[0]} alt="Fachada oficial do Nature Residencial" loading="lazy" />
            <figcaption><span>01</span>Fachada principal</figcaption>
          </figure>
          <figure className="architecture-image architecture-image-detail">
            <img src={facades[1]} alt="Detalhe arquitetônico oficial do Nature Residencial" loading="lazy" />
            <figcaption><span>02</span>Volumes e materiais</figcaption>
          </figure>
          <figure className="architecture-image architecture-image-landscape">
            <img src={facades[2]} alt="Paisagismo integrado do Nature Residencial" loading="lazy" />
            <figcaption><span>03</span>Arquitetura integrada</figcaption>
          </figure>
        </div>

        <div className="architecture-principles">
          <p><span>O PROJETO</span>Uma presença contemporânea, desenhada para pertencer à paisagem.</p>
          {architecture.tags.map((tag, index) => (
            <div key={tag}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{tag.toLowerCase()}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Architecture
