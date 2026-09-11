/**
 * Conteúdo do shell (nav + footer). Fonte única para Header/Footer do Astro.
 */
export const shellNav = [
  {
    id: "nature",
    href: "#nature",
    label: "O Nature",
    panelTitle: "O empreendimento",
    panelBody:
      "Um novo padrão de vida no Alto de Teresópolis — natureza, rotina e acabamento alinhados.",
  },
  {
    id: "plantas",
    href: "#plantas",
    label: "Plantas",
    panelTitle: "Plantas e metragens",
    panelBody:
      "Apartamentos de 2 e 3 quartos, de 56,60 a 292,49 m², para diferentes momentos da vida.",
  },
  {
    id: "lazer",
    href: "#lazer",
    label: "Lazer",
    panelTitle: "Lazer e convivência",
    panelBody:
      "Piscina, sauna, academia e espaço gourmet pensados para o dia a dia perto de casa.",
  },
  {
    id: "localizacao",
    href: "#localizacao",
    label: "Localização",
    panelTitle: "No Alto",
    panelBody:
      "Rua Hidelgardo de Noronha, 1516 — perto de comércio, natureza e serviços essenciais.",
  },
] as const

export const shellFooter = {
  blurb:
    "A Gênesis Empreendimentos desenvolve projetos imobiliários com foco em qualidade, confiança e valorização para famílias que buscam um novo lar.",
  address: "R. Hidelgardo de Noronha, 1516 — Alto, Teresópolis — RJ",
  phone: "(21) 2642-1203",
  email: "comercial@genesisempreendimentos.com.br",
  instagram: "https://www.instagram.com/genesisempreendimentos/",
  facebook: "https://www.facebook.com/genesisempreendimentos",
  linkedin: "https://www.linkedin.com/company/genesis-empreendimentos",
  instagramHandle: "@genesisempreendimentos",
  privacyHref: "https://genesisempreendimentos.com.br/politicas",
  disclaimer:
    "As imagens são meramente ilustrativas e não constituem oferta. Plantas, especificações, acabamentos e condições comerciais podem sofrer alterações sem aviso prévio. Consulte a disponibilidade real de unidades e a documentação do empreendimento junto à equipe comercial da Gênesis Empreendimentos.",
  /** DEV-009: wa.me sem restrição de país — não passar pelo modal. */
  whatsapp: "5521965484462",
  whatsappLabel: "(21) 96548-4462",
  whatsappMessage: "Olá, tenho interesse no Nature Residencial",
} as const
