# Spec Impact Matrix

> Architect · 2026-09-10 · Nature Residencial Landing  
> Lê-se: **linha alterada → colunas impactadas**  
> Legenda: ● alto · ◐ médio · ○ baixo · — nenhum  
> Confiança: 🟢 baseada em dependências de módulos confirmadas

---

## Matriz módulo × módulo

| Se alterar ↓ / Impacta → | app-shell | hero | marketing | location | lead | motion | content-data |
|--------------------------|-----------|------|-----------|----------|------|--------|--------------|
| **app-shell** | ● | ◐ | ○ | ○ | ◐ | ◐ | ○ |
| **hero** | ○ | ● | — | — | ● | ● | ○ |
| **marketing-sections** | ○ | — | ● | — | ● | ◐ | ● |
| **location-map** | ○ | — | — | ● | ○ | ◐ | ● |
| **lead-capture** | ◐ | ● | ● | ○ | ● | ○ | ○ |
| **motion** | ◐ | ● | ● | ● | ◐ | ● | — |
| **content-data** | ◐ | ● | ● | ● | ○ | — | ● |

---

## Impacto por tipo de mudança

| Mudança | Módulos tocados | Risco | Confiança |
|---------|-----------------|-------|-----------|
| Trocar copy/imagens comerciais | content-data (+ constantes locais Amenities/Map/Trust) | Drift se fontes paralelas | 🟢 |
| Integrar CRM no submit do lead | lead-capture (LeadModal) + possivelmente app-shell | Alto — funil core | 🟢 |
| Consumir `nature:plan` no form | marketing-sections + lead-capture | Médio — reconectar evento | 🟢 |
| Trocar Leaflet por iframe Google | location-map + content-data (`mapEmbedUrl`) | Médio — ADR-002 | 🟢 |
| Remover/alterar preloader | app-shell + hero + motion (`ready`) | Alto — gate global | 🟢 |
| Mudar easing/ScrollTrigger | motion → hero, marketing, location, FAB | Médio-alto visual | 🟢 |
| Header CTA / nav âncoras | app-shell (+ hero se Header embutido) | Médio | 🟢 |
| Política de privacidade real | content-data (`privacyHref`) + footer | Compliance 🔴 hoje | 🟢 |
| Unificar POIs e proximity | location-map + content-data | Médio conteúdo | 🟡 |
| Introduzir router/múltiplas páginas | app-shell + todos | Transformação arquitetural | 🟡 |

---

## Relação feature (organização) × módulo

| Feature sugerida (Scout) | Módulo(s) | Confiança |
|--------------------------|-----------|-----------|
| preloader | app-shell | 🟢 |
| hero-header | hero, app-shell | 🟢 |
| life-moment | marketing-sections | 🟢 |
| pillars | marketing-sections | 🟢 |
| location-map | location-map | 🟢 |
| floor-plans | marketing-sections | 🟢 |
| amenities | marketing-sections | 🟢 |
| architecture | marketing-sections | 🟢 |
| trust | marketing-sections | 🟢 |
| lead-capture | lead-capture | 🟢 |
| footer | app-shell | 🟢 |
| page-motion | motion | 🟢 |

---

## Componentes críticos (blast radius alto)

1. **`LeadModalContext` / `LeadModal`** — qualquer CTA da página. ●  
2. **`App.tsx` `ready`/`introVisible`** — motion, FAB, inert, Hero. ●  
3. **`siteData`** — quase todas as seções. ●  
4. **`usePageMotion` / GSAP registry** — experiência visual global. ●  
5. **`LocationMap`** — único chunk pesado + dependência OSM. ◐  

---

## Specs / ADRs mais sensíveis a regressão

| Artefato | Se quebrado, sintoma |
|----------|----------------------|
| ADR-003 modal primário | CTAs voltam a wa.me / #contato |
| ADR-009 metragem = identidade | seletor por quartos inventados |
| ADR-006 preloader timeouts | página travada em intro |
| ADR-002 Leaflet | regressão a iframe / custo Google |
| domain BR-03/04 | copy inventa estoque/suítes |
