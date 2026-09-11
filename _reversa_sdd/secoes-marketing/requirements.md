# Seções de Marketing

> Unit de módulo · `secoes-marketing` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Conjunto de seções editoriais da landing Nature que sustentam narrativa de produto (essência, diferenciais, plantas, lazer, arquitetura e confiança) entre o Hero e a conversão final. Resolve o problema de apresentar o empreendimento de forma progressiva, com CTAs de lead e âncoras de navegação.

## Responsabilidades

- Renderizar LifeMoment, Pillars, FloorPlans, Amenities, Architecture e Trust na ordem definida por `App`.
- Expor âncoras `#nature`, `#diferenciais`, `#plantas`, `#lazer` (e seções sem id onde aplicável).
- Disparar abertura do modal de lead via `SectionCta` (padrão) e evento órfão `nature:plan` nas plantas.
- Consumir parcialmente `siteData` e, em alguns casos, conteúdo hardcodado no componente.

## Regras de Negócio

- Ordem na página: LifeMoment → Pillars → (Location fora deste módulo) → FloorPlans → Amenities → Architecture → Trust. 🟢
- CTAs de seção usam `SectionCta`, que abre o modal de lead salvo `defaultPrevented`. 🟢
- FloorPlans dispara `CustomEvent('nature:plan', { detail: area })` sem listener no repo. 🔴
- Amenities e Architecture usam arrays locais de imagens; Unsplash em `siteData.architecture.images` não é renderizado. 🟢
- Pillars usa `siteData.pillars.items` mas textos descritivos estão hardcodados no JSX. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Exibir seção Essência (`#nature`) com princípios e CTA | Must | Âncora #nature e CTA abrem modal |
| RF-02 | Exibir pilares/diferenciais (`#diferenciais`) a partir de siteData | Must | 4 pilares com imagem e título |
| RF-03 | Permitir seleção de plantas por metragem (`#plantas`) | Must | Troca de preview e aria-pressed |
| RF-04 | Galeria horizontal de lazer (`#lazer`) com navegação | Must | Rail scrolla com botões prev/next |
| RF-05 | Galeria de fachadas/arquitetura com tags de projeto | Should | 3 imagens + tags de siteData |
| RF-06 | Seção de confiança com certificações Gênesis | Should | Selos Nível A, PBQP-H, ISO 9001 |
| RF-07 | Consumidor do evento nature:plan | Won't (hoje) | Nenhum listener 🔴 |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | Imagens de pilares/plantas/lazer com loading lazy (eager só primeiros cards de lazer) | `Pillars.tsx`, `FloorPlans.tsx`, `Amenities.tsx` | 🟢 |
| Acessibilidade | Botões de planta com aria-pressed e aria-controls; rail com aria-label | `FloorPlans.tsx`, `Amenities.tsx` | 🟢 |
| Acessibilidade | Navegação do rail respeita prefers-reduced-motion (smooth → auto) | `Amenities.tsx:25` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado o visitante na landing após o Hero
Quando rola para as seções de marketing
Então vê Essência, Diferenciais, Plantas, Lazer, Arquitetura e Confiança nesta ordem relativa (com Localização intercalada pela casca)

Dado a seção de plantas
Quando seleciona uma metragem diferente
Então o preview atualiza para a imagem correspondente e o botão fica aria-pressed=true

Dado a seção de plantas
Quando clica em "Quero conhecer esta opção"
Então o modal de lead abre E um CustomEvent nature:plan é disparado com a área ativa

Dado a galeria de lazer
Quando clica em próximo/anterior
Então o rail desloca horizontalmente (smooth salvo reduced-motion)
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Essência + pilares + plantas | Must | Núcleo narrativo e exploração de produto |
| Lazer + arquitetura + confiança | Should | Prova social e desejo; conversão já coberta por CTAs |
| Listener nature:plan | Won't | Evento órfão no legado |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/LifeMoment.tsx` | LifeMoment | 🟢 |
| `src/components/nature/Pillars.tsx` | Pillars | 🟢 |
| `src/components/nature/FloorPlans.tsx` | FloorPlans | 🟢 |
| `src/components/nature/Amenities.tsx` | Amenities | 🟢 |
| `src/components/nature/Architecture.tsx` | Architecture | 🟢 |
| `src/components/nature/Trust.tsx` | Trust | 🟢 |
| `src/components/nature/SectionCta.tsx` | SectionCta (compartilhado) | 🟢 |
