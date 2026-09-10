import { siteData } from "../../data/nature";
export function Pillars() {
  const { pillars } = siteData;
  return <section id="diferenciais" className="pillars-section shell"><div className="pillar-grid">{pillars.items.map((item, i) => <article key={item.number} className="pillar-item"><div className="pillar-photo"><img src={item.image} alt={`Referência de ${item.title.toLowerCase()}`} loading="lazy" /><span>{item.number}</span></div><h3>{item.title}</h3><p>{["A atmosfera da serra, perto de tudo.", "Um espaço que acompanha a sua vida.", "Bons momentos sem sair de casa.", "Luz, verde e espaço para respirar."][i]}</p></article>)}</div><p className="image-note">Imagens de referência de estilo de vida e ambientes.</p></section>;
}
export default Pillars;
