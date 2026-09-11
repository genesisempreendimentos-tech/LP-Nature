# Mapa e Localização, Design Técnico

> Unit de módulo · `mapa-localizacao` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `Location` | `()` | JSX | orquestra seção |
| `LocationMapLazy` | `()` | JSX | IO + dynamic import |
| `LocationMap` | `()` | JSX | Leaflet MapContainer |
| `NATURE_POSITION` | `[-22.4372, -42.9822]` | latlng | constante |

Sem HTTP próprio além de tiles OSM e assets de ícone `/brand/nature-symbol.svg`.

## Fluxo Principal

1. Location renderiza heading (RevealText), CTA, LocationMapLazy, painel e proximity. 🟢
2. LocationMapLazy observa host; ao intersectar, `import('./LocationMap')`. 🟢
3. LocationMap cria MapContainer, TileLayer OSM, FitPoints, markers, gate. 🟢
4. Clique no gate → active=true → Interaction habilita handlers. 🟢

## Fluxos Alternativos

- **Import falha:** Placeholder permanece; sem UI de erro. 🟡
- **mapEmbedUrl em siteData:** Não usado — mapa é Leaflet, não iframe Google (ADR-002). 🟢

## Dependências

- react-leaflet, leaflet, lucide-react
- siteData.location
- RevealText / SectionCta
- OpenStreetMap tile CDN
- animacao (location timelines)

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Leaflet+OSM em vez de iframe Google (ADR-002) | `LocationMap.tsx` | 🟢 |
| Lazy via IO 700px | `LocationMapLazy.tsx` | 🟢 |
| Gate de interação para não sequestrar scroll | `map-interaction-gate` | 🟢 |
| POIs no componente vs proximity no data | dois arrays | 🟡 |

## Estado Interno

- Location: stateless.
- LocationMapLazy: `Map` component state (null → loaded).
- LocationMap: `active` boolean para gate.

## Observabilidade

Sem logs. 🟢

## Riscos e Lacunas

- 🔴 Drift ortográfico Hidelgardo vs Hildegardo.
- 🟡 Duplicação proximity vs points (textos/distâncias podem divergir — ex.: saúde UBS vs HCTCO).
- 🟡 Política de uso OSM tiles em produção não documentada no repo.
- 🟡 mapEmbedUrl morto no siteData.
