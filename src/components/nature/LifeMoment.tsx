import SectionCta from "./SectionCta"

export function LifeMoment() {
  return (
    <section id="nature" className="story-section shell">
      <div className="story-intro">
        <p className="eyebrow">01 / A ESSÊNCIA NATURE</p>
        <span aria-hidden="true">VIVER BEM, POR INTEIRO</span>
      </div>
      <div className="story-content">
        <div className="story-heading">
          <h2 data-motion-heading>
            Você conquistou mais.
            <br /> Agora, viva <em>melhor.</em>
          </h2>
          <span className="story-principles" aria-label="Espaço, tempo e natureza">
            {[
              ["01", "Espaço"],
              ["02", "Tempo"],
              ["03", "Natureza"],
            ].map(([number, label]) => (
              <span key={number}>
                <small>{number}</small>
                {label}
              </span>
            ))}
          </span>
        </div>
        <div className="story-copy">
          <div className="story-body">
            <p>
              Mais espaço para os seus planos. Mais tempo para estar perto. Mais
              natureza no caminho de casa.
            </p>
            <p>
              O Nature reúne arquitetura contemporânea, conforto e a tranquilidade
              da serra em um endereço que acompanha o seu momento.
            </p>
          </div>
          <SectionCta>Descubra o que faz a diferença</SectionCta>
        </div>
      </div>
    </section>
  )
}
export default LifeMoment
