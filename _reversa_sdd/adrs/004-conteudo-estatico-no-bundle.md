# ADR-004 — Conteúdo comercial estático no bundle (`siteData`)

- **Status:** aceito no código 🟢
- **Módulos:** `content-data`

## Contexto

`engineering-rules.md` pede separar DESIGN / MOTION / CONTEÚDO / TOKENS e manter o projeto “CMS ready”: React renderiza texto; GSAP só anima.

Não há CMS, i18n, preview ou painel.

## Decisão

Exportar um objeto `siteData` em `src/data/nature.ts` e importá-lo nas seções. Imagens apontam para CDNs WordPress da Gênesis/Nature (e Unsplash na arquitetura).

## Por quê (inferido)

Landing de um único empreendimento, copy estável, deploy via Figma Make / Vite. CMS seria overkill neste estágio. 🟡

## Observação

A regra “CMS ready” está **parcialmente** violada: Amenities (espaços/imagens), Trust (certificados visuais), POIs do mapa e várias strings de Hero/FloorPlans ainda vivem nos componentes. 🟡
