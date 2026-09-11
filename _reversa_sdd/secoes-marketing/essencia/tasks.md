# Essência (LifeMoment), Tarefas de Implementação

> Caso de uso · `secoes-marketing/essencia` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] SectionCta disponível
- [ ] CSS story-section

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Criar LifeMoment com id nature, princípios e SectionCta
  - Origem no legado: `src/components/nature/LifeMoment.tsx`
  - Critério de pronto: Paridade visual/estrutural com legado
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Âncora #nature e CTA abrem modal
- [ ] TT-02, Princípios acessíveis via aria-label

## Tarefas de Migração de Dados (se aplicável)

- Avaliar migração de `siteData.lifeMoment` → componente (lacuna). 🔴

## Ordem Sugerida

1. Implementar markup; depois motion global.

## Lacunas Pendentes (🔴)

- 🔴 Usar ou remover `siteData.lifeMoment`.
