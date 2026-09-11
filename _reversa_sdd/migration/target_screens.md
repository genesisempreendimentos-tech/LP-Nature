---
schemaVersion: 1
generatedAt: 2026-09-10T19:21:58.748Z
reversa:
  version: "1.3.3"
kind: target_screens
producedBy: screen-translator
mode: hybrid
sourcePlatform: react-spa
targetPlatform: astro-islands
adapter: react_spa__astro_islands
screenCount: 15
hash: "sha256:4b1dc9c2e6ab836b1166886e3fd96c0ada3bf388f46844b48bb03626fa7506a1"
---

# Target Screens

> Specs executáveis. Fonte de verdade do subset literal = **código React**. Subset modernizado = código + `target_architecture.md` + design-system + domain.

## Resumo

- **Modo aplicado**: híbrido
- **Telas geradas**: 15
- **Adapter**: react_spa__astro_islands (EC-01 / component-tree)
- **Tokens**: `_reversa_sdd/design-system/tokens.md` (`contentAccent` / `interactiveAccent`)
- **Golden files**: 0 presentes (manifest only)
- **Deviations**: ver `screen_deviation_log.md`
- **Visor**: dispensado (decisão humana 2026-09-10)

---

## Tela: hero

**Origem**: `src/components/nature/Hero.tsx`
**Inventário**: SCR-0003
**Modo aplicado**: literal
**Componentes / tokens**: [font.display, color.nature.text, color.contentAccent]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [lead-modal:open, #nature, #lazer]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code
spec.parity: near-1:1 visual+copy from JSX/CSS
spec.legacy_origin: src/components/nature/Hero.tsx
spec.root:
  component: Hero
  id: inicio
  class: nature-hero / hero-stage
  children:
    - component: Eyebrow
      text: "ALTO, TERESÓPOLIS · RJ"
    - component: H1
      text: |
        O essencial.
        Em um novo padrão.
      em_color_on_stage: "#d9ddc0"  # override; contentAccent #788262 NÃO aplica no stage
    - component: Description
      text: |
        Um lugar para respirar fundo.
        E viver tudo o que importa.
    - component: ButtonPrimary
      label: "Encontre o seu espaço"
      action: leadModal.open
    - component: Facts
      items: ["2 e 3 quartos", "56,60 a 292,49 m²", "Alto", link "Natureza, lazer e conveniência"]
spec.notes:
  - NÃO usa siteData.hero (hardcoded no legado — preservar)
  - Header montado dentro do Hero no legado; no alvo pode viver no shell (DEV-008)
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

Preserva estados do legado (parity por código). Loading/error explícitos só onde o legado já tem (ex.: plan image swap).

---

## Tela: life-moment

**Origem**: `src/components/nature/LifeMoment.tsx`
**Inventário**: SCR-0004
**Modo aplicado**: literal
**Componentes / tokens**: [font.display, color.contentAccent, color.interactiveAccent]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [lead-modal:open]
**Tela crítica?**: não

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code
spec.legacy_origin: src/components/nature/LifeMoment.tsx
spec.root:
  component: LifeMoment
  id: nature
  class: story-section
  children:
    - Eyebrow: "01 / A ESSÊNCIA NATURE"
    - Kicker: "VIVER BEM, POR INTEIRO"
    - H2: "Você conquistou mais. / Agora, viva melhor."  # em → contentAccent
    - Principles: ["01 Espaço", "02 Tempo", "03 Natureza"]
    - SectionCta:
        label: "Descubra o que faz a diferença"
        action: leadModal.open
        tokens: [color.interactiveAccent]
spec.notes: [não usa siteData.lifeMoment]
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

Preserva estados do legado (parity por código). Loading/error explícitos só onde o legado já tem (ex.: plan image swap).

---

## Tela: pillars

**Origem**: `src/components/nature/Pillars.tsx`
**Inventário**: SCR-0005
**Modo aplicado**: literal
**Componentes / tokens**: [font.display, color.nature.text]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: []
**Tela crítica?**: não

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code
spec.legacy_origin: src/components/nature/Pillars.tsx
spec.root:
  component: Pillars
  id: diferenciais
  class: pillars-section
  data: siteData.pillars.items  # number, title, image
  children:
    - PillarGrid: 4 items
    - ImageNote: "Imagens de referência de estilo de vida e ambientes."
spec.notes: [paragraphs hardcoded no legado — preservar]
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

Preserva estados do legado (parity por código). Loading/error explícitos só onde o legado já tem (ex.: plan image swap).

---

## Tela: location

**Origem**: `src/components/nature/Location.tsx`
**Inventário**: SCR-0006
**Modo aplicado**: literal
**Componentes / tokens**: [font.display, color.contentAccent, color.interactiveAccent, color.forest]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [lead-modal:open, external:mapLinkUrl]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code
spec.legacy_origin: src/components/nature/Location.tsx
spec.root:
  component: Location
  id: localizacao
  class: location-section
  data: siteData.location  # headline, address, mapLinkUrl, quotes, proximity
  children:
    - Eyebrow: "02 / ALTO · TERESÓPOLIS"
    - H2: "{{location.headline}}"
    - SectionCta:
        label: "Consultar unidades disponíveis no Alto"
        action: leadModal.open
    - AddressPanel:
        eyebrow: "SEU NOVO ENDEREÇO"
        address: "{{location.address}}"
        mapLink: { label: "Explorar no mapa", url: "{{location.mapLinkUrl}}", target: _blank }
    - Quotes: "{{location.quotes}}"
    - Proximity: "{{location.proximity}}"
    - LocationMapSlot: (modo modernizado SCR-0007)
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

Preserva estados do legado (parity por código). Loading/error explícitos só onde o legado já tem (ex.: plan image swap).

---

## Tela: floor-plans

**Origem**: `src/components/nature/FloorPlans.tsx`
**Inventário**: SCR-0008
**Modo aplicado**: literal
**Componentes / tokens**: [font.display, color.nature.primary, color.interactiveAccent]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [lead-modal:open+nature:plan]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code
spec.legacy_origin: src/components/nature/FloorPlans.tsx
spec.root:
  component: FloorPlans
  id: plantas
  class: plans-section
  data: siteData.floorPlans.plans
  children:
    - Eyebrow: "03 / SEU PRÓXIMO ESPAÇO"
    - H2: "À medida / da sua vida."
    - PlanOptions: areas ["56,60","66,68","128,28","292,49"] m²
    - SectionCta:
        label: "Quero conhecer esta opção"
        action: |
          dispatch CustomEvent("nature:plan", { detail: plan.area });
          leadModal.open
spec.notes: [interesse_planta no POST a partir deste evento — contrato Reviewer]
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

Preserva estados do legado (parity por código). Loading/error explícitos só onde o legado já tem (ex.: plan image swap).

---

## Tela: amenities

**Origem**: `src/components/nature/Amenities.tsx`
**Inventário**: SCR-0009
**Modo aplicado**: literal
**Componentes / tokens**: [font.display, color.interactiveAccent, color.forest]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [lead-modal:open]
**Tela crítica?**: não

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code
spec.legacy_origin: src/components/nature/Amenities.tsx
spec.root:
  component: Amenities
  id: lazer
  class: amenities-section
  children:
    - Eyebrow: "04 / TEMPO BEM VIVIDO"
    - H2: "Um espaço para cada / parte do seu dia."
    - SectionCta:
        label: "Conhecer toda a estrutura de lazer"
        action: leadModal.open
    - AmenitiesRail: horizontal scroll + prev/next
    - RailEnd: "11 ambientes para viver mais."
spec.notes:
  - Legado usa array local spaces — NÃO siteData.amenities (unificar no alvo: DEV-007)
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

Preserva estados do legado (parity por código). Loading/error explícitos só onde o legado já tem (ex.: plan image swap).

---

## Tela: architecture

**Origem**: `src/components/nature/Architecture.tsx`
**Inventário**: SCR-0010
**Modo aplicado**: literal
**Componentes / tokens**: [font.display, color.contentAccent, color.interactiveAccent]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [lead-modal:open]
**Tela crítica?**: não

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code
spec.legacy_origin: src/components/nature/Architecture.tsx
spec.root:
  component: Architecture
  class: architecture-section
  data: siteData.architecture.headline + tags
  children:
    - Eyebrow: "05 / ARQUITETURA E PAISAGEM"
    - H2: "{{architecture.headline}}"
    - SectionCta:
        label: "Ver o projeto arquitetônico completo"
        action: leadModal.open
    - Gallery: captions Fachada / Volumes / Arquitetura integrada
    - Principles: tags lowercased
spec.notes: [Unsplash temp permitido até foto oficial — Reviewer]
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

Preserva estados do legado (parity por código). Loading/error explícitos só onde o legado já tem (ex.: plan image swap).

---

## Tela: trust

**Origem**: `src/components/nature/Trust.tsx`
**Inventário**: SCR-0011
**Modo aplicado**: literal
**Componentes / tokens**: [font.display, color.contentAccent, color.teal]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: []
**Tela crítica?**: não

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code
spec.legacy_origin: src/components/nature/Trust.tsx
spec.root:
  component: Trust
  class: trust-section
  data: siteData.trust.headline
  children:
    - Eyebrow: "06 / QUEM CONSTRÓI ESSA HISTÓRIA"
    - H2: "{{trust.headline}}"
    - Intro: inclui "Gênesis Empreendimentos"
    - Certifications: Nível A / PBQP-H / ISO 9001
    - ProofLine: EXPERIÊNCIA / PARCERIA / COMPROMISSO
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

Preserva estados do legado (parity por código). Loading/error explícitos só onde o legado já tem (ex.: plan image swap).

---

## Tela: preloader

**Origem**: `src/components/nature/Preloader.tsx`
**Inventário**: SCR-0001
**Modo aplicado**: modernizado
**Componentes / tokens**: [color.preloader, font.display, font.body, ease.out]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [landing-page:onComplete]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code
spec.legacy_origin: src/components/nature/Preloader.tsx
spec.target_feature: apps/web/src/features/shell/preloader
spec.states: [idle, revealing, complete, skipped]
spec.root:
  component: NaturePreloader
  class: nature-preloader
  children:
    - component: BrandLogo
      content: { mark: true, wordmark: true }
    - component: Caption
      text: "O ESSENCIAL EM UM NOVO PADRÃO."
    - component: Status
      text: "Preparando seu próximo endereço"
    - component: SkipButton
      label: "Pular introdução"
      action: preloader.skip
spec.behaviors:
  - auto_exit_ms: ~1800 + fonts/image gate
  - escape_skips: true
  - body_overflow_hidden_while_visible: true
  - reduced_motion_or_hash: skip_entire_preloader (App)
spec.state_messages:
  idle: "Preparando seu próximo endereço"
  skipped: (não renderiza)
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

| Estado | Descrição |
|---|---|
| Idle | Default |
| Loading | Async em curso (mapa tiles / POST lead) |
| Error | Falha validação ou rede |
| Success | Operação ok (lead success view) |

---

## Tela: landing-page

**Origem**: `src/App.tsx`
**Inventário**: SCR-0002
**Modo aplicado**: modernizado
**Componentes / tokens**: [color.nature.background, color.interactiveAccent, font.nav]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [lead-modal:open, section:hash]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code+target_architecture
spec.legacy_origin: src/App.tsx + src/components/nature/Header.tsx
spec.target_feature: apps/web/src/features/shell
spec.states: [introVisible, ready, interactive]
spec.root:
  component: PageShell
  notes: Astro layout; ready/intro via nanostores (não React Context root)
  children:
    - component: SkipLink
      href: "#conteudo"
      text: "Pular para o conteúdo"
    - component: Header
      class: site-header / header-pill
      nav: ["O Nature→#nature", "Plantas→#plantas", "Lazer→#lazer", "Localização→#localizacao"]
      cta:
        label: "Conheça seu novo endereço"
        action: leadModal.open
        tokens: [color.interactiveAccent]
      behaviors: [scroll_solid_>80px, mobile_menu]
    - component: Main
      id: conteudo
      children_slots: [hero, marketing…, lead-cta]
    - component: FooterSlot
    - component: WhatsAppFabSlot
    - component: LeadModalSlot
spec.behaviors:
  - inert_while_introVisible: true
  - usePageMotion_gated_by_ready: true
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

| Estado | Descrição |
|---|---|
| Idle | Default |
| Loading | Async em curso (mapa tiles / POST lead) |
| Error | Falha validação ou rede |
| Success | Operação ok (lead success view) |

---

## Tela: location-map

**Origem**: `src/components/nature/LocationMap.tsx`
**Inventário**: SCR-0007
**Modo aplicado**: modernizado
**Componentes / tokens**: [color.nature.background, color.nature.primary, color.teal]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: []
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: target_architecture + code behaviors
spec.legacy_origin: src/components/nature/LocationMap.tsx + LocationMapLazy.tsx
spec.target_feature: apps/web/src/features/location (React island)
spec.states: [idle, loading, ready, gated, interactive]
spec.root:
  component: LocationMapIsland
  class: leaflet-map-shell
  children:
    - LoadingSkeleton: class location-map-loading
    - MapContainer: Leaflet + OSM tiles
    - InteractionGate:
        label: "Clique para navegar"
        action: enable_pan_zoom
    - Legend: ["Nature", "Pontos de interesse"]
    - Markers: Nature pin + POIs
spec.behaviors:
  - lazy_via_IntersectionObserver: true
  - tiles_filter: grayscale/saturate as CSS legado
spec.modernization:
  - POIs devem vir de siteData unificado (Curator BR-HUMANA-006) — DEV-007
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

| Estado | Descrição |
|---|---|
| Idle | Default |
| Loading | Async em curso (mapa tiles / POST lead) |
| Error | Falha validação ou rede |
| Success | Operação ok (lead success view) |

---

## Tela: lead-cta-section

**Origem**: `src/components/nature/LeadForm.tsx`
**Inventário**: SCR-0012
**Modo aplicado**: modernizado
**Componentes / tokens**: [font.display, color.interactiveAccent, color.forest]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [lead-modal:open]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code+target_architecture
spec.legacy_origin: src/components/nature/LeadForm.tsx
spec.target_feature: apps/web/src/features/lead
spec.states: [idle]
spec.root:
  component: ContactCtaSection
  id: contato
  class: contact-section
  children:
    - Eyebrow: "06 / VAMOS CONVERSAR"
    - H2: "Seu novo capítulo / tem um lugar / para começar."
    - Panel:
        kicker: "PRÓXIMO PASSO"
        cta: { label: "Consultar plantas e unidades", action: leadModal.open }
spec.notes: [sem form inline — só abre modal]
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

| Estado | Descrição |
|---|---|
| Idle | Default |
| Loading | Async em curso (mapa tiles / POST lead) |
| Error | Falha validação ou rede |
| Success | Operação ok (lead success view) |

---

## Tela: footer

**Origem**: `src/components/nature/Footer.tsx`
**Inventário**: SCR-0013
**Modo aplicado**: modernizado
**Componentes / tokens**: [color.text, color.gold, font.nav, font.body]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [external:wa.me, external:tel, external:mailto]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code+target_architecture
spec.legacy_origin: src/components/nature/Footer.tsx
spec.target_feature: apps/web/src/features/shell/footer
spec.root:
  component: SiteFooter
  class: site-footer
  data: siteData.footer + siteData.contact
  children:
    - BrandBlurb: "{{footer.blurb}}"
    - NavColumns
    - Contact: tel / WhatsApp(wa.me) / email / address
    - Social: IG/FB/LI + "Seguir no Instagram"
    - Bottom: privacy + © + disclaimer
spec.behaviors:
  - wa_me_ONLY_here: true  # FAB não usa wa.me
  - whatsapp_prefill: siteData.contact.whatsappMessage (Reviewer)
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

| Estado | Descrição |
|---|---|
| Idle | Default |
| Loading | Async em curso (mapa tiles / POST lead) |
| Error | Falha validação ou rede |
| Success | Operação ok (lead success view) |

---

## Tela: whatsapp-fab

**Origem**: `src/components/nature/WhatsAppFab.tsx`
**Inventário**: SCR-0014
**Modo aplicado**: modernizado
**Componentes / tokens**: [color.interactiveAccent, color.surface]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [lead-modal:open]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code+target_architecture
spec.legacy_origin: src/components/nature/WhatsAppFab.tsx
spec.target_feature: apps/web/src/features/lead
spec.states: [hidden, visible, bubble, paused]
spec.root:
  component: LeadFab
  class: lead-fab
  children:
    - Bubble: rotating phrases (sessionStorage max 3)
    - FabButton:
        aria: "Falar com um consultor"
        action: leadModal.open  # NÃO wa.me
spec.behaviors:
  - show_after_leave_hero: true
  - pause_while_modal_open: true
  - state_via_nanostores: true
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

| Estado | Descrição |
|---|---|
| Idle | Default |
| Loading | Async em curso (mapa tiles / POST lead) |
| Error | Falha validação ou rede |
| Success | Operação ok (lead success view) |

---

## Tela: lead-modal

**Origem**: `src/components/nature/LeadModal.tsx`
**Inventário**: SCR-0015
**Modo aplicado**: modernizado
**Componentes / tokens**: [color.interactiveAccent, cream.modal, color.error, font.display, font.body]
**Pontos de interpolação**: (ver YAML)
**Transições de saída**: [close, api:POST /api/leads]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.source_of_truth: code+openapi/lead.yaml+target_architecture
spec.legacy_origin: src/components/nature/LeadModal.tsx
spec.target_feature: apps/web/src/features/lead + apps/api
spec.states: [idle, validating, loading, error, success]
spec.root:
  component: LeadModal
  class: lead-modal-overlay + lead-modal-content
  children:
    - Eyebrow: "NATURE RESIDENCIAL"
    - Title: "Comece seu novo endereço"
    - Form:
        fields:
          - { name: nome, label: "Nome", placeholder: "Como podemos chamar você?", required: true }
          - { name: email, label: "E-mail", placeholder: "voce@exemplo.com", required: true }
          - { name: telefone, label: "Telefone", prefix: "+55", placeholder: "21 99999-9999", digits: 11, br_only: true }
        submit: { label: "Enviar contato", action: "POST /api/leads" }
    - Success:
        title: "Recebemos seu contato"
        cta: { label: "Fechar", action: leadModal.close }
spec.api:
  - legacy: console.log({name,email,phone})
    target: POST /api/leads {nome,email,telefone,interesse_planta?,pagina_origem}
    response: {id, token}
  - PATCH fase 2: bloqueado LGPD até política+checkbox
spec.state_messages:
  loading: (spinner no submit)
  error: mensagens de validação legadas / API
  success: "Recebemos seu contato"
```

### Pontos de divergência aceitos

- Ver DEV-* aplicáveis em `screen_deviation_log.md` (DEV-001 Visor waived; DEV-004/005 funnel; DEV-007 data unify; DEV-008 header shell).

### Estados

| Estado | Descrição |
|---|---|
| Idle | Default |
| Loading | Async em curso (mapa tiles / POST lead) |
| Error | Falha validação ou rede |
| Success | Operação ok (lead success view) |

---

## Apêndice: rastreabilidade

| Tela | ui/inventory | inventory.json |
|---|---|---|
| hero | (dispensado — Visor skipped) | SCR-0003 |
| life-moment | (dispensado — Visor skipped) | SCR-0004 |
| pillars | (dispensado — Visor skipped) | SCR-0005 |
| location | (dispensado — Visor skipped) | SCR-0006 |
| floor-plans | (dispensado — Visor skipped) | SCR-0008 |
| amenities | (dispensado — Visor skipped) | SCR-0009 |
| architecture | (dispensado — Visor skipped) | SCR-0010 |
| trust | (dispensado — Visor skipped) | SCR-0011 |
| preloader | (dispensado — Visor skipped) | SCR-0001 |
| landing-page | (dispensado — Visor skipped) | SCR-0002 |
| location-map | (dispensado — Visor skipped) | SCR-0007 |
| lead-cta-section | (dispensado — Visor skipped) | SCR-0012 |
| footer | (dispensado — Visor skipped) | SCR-0013 |
| whatsapp-fab | (dispensado — Visor skipped) | SCR-0014 |
| lead-modal | (dispensado — Visor skipped) | SCR-0015 |

