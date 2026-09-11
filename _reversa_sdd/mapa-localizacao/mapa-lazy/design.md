# Mapa Lazy, Design Técnico

> Caso de uso · `mapa-localizacao/mapa-lazy` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `LocationMapLazy` | `()` | JSX | state Map component |
| `LocationMap` | `()` | JSX | Leaflet |
| `Interaction` | `({active})` | null | side-effect handlers |
| `FitPoints` | `()` | null | fitBounds |

## Fluxo Principal

1. IO observe → import → setMap. 🟢
2. MapContainer center Nature zoom 14; handlers initially false. 🟢
3. FitPoints ajusta bounds. 🟢
4. Gate setActive(true). 🟢

## Fluxos Alternativos

- **Falha de rede no import:** Placeholder eterno. 🟡

## Dependências

- leaflet
- react-leaflet
- react-dom/server (ícones)
- OSM

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| DivIcon com HTML lucide/static markup | `createPointIcon` | 🟢 |
| Gate overlay em vez de scrollWheelZoom sempre on | `map-interaction-gate` | 🟢 |

## Estado Interno

`Map` (lazy), `active` (gate). 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🟡 Sem retry/error UI no lazy import.
- 🟡 Atribuição OSM obrigatória — manter.
