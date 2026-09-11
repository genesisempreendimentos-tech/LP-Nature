# Pilares (Pillars), Tarefas de Implementação

> Caso de uso · `secoes-marketing/pilares` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] siteData.pillars.items
- [ ] CSS pillar-grid

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Implementar Pillars mapeando items + descrições por índice
  - Origem no legado: `src/components/nature/Pillars.tsx`
  - Critério de pronto: 4 pilares e nota de imagem
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Quatro pilares renderizam com alt baseado no título
- [ ] TT-02, Âncora #diferenciais

## Tarefas de Migração de Dados (se aplicável)

- Opcional: mover descrições para siteData. 🟡

## Ordem Sugerida

1. Dados → componente → motion

## Lacunas Pendentes (🔴)

- 🟡 Unificar textos descritivos no bundle de conteúdo.
