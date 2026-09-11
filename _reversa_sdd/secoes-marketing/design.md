# Seções de Marketing, Design Técnico

> Unit de módulo · `secoes-marketing` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

Componentes React de seção; sem endpoints HTTP.

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `LifeMoment` | `()` | JSX | id=`nature`; copy local |
| `Pillars` | `()` | JSX | id=`diferenciais`; items de siteData |
| `FloorPlans` | `()` | JSX | id=`plantas`; estado `activeIdx` |
| `Amenities` | `()` | JSX | id=`lazer`; rail + move(-1\|1) |
| `Architecture` | `()` | JSX | fachadas WP locais; tags de siteData |
| `Trust` | `()` | JSX | certificações hardcodadas |
| `SectionCta` | `(children, onClick?, className?)` | JSX | abre modal após onClick opcional |

## Fluxo Principal

1. `App` monta as seções na ordem fixa (Location é outro módulo). 🟢
2. Cada seção renderiza heading/eyebrow e conteúdo visual. 🟢
3. CTAs chamam `SectionCta` → `openLeadModal` (FloorPlans também dispara `nature:plan`). 🟢
4. Motion de entrada é responsabilidade do módulo `animacao` (`data-motion-heading`, seletores CSS). 🟢

## Fluxos Alternativos

- **Imagens falham ao carregar:** Sem fallback dedicado no JSX — browser mostra broken image. 🟡
- **Evento nature:plan:** Disparado sem consumidores — no-op funcional além do modal. 🔴
- **siteData.architecture.images (Unsplash):** Não usados por Architecture; mortos no bundle. 🟢

## Dependências

- `dados-conteudo` (`siteData`) — pilares, plantas, architecture.tags/headline, trust.headline.
- `captura-lead` — `SectionCta` / `LeadModalContext`.
- `animacao` — `RevealText` (Architecture, Trust) e reveals de `usePageMotion`.
- CDN WordPress (`wp.residencialnature.com.br`, `wp.genesisempreendimentos.com.br`, `wp.moregenesis.com.br`) para assets.

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Narrativa por seções numeradas (01–06) com âncoras seletivas | IDs em LifeMoment/Pillars/FloorPlans/Amenities | 🟢 |
| CTA unificado via SectionCta → modal (ADR-003) | `SectionCta.tsx` | 🟢 |
| Identidade de planta = metragem (ADR-009) | `FloorPlans.tsx` key/área | 🟢 |
| Lazer em rail horizontal em vez de grid | `Amenities.tsx` | 🟢 |
| Arquitetura: imagens oficiais WP no componente, não Unsplash de siteData | `Architecture.tsx` vs `nature.ts` | 🟢 |

## Estado Interno

- **FloorPlans:** `activeIdx` (React state) seleciona plano em `siteData.floorPlans.plans`.
- **Amenities:** `railRef` para `scrollBy`; sem estado de índice.
- Demais seções: stateless (derivam de props/constantes/siteData).

## Observabilidade

Sem logs nas seções. Único sinal lateral: `console.log` no submit de lead (outra unit) e CustomEvent sem telemetria. 🟡

## Riscos e Lacunas

- 🔴 Evento `nature:plan` sem consumidor — intenção de analytics/CRM desconhecida.
- 🔴 Duplicação/desvio: copy de LifeMoment e amenities hardcodados vs `siteData.lifeMoment` / `siteData.amenities` subutilizados.
- 🟡 Unsplash em `siteData.architecture.images` pode confundir reimplementação — fonte real são URLs WP em `Architecture.tsx`.
- 🟡 Múltiplos cards de Amenities rotulados 'Área gourmet' — possível inconsistência editorial.
