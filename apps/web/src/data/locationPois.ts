/**
 * Fonte única de POIs — mapa Leaflet + grade "Por perto".
 * Substitui a duplicação siteData.location.proximity × LocationMap points.
 */
export type MapPoiCategory =
  | "Comércio"
  | "Natureza"
  | "Rodovia"
  | "Faculdade"
  | "Saúde"
  | "Acessos"

export type LocationPoi = {
  /** Label da grade de proximidade (uppercase no legado). */
  label: string
  /** Texto da grade de proximidade. */
  text: string
  /** Nome no popup do mapa. */
  name: string
  category: MapPoiCategory
  distance: string
  icon:
    | "ShoppingBag"
    | "Trees"
    | "Fuel"
    | "GraduationCap"
    | "Hospital"
    | "Landmark"
  position: [number, number]
}

export const NATURE_POSITION: [number, number] = [-22.4372, -42.9822]

export const NATURE_ADDRESS = {
  title: "Nature Residencial",
  lines: ["Rua Hidelgardo de Noronha, 1516", "Alto, Teresópolis"],
  full: "Rua Hidelgardo de Noronha, 1516\nAlto · Teresópolis — RJ",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Hidelgardo+de+Noronha,+1516,+Alto,+Teres%C3%B3polis+-+RJ",
} as const

export const LOCATION_POIS: LocationPoi[] = [
  {
    label: "COMÉRCIO",
    text: "Feirinha do Alto, mercados e restaurantes na Av. Oliveira Botelho",
    name: "Praça Higino da Silveira e Feirinha do Alto",
    category: "Comércio",
    distance: "850 m",
    icon: "ShoppingBag",
    position: [-22.4424823, -42.9795707],
  },
  {
    label: "NATUREZA",
    text: "Parque Nacional da Serra dos Órgãos, trilhas e áreas verdes",
    name: "Parque Nacional da Serra dos Órgãos",
    category: "Natureza",
    distance: "2,7 km",
    icon: "Trees",
    position: [-22.4490611, -42.984843],
  },
  {
    label: "RODOVIA",
    text: "Acesso pela BR-116 e vias principais de Teresópolis",
    name: "Acesso à Rodovia Santos Dumont, BR-116",
    category: "Rodovia",
    distance: "3,2 km",
    icon: "Fuel",
    position: [-22.4520441, -42.9535164],
  },
  {
    label: "FACULDADE",
    text: "UNIFESO, campus sede no próprio Alto",
    name: "Centro Universitário Serra dos Órgãos, UNIFESO",
    category: "Faculdade",
    distance: "350 m",
    icon: "GraduationCap",
    position: [-22.4408416, -42.9781593],
  },
  {
    label: "SAÚDE",
    text: "UBS da Família do Alto e HCTCO nas proximidades",
    name: "Hospital das Clínicas de Teresópolis",
    category: "Saúde",
    distance: "4,7 km",
    icon: "Hospital",
    position: [-22.3984312, -42.9607314],
  },
  {
    label: "ACESSOS",
    text: "Av. Alberto Tôrres e principais vias do bairro",
    name: "Avenida Alberto Torres",
    category: "Acessos",
    distance: "500 m",
    icon: "Landmark",
    position: [-22.4264508, -42.9801246],
  },
]

/** Shape esperado pelo LocationMapIsland (mapa). */
export const MAP_POIS = LOCATION_POIS.map(
  ({ name, category, distance, icon, position }) => ({
    name,
    category,
    distance,
    icon,
    position,
  }),
)
