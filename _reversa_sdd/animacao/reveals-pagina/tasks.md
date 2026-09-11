# Reveals de Página, Tarefas de Implementação

> Caso de uso · `animacao/reveals-pagina` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] Classes CSS das seções
- [ ] ready

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Portar usePageMotion integralmente
  - Origem no legado: `src/motion/usePageMotion.ts`
  - Critério de pronto: Todos os seletores do legado
  - Confiança: 🟢

- [ ] T-02, Portar RevealText
  - Origem no legado: `src/motion/RevealText.tsx`
  - Critério de pronto: Paridade h2/h3 vs default
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Cada trigger once
- [ ] TT-02, Cleanup sem leak ao toggle ready

## Tarefas de Migração de Dados (se aplicável)

- N/A. 🟢

## Ordem Sugerida

1. Hook → RevealText

## Lacunas Pendentes (🔴)

- 🟡 Validar SplitText em build produção.
