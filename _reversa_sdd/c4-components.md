# C4 — Componentes (Nível 3)

> Architect · 2026-09-10 · Nature Residencial Landing  
> Foco: container **Nature SPA**  
> Confiança: 🟢 estrutura de módulos confirmada em code-analysis / modules.json

---

## Diagrama

```mermaid
flowchart TB
  subgraph Shell["app-shell"]
    Main[main.tsx]
    App[App.tsx]
    Pre[Preloader]
    Hdr[Header]
    Ftr[Footer]
    Logo[NatureLogo]
  end

  subgraph HeroMod["hero"]
    Hero[Hero]
  end

  subgraph Mkt["marketing-sections"]
    LM[LifeMoment]
    Pil[Pillars]
    FP[FloorPlans]
    Am[Amenities]
    Arch[Architecture]
    Tr[Trust]
  end

  subgraph Loc["location-map"]
    LocS[Location]
    Lazy[LocationMapLazy]
    Map[LocationMap]
  end

  subgraph Lead["lead-capture"]
    Ctx[LeadModalContext]
    Modal[LeadModal]
    CTA[SectionCta]
    Fab[WhatsAppFab]
    FormSec[LeadForm seção]
  end

  subgraph Motion["motion"]
    GSAP[gsap.ts registry]
    PageM[usePageMotion]
    Reveal[RevealText]
  end

  subgraph Data["content-data"]
    SD[siteData nature.ts]
  end

  Main --> App
  App --> Ctx
  App --> Pre
  App --> Hero
  App --> LM
  App --> Pil
  App --> LocS
  App --> FP
  App --> Am
  App --> Arch
  App --> Tr
  App --> FormSec
  App --> Ftr
  App --> Fab
  App --> Modal
  App --> PageM

  Hero --> Hdr
  Hero --> Ctx
  LocS --> Lazy --> Map
  LocS --> CTA
  FP --> CTA
  LM --> CTA
  CTA --> Ctx
  Fab --> Ctx
  Modal --> Ctx
  Hdr --> Ctx

  PageM --> GSAP
  Reveal --> GSAP
  Hero --> GSAP
  LocS --> Reveal
  Arch --> Reveal
  Tr --> Reveal

  Hero -.-> SD
  LM -.-> SD
  Pil -.-> SD
  LocS -.-> SD
  FP -.-> SD
  Am -.-> SD
  Arch -.-> SD
  Tr -.-> SD
  Ftr -.-> SD
  FormSec -.-> SD
```

---

## Componentes por módulo

### app-shell 🟢
| Componente | Responsabilidade |
|------------|------------------|
| `main.tsx` | Mount React + plugins GSAP |
| `App.tsx` | Orquestra seções, `ready`/`introVisible`, provider |
| `Preloader` | Intro de marca com timeouts e escape |
| `Header` | Nav sticky + histerese + menu mobile |
| `Footer` | Contatos institucionais + wa.me |
| `NatureLogo` | Marca tipográfica/SVG |

### hero 🟢
| Componente | Responsabilidade |
|------------|------------------|
| `Hero` | Full-bleed, headline SplitText, CTA lead, facts |

### marketing-sections 🟢
| Componente | Responsabilidade |
|------------|------------------|
| `LifeMoment` | Essência / momento de vida |
| `Pillars` | Diferenciais |
| `FloorPlans` | Seletor por metragem + `nature:plan` |
| `Amenities` | Rail horizontal de lazer |
| `Architecture` | Galeria + tags |
| `Trust` | Selos institucionais |

### location-map 🟢
| Componente | Responsabilidade |
|------------|------------------|
| `Location` | Layout da seção |
| `LocationMapLazy` | Code-split por IntersectionObserver |
| `LocationMap` | Leaflet, POIs, gate de interação |

### lead-capture 🟢
| Componente | Responsabilidade |
|------------|------------------|
| `LeadModalContext` | Estado global open/close |
| `LeadModal` | Dialog + validação + submit local |
| `SectionCta` | CTA padrão → modal |
| `WhatsAppFab` | FAB + bubble agendado |
| `LeadForm` | Seção `#contato` (painel CTA) |

### motion 🟢
| Componente | Responsabilidade |
|------------|------------------|
| `gsap.ts` / `lib/gsap.ts` | Registro e CustomEase |
| `usePageMotion` | Reveals/scroll da página |
| `RevealText` | Texto com reveal |

### content-data 🟢
| Componente | Responsabilidade |
|------------|------------------|
| `siteData` | Copy e URLs comerciais no bundle |

---

## Dependências entre módulos

| Módulo | Depende de |
|--------|------------|
| app-shell | lead-capture, hero, content-data, motion |
| hero | lead-capture, motion |
| marketing-sections | content-data, lead-capture, motion |
| location-map | content-data, lead-capture, motion |
| lead-capture | motion |
| motion | — |
| content-data | — |
