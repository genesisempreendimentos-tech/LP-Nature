---
schemaVersion: 1
generatedAt: 2026-09-10T18:07:39.696Z
reversa:
  version: "1.3.3"
kind: discard_log
producedBy: curator
hash: "sha256:d3b6013493731ef51a7aa1f9cd8fe651d73b75f3f014fdf414f12d7b52361db1"
---

# Discard Log

> Registro do que foi descartado da migração e por quê.

## Itens descartados

### BR-DESCARTAR-001 — React Context como bus de lead
- **Origem**: `captura-lead/`, paradigm_decision implicação 1
- **Descrição**: `LeadModalContext` / `useLeadModal` como mecanismo.
- **Justificativa**: Islands Astro não compartilham Context; comportamento open/close **migra** via nanostores.
- **Vinculado a paradigma**: sim — React SPA → Astro islands
  - Paradigma alvo absorve com store compartilhada.
- **Reposição**: nanostores (atoms) + ilha modal
- **Risco de descartar**: baixo (se store implementada); alto se esquecerem o store

### BR-DESCARTAR-002 — App.tsx como único root React da página
- **Origem**: `casca-aplicacao/`, paradigm_decision implicação 2
- **Descrição**: Toda a landing como uma árvore React.
- **Justificativa**: Alvo content-first Astro; HTML estático + islands.
- **Vinculado a paradigma**: sim
- **Reposição**: layouts Astro + ilhas (preloader, header interativo, modal, mapa, motion)
- **Risco**: médio — regressão de gate `ready` se mal portado

### BR-DESCARTAR-003 — Sucesso de lead sem persistência
- **Origem**: `domain.md` BR-14
- **Descrição**: `console.log` + UI de sucesso.
- **Justificativa**: Incompatível com métrica zero regressão real e contrato API.
- **Vinculado a paradigma**: não
- **Reposição**: sucesso após POST 2xx
- **Risco**: baixo

### BR-DESCARTAR-004 — mapEmbedUrl Google não usado
- **Origem**: `domain.md` BR-33
- **Descrição**: Campo morto no siteData.
- **Justificativa**: Leaflet/OSM é o mapa; não reintroduzir iframe.
- **Vinculado a paradigma**: não
- **Reposição**: none (manter mapLinkUrl)
- **Risco**: baixo

### BR-DESCARTAR-005 — noindex do Figma Make
- **Origem**: `domain.md` BR-35
- **Descrição**: `robots.index: false` no ambiente Make.
- **Justificativa**: Migração visa SEO/ads em VPS; noindex contradiz objetivo.
- **Vinculado a paradigma**: não
- **Reposição**: robots/indexação conforme deploy produção
- **Risco**: baixo (confirmar staging vs prod)

### BR-DESCARTAR-006 — Cópias hardcoded de POI/amenities
- **Origem**: Reviewer P7; brief risco (d)
- **Descrição**: `points[]` e rail locais duplicando siteData.
- **Justificativa**: Fonte única siteData na migração.
- **Vinculado a paradigma**: não
- **Reposição**: siteData / data Astro
- **Risco**: baixo se unificado; alto se portarem as duas fontes

## Itens descartados por mudança de paradigma

| ID | Origem | Paradigma legado | Substituto no paradigma alvo |
|---|---|---|---|
| BR-DESCARTAR-001 | LeadModalContext | React Context SPA | nanostores cross-island |
| BR-DESCARTAR-002 | App root único | SPA monolítica | Astro layout + islands |

## Notas
- Descartar mecanismo ≠ descartar regra de negócio (modal, ready, captura).
