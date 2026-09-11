# Mapa e Localização

> Unit de módulo · `mapa-localizacao` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Seção `#localizacao` que comunica o endereço no Alto (Teresópolis), carrega mapa Leaflet/OSM sob demanda e lista proximidades. Resolve o problema de provar localização sem pesar o bundle inicial nem capturar scroll do usuário sem gesto.

## Responsabilidades

- Compor Location: heading, mapa lazy, painel de endereço/quotes, grade de proximidade.
- Lazy-load de LocationMap via IntersectionObserver (rootMargin 700px).
- Mapa OSM com POIs, gate de interação e marcador Nature em NATURE_POSITION.
- Expor duplicidade editorial: `location.proximity` (UI) vs `points[]` (mapa).

## Regras de Negócio

- Âncora id=`localizacao`. 🟢
- Mapa só importa chunk após interseção com rootMargin 700px 0px. 🟢
- Interação do mapa desabilitada até clique em 'Clique para navegar'. 🟢
- Tiles: tile.openstreetmap.org; centro [-22.4372, -42.9822]. 🟢
- Proximidade da UI usa siteData.location.proximity; marcadores usam array `points` local — dados paralelos. 🟡
- Ortografia do endereço diverge entre location.address (Hidelgardo) e footer (Hildegardo). 🔴

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Exibir headline, CTA e endereço com link Google Maps | Must | address + mapLinkUrl |
| RF-02 | Lazy-load do mapa antes de entrar no viewport (700px) | Must | LocationMap monta após IO |
| RF-03 | Gate de interação no mapa | Must | dragging/zoom só após ativar |
| RF-04 | Marcador Nature + POIs com popup | Must | 6 points + Nature |
| RF-05 | Listar proximidades textuais | Must | 6 itens de proximity |
| RF-06 | Unificar proximity e points | Won't (hoje) | Duplicação 🟡 |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | Code-split LocationMap; placeholder até load | `LocationMapLazy.tsx` | 🟢 |
| Performance | Prefetch espacial rootMargin 700px | `LocationMapLazy.tsx:17` | 🟢 |
| Usabilidade | Scroll da página não zooma o mapa até gate | `LocationMap.tsx` Interaction | 🟢 |
| Acessibilidade | aria-label no shell e no gate | `LocationMap.tsx` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado o visitante longe da seção localização
Quando a página carrega
Então o chunk LocationMap ainda não foi importado

Dado o host do mapa a ~700px de entrar no viewport
Quando IntersectionObserver dispara
Então LocationMap é importado e o mapa OSM aparece

Dado o mapa visível com gate ativo
Quando o usuário rola a página sobre o mapa
Então o scroll da página não ativa zoom/drag do Leaflet

Dado o gate
Quando clica em "Clique para navegar"
Então dragging, touchZoom, scrollWheelZoom e teclado são habilitados

Dado siteData.location.proximity e points[]
Quando se comparam distâncias/labels
Então há sobreposição semântica mas fontes distintas (risco de drift)
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Seção + endereço + mapa lazy | Must | Prova de localização |
| Gate de interação | Must | UX de scroll |
| POIs + proximidades | Should | Conveniência |
| Fonte única de POIs | Won't | Estado atual duplicado |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Location.tsx` | Location | 🟢 |
| `src/components/nature/LocationMapLazy.tsx` | LocationMapLazy | 🟢 |
| `src/components/nature/LocationMap.tsx` | LocationMap | 🟢 |
| `src/data/nature.ts` | siteData.location | 🟢 |
