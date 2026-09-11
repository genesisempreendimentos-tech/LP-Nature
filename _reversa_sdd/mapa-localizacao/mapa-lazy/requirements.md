# Mapa Lazy (LocationMapLazy + LocationMap)

> Caso de uso · `mapa-localizacao/mapa-lazy` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Carregamento diferido do mapa Leaflet/OSM e UX de interação gated, preservando performance e scroll da landing.

## Responsabilidades

- Observar host e importar LocationMap uma vez.
- Renderizar mapa com tiles OSM, Nature marker e POIs.
- Controlar enable/disable de handlers via gate.

## Regras de Negócio

- rootMargin: '700px 0px'; disconnect após load. 🟢
- NATURE_POSITION = [-22.4372, -42.9822]. 🟢
- active inicia false; gate button remove overlay. 🟢
- fitBounds com padding [46,46], maxZoom 14, animate false. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Dynamic import após IO | Must | Network: LocationMap chunk |
| RF-02 | Tiles OSM + attribution | Must | TileLayer url OSM |
| RF-03 | Gate de interação | Must | Handlers off até clique |
| RF-04 | POIs e Nature com popups | Must | 7 markers |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | Code-split + placeholder aria-hidden | `LocationMapLazy.tsx:26` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado LocationMapLazy montado
Quando o host intersecta com margem 700px
Então LocationMap é carregado e o observer desconecta

Dado mapa com active=false
Quando tenta scroll-zoom
Então scrollWheelZoom permanece disabled

Dado active=false
Quando clica no gate
Então active=true e handlers são enable()
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Lazy + OSM + gate | Must | ADR-002 + perf |
| POIs | Should | Contexto local |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/LocationMapLazy.tsx` | LocationMapLazy | 🟢 |
| `src/components/nature/LocationMap.tsx` | LocationMap / Interaction / FitPoints | 🟢 |
