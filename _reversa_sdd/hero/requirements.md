# Hero

> Unit de módulo · `hero` · Writer · 2026-09-10  
> Fonte: `src/components/nature/Hero.tsx`

## Visão Geral
Primeira dobra persuasiva full-bleed: marca visual, headline, CTA de lead, fatos e Header embutido. Objetivo: converter atenção em abertura do modal.

## Responsabilidades
- Compor Header + fundo + título + descrição + CTAs + facts
- Animar entrada (SplitText, Ken Burns, facts ScrollTrigger) quando ready
- CTA principal abre LeadModal; secundários usam âncoras

## Regras de Negócio
- Animações só se `ready` e prefers-reduced-motion: no-preference. 🟢
- CTA principal → `openLeadModal()`, não navega para plantas. 🟢
- Imagem hero de CDN WordPress oficial. 🟢
- Parallax scrub do background só em viewport ≥1024px. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Exibir hero full-bleed com headline e facts | Must | Seção #inicio visível |
| RF-02 | CTA principal abre modal de lead | Must | LeadModal abre |
| RF-03 | Header integrado recebe prop ready | Must | Header anima com ready |
| RF-04 | Motion de entrada e facts on-scroll | Should | Sem motion se reduced-motion |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | Parallax só desktop ≥1024px | Hero.tsx (matchMedia) | 🟢 |
| Acessibilidade | SplitText aria:auto; reduced-motion skip | Hero.tsx useGSAP | 🟢 |

## Critérios de Aceitação

```gherkin
Dado ready=true sem reduced-motion
Quando o Hero monta
Então título e ações animam a entrada

Dado o Hero visível
Quando o visitante clica no CTA principal
Então o modal de lead abre
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| CTA lead + composição | Must | Conversão da dobra 1 |
| Motion premium | Should | Depende de ready |

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Hero.tsx` | Hero | 🟢 |
| `src/components/nature/Header.tsx` | Header | 🟢 |
