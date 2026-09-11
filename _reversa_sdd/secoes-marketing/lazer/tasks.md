# Lazer (Amenities), Tarefas de Implementação

> Caso de uso · `secoes-marketing/lazer` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] SectionCta
- [ ] CSS amenities-rail

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Implementar Amenities com spaces, rail e move com reduced-motion
  - Origem no legado: `src/components/nature/Amenities.tsx`
  - Critério de pronto: Nav e 11 cards + end
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Prev/next alteram scrollLeft
- [ ] TT-02, Reduced-motion usa auto
- [ ] TT-03, CTA abre modal

## Tarefas de Migração de Dados (se aplicável)

- Avaliar mover `spaces` para siteData. 🟡

## Ordem Sugerida

1. Markup → scroll → CTA

## Lacunas Pendentes (🔴)

- 🔴 Fonte canônica: array local vs siteData.amenities.
