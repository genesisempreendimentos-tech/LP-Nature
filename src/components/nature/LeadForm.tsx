import SectionCta from "./SectionCta"

export function LeadForm() {
  return (
    <section id="contato" className="contact-section">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">06 / VAMOS CONVERSAR</p>
          <h2 data-motion-heading>
            Seu novo capítulo
            <br /> tem um lugar
            <br /> <em>para começar.</em>
          </h2>
          <p>
            Conheça as configurações do Nature e dê o próximo passo para viver a
            serra do seu jeito.
          </p>
        </div>

        <div className="contact-cta-panel">
          <p className="contact-cta-kicker">PRÓXIMO PASSO</p>
          <p className="contact-cta-lead">
            Fale com a equipe comercial e consulte plantas e unidades
            disponíveis no Alto.
          </p>
          <SectionCta className="contact-cta">
            Consultar plantas e unidades
          </SectionCta>
          <p className="contact-cta-meta">
            Nature Residencial
            <br />
            Alto · Teresópolis — RJ
          </p>
        </div>
      </div>
    </section>
  )
}

export default LeadForm
