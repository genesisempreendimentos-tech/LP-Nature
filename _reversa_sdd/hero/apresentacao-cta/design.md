# Apresentação e CTA do Hero, Design Técnico

> `hero/apresentacao-cta` · Writer · 2026-09-10  
> Fonte: `Hero.tsx`

## Interface
Botões/links no bloco `.hero-actions`; facts em `factsRef`.

## Fluxo Principal
1. Render CTAs
2. Click → openLeadModal
3. ScrollTrigger nos facts

## Fluxos Alternativos
- **reduced-motion:** facts sem timeline

## Dependências
- useLeadModal
- gsap ScrollTrigger

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Primário = modal não planta | Hero CTA | 🟢 |

## Estado Interno
Nenhum além do context de lead.

## Observabilidade
N/A

## Riscos e Lacunas
- Nenhuma 🔴 específica
