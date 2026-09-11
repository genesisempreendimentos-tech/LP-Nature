# Plantas (FloorPlans)

> Caso de uso · `secoes-marketing/plantas` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Explorador de metragens do Nature: o visitante escolhe uma planta (área como identidade), vê o preview e solicita contato. Emite evento `nature:plan` sem consumidor conhecido.

## Responsabilidades

- Listar planos de `siteData.floorPlans.plans`.
- Manter seleção `activeIdx` e preview.
- CTA: CustomEvent + openLeadModal via SectionCta.

## Regras de Negócio

- Identidade da planta = `area` (ADR-009). 🟢
- Botões com aria-pressed e aria-controls=`plan-preview`. 🟢
- SectionCta onClick dispara `nature:plan` com detail = plan.area; depois abre modal. 🟢
- Nenhum `addEventListener('nature:plan')` no repositório — ausência confirmada no código. 🟢 Intenção de produto (se deve haver consumidor) permanece lacuna. 🔴 [Revisão]

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Listar metragens clicáveis | Must | Botões para cada plan.area |
| RF-02 | Atualizar preview ao selecionar | Must | img alt/planta muda com activeIdx |
| RF-03 | CTA abre modal e dispara nature:plan | Must | Evento + modal |
| RF-04 | Consumir nature:plan (analytics/CRM) | Won't | Sem listener 🔴 |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Acessibilidade | aria-pressed / aria-controls no seletor | `FloorPlans.tsx:31-33` | 🟢 |
| Performance | img loading=lazy; key=plan.image remonta preview | `FloorPlans.tsx:57-61` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado quatro plantas em siteData
Quando o visitante clica em "128,28 m²"
Então activeIdx aponta para essa planta e o preview mostra a imagem correspondente

Dado uma planta ativa
Quando clica em "Quero conhecer esta opção"
Então window recebe CustomEvent nature:plan com detail igual à área E o modal de lead abre

Dado o repositório atual
Quando se busca listeners de nature:plan
Então nenhum consumidor é encontrado
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Seleção + preview | Must | Exploração de produto |
| CTA + modal | Must | Conversão |
| Pipeline do evento | Won't | Órfão |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/FloorPlans.tsx` | FloorPlans | 🟢 |
| `src/data/nature.ts` | siteData.floorPlans | 🟢 |

## Adendo de revisao (2026-09-10)

Intencao confirmada: metragem vai como interesse_planta no POST /api/leads ao abrir modal a partir do CTA de planta. 🟢
Ausencia de listener no codigo legado permanece fato. 🟢 Impl. no Astro. 🟡
