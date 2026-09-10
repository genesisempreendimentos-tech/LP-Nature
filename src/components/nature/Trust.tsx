import { siteData } from "../../data/nature"
import { RevealText } from "../../motion/RevealText"

const certifications = [
  {
    name: "Nível A",
    description: "Certificação de qualidade",
    image: "https://wp.genesisempreendimentos.com.br/wp-content/uploads/2026/08/selo-nivel-a-800.webp",
  },
  {
    name: "PBQP-H",
    description: "Programa Brasileiro da Qualidade e Produtividade do Habitat",
    image: "https://wp.genesisempreendimentos.com.br/wp-content/uploads/2026/08/selo-icone-01-pbqph-1-800.webp",
  },
  {
    name: "ISO 9001",
    description: "Sistema de gestão da qualidade certificado",
    image: "https://wp.genesisempreendimentos.com.br/wp-content/uploads/2026/08/selo-iso-9001-800.webp",
  },
]

export function Trust() {
  const { trust } = siteData

  return (
    <section className="trust-section">
      <div className="shell">
        <div className="trust-heading">
          <p className="eyebrow">06 / QUEM CONSTRÓI ESSA HISTÓRIA</p>
          <RevealText as="h2" text={trust.headline} />
          <div className="trust-intro">
            <p>Qualidade acompanhada em cada etapa, do projeto à entrega do seu novo endereço.</p>
            <strong>Gênesis Empreendimentos</strong>
          </div>
        </div>

        <div className="trust-certifications">
          <div className="trust-certifications-title">
            <span>QUALIDADE COMPROVADA</span>
            <h3>Certificações que sustentam cada escolha.</h3>
          </div>
          {certifications.map((certification, index) => (
            <article className="trust-certificate" key={certification.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className="trust-seal">
                <img src={certification.image} alt={`Selo ${certification.name}`} loading="lazy" />
              </div>
              <div>
                <h4>{certification.name}</h4>
                <p>{certification.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="trust-proofline">
          <p><span>EXPERIÊNCIA</span>Atuação consolidada na Região Serrana</p>
          <p><span>PARCERIA</span>Caixa Econômica Federal</p>
          <p><span>COMPROMISSO</span>Assistência também após a entrega</p>
        </div>
      </div>
    </section>
  )
}

export default Trust
