import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import SectionCta from "./SectionCta"

const spaces = [
  { name: "Academia", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-1.png" },
  { name: "Área gourmet", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-2.png" },
  { name: "Área gourmet", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-3.png" },
  { name: "Área gourmet", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-4.png" },
  { name: "Lavanderia", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-5.png" },
  { name: "Piscina", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-6.png" },
  { name: "Brinquedoteca", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-7.png" },
  { name: "Área gourmet", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-8.png" },
  { name: "Sauna", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-9.png" },
  { name: "Market", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-10.png" },
  { name: "Área gourmet", image: "https://wp.residencialnature.com.br/wp-content/uploads/2026/02/benfeitorias-nature-11.png" },
]

export function Amenities() {
  const railRef = useRef<HTMLDivElement>(null)

  const move = (direction: -1 | 1) => {
    railRef.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.72, 720),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    })
  }

  return (
    <section id="lazer" className="amenities-section">
      <div className="shell amenities-heading">
        <div>
          <p className="eyebrow">04 / TEMPO BEM VIVIDO</p>
          <h2 data-motion-heading>Um espaço para cada<br /><em>parte do seu dia.</em></h2>
        </div>
        <div className="amenities-intro">
          <SectionCta>Conhecer toda a estrutura de lazer</SectionCta>
        </div>
      </div>

      <div className="amenities-rail-wrap">
        <button
          type="button"
          className="amenities-nav amenities-nav-prev"
          onClick={() => move(-1)}
          aria-label="Ver ambientes anteriores"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="amenities-rail" ref={railRef} aria-label="Galeria de ambientes do Nature">
          <div className="amenities-rail-spacer" aria-hidden="true" />
          {spaces.map((space, index) => (
            <figure className="amenity-card" key={`${space.name}-${index}`}>
              <img src={space.image} alt={`Nature Residencial, ${space.name}`} loading={index < 2 ? "eager" : "lazy"} />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{space.name}</h3>
              </figcaption>
            </figure>
          ))}
          <div className="amenities-rail-end" aria-hidden="true"><span>11</span><p>ambientes<br />para viver mais.</p></div>
        </div>

        <button
          type="button"
          className="amenities-nav amenities-nav-next"
          onClick={() => move(1)}
          aria-label="Ver próximos ambientes"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  )
}

export default Amenities
