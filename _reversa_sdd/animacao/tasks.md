# Animação, Tarefas de Implementação

> Unit de módulo · `animacao` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] gsap + plugins
- [ ] ready gate da casca

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Configurar motion/gsap com natureEase e plugins
  - Origem no legado: `src/motion/gsap.ts`
  - Critério de pronto: Exports disponíveis
  - Confiança: 🟢

- [ ] T-02, Implementar usePageMotion registry completo
  - Origem no legado: `src/motion/usePageMotion.ts`
  - Critério de pronto: Seletores do legado cobertos
  - Confiança: 🟢
  - Nota: animacao/reveals-pagina/

- [ ] T-03, Implementar RevealText
  - Origem no legado: `src/motion/RevealText.tsx`
  - Critério de pronto: h2/h3 split; demais fade
  - Confiança: 🟢

- [ ] T-04, Consolidar registros GSAP (main/lib/motion)
  - Origem no legado: `src/main.tsx, src/lib/gsap.ts`
  - Critério de pronto: Um caminho claro de bootstrap
  - Confiança: 🟡

## Tarefas de Teste

- [ ] TT-01, Sem ready não anima
- [ ] TT-02, Reduced-motion sem tweens do registry
- [ ] TT-03, Heading reveal once

## Tarefas de Migração de Dados (se aplicável)

- N/A. 🟢

## Ordem Sugerida

1. gsap setup → usePageMotion → RevealText → cleanup registros

## Lacunas Pendentes (🔴)

- 🟡 Licença SplitText.
- 🟡 Destino de useScrollDirection.
