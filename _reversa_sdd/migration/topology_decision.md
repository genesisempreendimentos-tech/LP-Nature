---
schemaVersion: 1
generatedAt: 2026-09-10T18:17:20.512Z
reversa:
  version: "1.3.3"
kind: topology_decision
producedBy: designer
hash: "sha256:66d2062c2e98b0e0ebeb2ad4b3808eb40fde76cbad150ce02bedcb6f2596067c"
---

# Topology Decision

> Decisão consciente sobre como organizar o sistema novo: preservar a topologia do legado, adotar uma topologia moderna ou aplicar um híbrido.
> Este artefato é leitura obrigatória do próprio Designer (para decompor bounded contexts) e do agente de codificação (para criar a árvore de pastas).

## Topologia do legado detectada
- **Padrão organizacional**: package-by-feature (módulos de conversão) dentro de monolito SPA React
- **Confiança**: 🟢 CONFIRMADO
- **Evidências**:
  - 7 módulos de feature em `architecture.md` / `surface.json` (app-shell, hero, marketing-sections, location-map, lead-capture, motion, content-data) 🟢
  - Árvore `src/components/nature/*` + `data` + `motion` + `context` em `inventory.md` 🟢
  - Sem package-by-layer (sem controllers/services/repos) — front estático 🟢
- **Mapa da árvore legada** (resumido):
  ```
  src/
    App.tsx
    components/nature/   # UI por seção
    context/             # LeadModalContext
    data/nature.ts       # siteData
    motion/
  ```

## Diagnóstico estrutural
- **Acoplamento**: alto no funil (Context + App.ready atravessam módulos) 🟢
- **Coesão por módulo**: alta nas seções de marketing; média em lead (FAB+modal+form) 🟢
- **Módulos órfãos / mortos**: `useScrollDirection` ocioso; `mapEmbedUrl` morto; `nature:plan` sem listener (corrigido na migração) 🟢
- **Camadas redundantes**: nenhuma clássica; duplicação de conteúdo POI/amenities 🟢
- **Violações de fronteira**: UI importa dados e controla side effects de lead sem porta de API 🟢
- **Mistura de paradigmas/estilos**: homogêneo React SPA + dicts estáticos 🟢
- **Avaliação geral**: parcialmente problemática (bom fatiamento visual; acoplamento de estado e data drift)

## Topologia moderna proposta
- **Padrão**: vertical slices / package-by-feature no Astro + slice BFF `leads` + **`packages/shared` obrigatório** + data unificada
- **Justificativa**: Stack Astro content-first; estratégia **B Parallel Run** exige `leads` isolável e compartilhado (Neon); paradigm híbrido (islands + nanostores); evita reorganização total desnecessária das seções de marketing. Tipos Lead **não** podem divergir entre web e api (mesmo anti-padrão de fonte dupla já visto no projeto).
- **Ganhos concretos esperados**:
  - Funil/API testável e reutilizável pelos dois fronts no parallel run
  - Data única (siteData) elimina drift POI/amenities
  - **Contrato Tipado único** Lead/PATCH allowlist em `packages/shared` — web e api importam a mesma fonte
  - Islands só onde há interatividade → LCP (se SEO confirmado)
- **Custo / risco**:
  - Curva nanostores + islands
  - Instrumentar legado para Neon (estratégia B)
  - Manter monorepo/workspace mínimo para `packages/shared`
- **Esboço da árvore proposta**:
  ```
  apps/web/                 # Astro
    src/pages/index.astro
    src/features/
      shell/                # preloader gate, header, footer (moderno)
      hero/
      marketing/            # life, pillars, plants, amenities, arch, trust (~legado)
      location/
      lead/                 # modal island + nanostores (importa @shared/lead)
      motion/
    src/data/               # siteData unificado
  apps/api/                 # BFF /api/leads (importa @shared/lead)
  packages/shared/          # OBRIGATÓRIO — tipos e constantes Lead
    lead.ts                 # LeadCreate, LeadPatchField allowlist, etc.
  ```

### `packages/shared` — obrigatório (não opcional)

Fonte única de tipos/contratos de Lead consumida por **`apps/web`** e **`apps/api`**. Proibido redefinir esses nomes em cada app.

