import { ArrowUpRight, MapPin } from "lucide-react"
import { siteData } from "../../data/nature"
import { RevealText } from "../../motion/RevealText"
import LocationMapLazy from "./LocationMapLazy"
import SectionCta from "./SectionCta"

export function Location() {
  const { location } = siteData

  return (
    <section id="localizacao" className="location-section">
      <div className="shell">
        <div className="location-heading">
          <RevealText as="p" text="02 / ALTO · TERESÓPOLIS" className="eyebrow" />
          <RevealText as="h2" text={location.headline} />
          <div className="location-copy">
            <SectionCta>Consultar unidades disponíveis no Alto</SectionCta>
          </div>
        </div>

        <div className="location-experience">
          <div className="location-map">
            <LocationMapLazy />
          </div>

          <aside className="location-panel">
            <div className="location-address">
              <MapPin size={22} strokeWidth={1.4} aria-hidden="true" />
              <div>
                <p className="eyebrow">SEU NOVO ENDEREÇO</p>
                <strong>{location.address}</strong>
              </div>
              <a href={location.mapLinkUrl} target="_blank" rel="noreferrer">
                <span>Explorar no mapa</span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </div>

            <div className="location-quotes">
              {location.quotes.map((quote) => (
                <blockquote key={quote.title}>
                  <p>{quote.title}</p>
                  <q>{quote.text}</q>
                </blockquote>
              ))}
            </div>
          </aside>
        </div>

        <div className="location-proximity" aria-label="O que há por perto">
          <div className="location-proximity-title">
            <span>POR PERTO</span>
            <p>Tudo que faz parte da sua rotina.</p>
            <small>Conveniência, natureza e serviços essenciais no entorno do Nature.</small>
          </div>
          {location.proximity.map((item, index) => (
            <article className="location-proximity-item" key={item.label}>
              <span>0{index + 1}</span>
              <div><h3>{item.label}</h3><p>{item.text}</p><small>{item.distance}</small></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Location
