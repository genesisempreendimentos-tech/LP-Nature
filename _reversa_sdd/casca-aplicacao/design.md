# Casca da Aplicação, Design Técnico

> Unit de módulo · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

Não há endpoints HTTP nesta unit. Interfaces são componentes React e estado local de bootstrap.

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `App` | `()` | `JSX.Element` | Orquestra intro, seções, provider e FAB |
| `Preloader` | `(onReveal, onComplete, pageRef)` | `JSX.Element` | Overlay de marca; detalhes na unit aninhada |
| `Header` | `(ready?: boolean)` | `JSX.Element` | Sticky; renderizado dentro do Hero |
| `Footer` | `()` | `JSX.Element` | Contatos e redes de `siteData` |
| `NatureLogo` | props de apresentação | `JSX.Element` | Marca reutilizada |
| `usePageMotion` | `(scope, ready)` | `void` | Disparado por App quando ready |

### Estado de bootstrap (App)

| Campo | Tipo | Origem inicial | Evolução |
|-------|------|----------------|----------|
| `ready` | `boolean` | `prefers-reduced-motion` **ou** `location.hash` → `true` | `onReveal` / `onComplete` → `true` |
| `introVisible` | `boolean` | `!ready` | `onComplete` → `false` |
| `pageRef` | `RefObject<HTMLDivElement>` | `useRef` | Escopo de motion + inert |

## Fluxo Principal

1. `main.tsx` registra plugins GSAP e monta `<App />` em `#root`. 🟢
2. `App` calcula `ready`/`introVisible` no primeiro render. 🟢 (`src/App.tsx:20-25`)
3. Envolve tudo em `LeadModalProvider`. 🟢
4. Se `introVisible`, monta `Preloader` e marca o wrapper da página com `inert`. 🟢
5. Renderiza skip-link + `main#conteudo` com seções na ordem fixa + `Footer` + `LeadModal`. 🟢
6. `usePageMotion(pageRef, ready)` arma reveals quando `ready`. 🟢
7. Preloader conclui → `completeIntro` → remove intro e monta `WhatsAppFab`. 🟢

## Fluxos Alternativos

- **Reduced motion no load:** `ready=true`, sem Preloader, página já interativa. 🟢
- **URL com hash:** mesmo caminho — pula intro para deep-link. 🟢
- **Escape / Pular / timeout 1800 ms no Preloader:** dispara `exit` (reveal + animação ou finish direto se reduced-motion). 🟢
- **Safety 2800 ms:** chama `finish` mesmo se a animação de saída travar. 🟢
- **Menu mobile aberto + Escape:** fecha e devolve foco ao toggle (Header). 🟢
- **Viewport ≥761 px:** fecha menu mobile automaticamente. 🟢

## Dependências

- `lead-capture` (`LeadModalProvider`, `LeadModal`, `WhatsAppFab`), conversão e overlay global.
- `hero` (`Hero` + Header embutido), primeira dobra.
- `content-data` (`siteData`) via Footer e seções filhas.
- `motion` (`usePageMotion`, GSAP no Preloader/Header).
- Seções de marketing/location/lead como filhos de composição (não importam a casca de volta).

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Gate dual `ready` + `introVisible` (reveal antecipa motion; complete remove overlay) | `App.tsx:20-30`, Preloader callbacks | 🟢 |
| `inert` no wrapper durante intro | `App.tsx:37` | 🟢 |
| Preloader com timeout de assets + safety | `Preloader.tsx:72-73` | 🟢 (ADR-006) |
| Header com histerese 80/40 em vez de limiar único | `Header.tsx:20-22` | 🟢 |
| CTA do header → modal, não `#contato` | Header + LeadModalContext | 🟢 (ADR-003) |
| Footer mantém `wa.me` como canal institucional | `Footer.tsx` + `siteData.contact` | 🟢 |
| Sem router — composição linear de uma página | `App.tsx` main children | 🟢 |

## Estado Interno

- **App:** `ready`, `introVisible`, `pageRef` (React state/ref).
- **Header:** `menuOpen`, `isSolid` (scroll histerese via rAF).
- **Preloader:** refs de overlay/finish; `body.overflow = hidden` enquanto montado; flags `disposed`/`exiting`.
- **Footer:** sem estado — deriva de `siteData`.

Não há persistência server-side. 🟢

## Observabilidade

- Sem logs/métricas/traces dedicados na casca. 🟡
- Lead submit loga em `console.log` (outra unit). 🟢

## Riscos e Lacunas

- 🔴 Destino do link de privacidade (`privacyHref: "#"`).
- 🟡 Hosting/deploy (Figma Make vs estático) não versionado neste repo — fora da casca, mas afeta noindex (ADR-007).
- 🟡 `useScrollDirection` existe no projeto mas Header não o usa — possível código morto na área de motion/hooks.
