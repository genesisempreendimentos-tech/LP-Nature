# Hero, Design Técnico

> Unit de módulo · `hero` · Writer · 2026-09-10  
> Fonte: `Hero.tsx`

## Interface
| Símbolo | Assinatura | Retorno |
|---------|------------|---------|
| `Hero` | `(ready?: boolean)` | JSX |

## Fluxo Principal
1. Mount com Header(ready), imagem .hero-background-image, título, CTAs, facts.
2. useGSAP: se ready, SplitText no título, fades, Ken Burns no background.
3. Facts: ScrollTrigger start top 88% once.
4. Desktop ≥1024: parallax yPercent scrub no background.

## Fluxos Alternativos
- **!ready:** sem animações
- **reduced-motion:** matchMedia não aplica tweens

## Dependências
- Header
- useLeadModal
- gsap/SplitText
- App ready

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| CTA → modal (ADR-003) | openLeadModal no Hero | 🟢 |
| SplitText words+mask lines | Hero.tsx:18-32 | 🟢 |

## Estado Interno
Refs heroRef/factsRef; sem state de formulário.

## Observabilidade
Sem logs. 🟡

## Riscos e Lacunas
- 🟡 Copy do Hero pode estar parcialmente hardcoded vs siteData.hero
