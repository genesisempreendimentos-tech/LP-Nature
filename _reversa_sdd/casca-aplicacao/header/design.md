# Header (Navegação Sticky), Design Técnico

> Caso de uso · `casca-aplicacao/header` · Writer · 2026-09-10  
> Fonte: `src/components/nature/Header.tsx`

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `Header` | `(props?: { ready?: boolean })` | `JSX.Element` | Default `ready=true` |
| `useLeadModal().openLeadModal` | `() => void` | void | CTA de conversão |

Sem HTTP. 🟢

## Fluxo Principal

1. Mount com `isSolid` inicial = `window.scrollY > 80`; `menuOpen=false`. 🟢
2. `useEffect` registra scroll (rAF), keydown Escape, pointerdown fora, matchMedia 761px. 🟢
3. Em scroll: se sólido, permanece enquanto `scrollY > 40`; se transparente, solidifica em `scrollY > 80`. 🟢
4. Render: `header.site-header` → `.header-pill` com `data-scrolled={isSolid || menuOpen}`. 🟢
5. Nav com âncoras; CTA button chama `setMenuOpen(false)` + `openLeadModal()`. 🟢
6. Se `ready`, `useGSAP` + matchMedia anima fade-in de `.header-pill`. 🟢

## Fluxos Alternativos

- **Escape + menu aberto:** fecha menu e `toggleRef.focus()`. 🟢
- **Pointer fora do `headerRef`:** fecha menu. 🟢
- **Desktop ≥761px:** fecha menu (change do media query). 🟢
- **`ready=false`:** não roda animação de entrada. 🟢
- **Reduced-motion:** matchMedia não adiciona tween de entrada. 🟢

## Dependências

- `LeadModalContext` — CTA de conversão.
- `NatureLogo` — marca no brand-link.
- `gsap` / `natureEase` — entrada do pill.
- `lucide-react` — Menu / X / ArrowUpRight.
- Montado por `Hero` (não diretamente por `App`). 🟢

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Histerese 80/40 anti-flicker | `Header.tsx:20-22` + comentário | 🟢 |
| Menu aberto força `data-scrolled` | `Header.tsx:57` | 🟢 |
| CTA → modal (ADR-003), não `#contato` | `Header.tsx:67-73` | 🟢 |
| Breakpoint mobile/nav em 761px | `Header.tsx:31` | 🟢 |
| Scroll listener throttled por rAF | `Header.tsx:24` | 🟢 |
| Duplo span no CTA (label + fill) para efeito visual | `Header.tsx:75-76` | 🟢 |

## Estado Interno

| Campo | Tipo | Persistência |
|-------|------|--------------|
| `menuOpen` | boolean | React state |
| `isSolid` | boolean | React state (espelha var local `solid` no effect) |
| `headerRef` / `toggleRef` | refs | DOM |

## Observabilidade

- Sem logs/métricas. 🟡

## Riscos e Lacunas

- 🟡 Labels de nav e CTA hardcoded (não vêm de `siteData`) — drift se copy comercial mudar só no data file.
- 🟡 Hook `useScrollDirection` existe no repo mas não é usado aqui — possível duplicação futura.
- 🔴 Não há item de nav “Contato”; conversão é só via CTA modal — alinhado ao código, validar se marketing quer âncora explícita.