Deve exportar, no mínimo:
- Tipos do POST inicial (`nome`, `email`, `telefone`, `interesse_planta` opcional, etc. conforme OpenAPI).
- Allowlist PATCH com **nomes e capitalização exatos** (8 campos):
  1. `relationship_status`
  2. `children_status`
  3. `profession`
  4. `monthly_investment` (nunca `monthly_income`)
  5. `sexo`
  6. `current_city`
  7. `birth_date`
  8. `profile_type`
- Constantes auxiliares (`pagina_origem` values, etc.) se usadas nos dois lados.

> Correção vs. proposta oral anterior: **"opcional" foi retirado**. Sem `packages/shared` obrigatório, o Parallel Run e o BFF recriam fonte dupla (como renda/endereço no passado).

## Opções apresentadas ao usuário
1. **Preservar topologia legada** (conservador)
   - Consequências: mapa mental familiar; perpetua Context/duplicação; fraco para Parallel Run limpo.
2. **Adotar topologia moderna proposta** (transformacional)
   - Consequências: reorganização completa em slices; mais esforço upfront.
3. **Híbrido** (equilibrado)
   - Consequências: `marketing/*` e `hero`/`location` espelham seções legadas; `shell`, `lead`, `data`, BFF `leads` e **`packages/shared` (obrigatório)** são fatias novas; motion acoplado a shell/ready via store.

## Decisão do usuário
- **Escolha**: 3
- **Justificativa do usuário**: (não fornecida além da escolha); pendência de aprovação após tornar `packages/shared` obrigatório
- **Decidido em**: 2026-09-10T18:15:27.478Z
- **Emenda de topologia**: 2026-09-10T18:17:20.512Z — `packages/shared` marcado OBRIGATÓRIO com allowlist PATCH explícita

## Mapeamento legado → novo
| Módulo / pasta legada | Bounded context novo | Tipo | Observações |
|---|---|---|---|
| casca-aplicacao (Header/Footer/Preloader/App) | features/shell | dividido+moderno | ready/inert via nanostores; não App monolítico |
| hero | features/hero | preservado | island se precisar motion |
| secoes-marketing/* | features/marketing/* | preservado | pastas por seção ok |
| mapa-localizacao | features/location | preservado | island Leaflet |
| captura-lead (modal/FAB/CTAs) | features/lead | fundido+moderno | nanostores; sem Context; tipos via @shared |
| motion | features/motion | preservado/adaptado | gated por store ready |
| content-data / nature.ts | src/data | moderno | fonte única; amenities+POIs |
| (vazio) | BFF leads /api/leads | novo | Parallel Run + OpenAPI; tipos via @shared |
| (vazio) | **packages/shared** | **novo obrigatório** | tipos Lead + allowlist PATCH; anti fonte-dupla |
| LeadModalContext | (descartado mecanismo) | removido | discard_log BR-DESCARTAR-001 |
| points[] / amenities hardcoded | (descartado cópia) | removido | discard_log BR-DESCARTAR-006 |

## Implicações pendentes para próximos passos do Designer
| Etapa do Designer | Implicação | Como honrar |
|---|---|---|
| Bounded contexts | Poucos BCs: Content, Experience Shell, Conversion (Lead), Location + Shared Contracts | Shared não é BC de negócio; é pacote de contrato |
| target_architecture | Astro web + BFF + Neon + **packages/shared**; legado paralelo na estratégia B | Diagrama: web e api → shared → Neon |
| target_domain_model | Lead + SiteContent + SessionUX; campos PATCH com nomes exatos do shared | Mapear BR-MIGRAR; allowlist imutável no shared |
| target_data_model | Tabela leads Neon alinhada aos nomes shared; content files | DDL leads; pagina_origem |

## Notas
- Estratégia B: instrumentar legado para POST Neon com `pagina_origem` distinta é pré-requisito de comparação justa.
- v1 sem PATCH público; shared já define allowlist para fase 2 sem drift de nomes.
- Não fazer decomposição 1-para-1 de Context/App root.
- **Proibido** duplicar tipos Lead em `apps/web` e `apps/api`.
