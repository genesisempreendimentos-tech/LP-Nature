# Ambiguity Log — Migração Nature

> Atualizado após decisões Curator · 2026-09-10T18:09:47.316Z

## PENDENTES
- **Confirmação externa BR-HUMANA-005**: objetivo SEO/ads ainda precisa ser confirmado com quem decide (Bruno pediu (a) — não aceitar hipótese silenciosamente). Strategist deve marcar SEO como premissa **provisória** até confirmação.
- Prazo/orçamento/observabilidade (brief gaps)
- URL política de privacidade (Gênesis) — necessária antes de PATCH fase 2 / go-live estendido
- Metragem oficial Gênesis (fora do cutover técnico)

## RESOLVIDOS COM DECISÃO HUMANA
- Paradigma 3 híbrido / balanced
- Contrato API, interesse_planta, wa.me, Hidelgardo, POIs, Unsplash temp, whatsappMessage (Reviewer)
- **BR-HUMANA-001 = (b)** condicional a v1 POST-only — se PATCH na v1, rever para (a)
- **BR-HUMANA-002 = (a)** v1 POST-only; PATCH fase 2
- **BR-HUMANA-003 = (c)** BFF Astro/Node mesmo deploy
- **BR-HUMANA-004 = (b)** metragens do site na migração
- **BR-HUMANA-005 = (a)** confirmar SEO/ads com time (ação externa em aberto)
- **BR-HUMANA-006 = (a)** unificar amenities agora

## REFERIDOS À CODIFICAÇÃO
- nanostores + islands
- Payload PT / 11 dígitos
- Unificar siteData amenities + POIs
- BFF /api/leads no mesmo deploy
- **Prioridade #0:** instrumentar React legado → API/Neon (ver RESOLVIDOS — captura imediata)

## RESOLVIDOS — captura imediata (handoff)
- Ambiguidade “instrumentar legado **ou** baseline só Astro” **fechada**: ligar o **React atual** ao backend desenhado (`POST`/`PATCH /api/leads`, Neon, allowlist 8 campos) como tarefa **separada e prioritária**, desacoplada do cronograma Astro — objetivo parar de perder leads (`console.log`). Parallel run B continua; não há opção “só Astro” como substituto dessa prioridade.
- Ordem de implementação no handoff: após api/Neon, **lead + mapa islands** antes de shell/marketing (R01).

## RESOLVIDOS — Strategist
- Estratégia escolhida: **B Parallel Run** (Bruno), contra recomendação A.

## Emenda topology (2026-09-10)
- `packages/shared` passou de omitido/opcional (proposta oral) a **OBRIGATÓRIO** no topology_decision.md, com allowlist PATCH de 8 campos exatos.

## PENDENTES — dados Neon
- DDL completo / colunas auxiliares (`lead_token`, `interesse_planta`, etc.) em `site_nature`
- Migration `pagina_origem` **sem DEFAULT** (SQL em `api/migrations/001_pagina_origem_no_default.sql`) — aplicar no Neon
- Mapeamento JSON API → colunas reais (CSV NÃO-AUTORITATIVO em target_data_model.md)
- Regra: proibido tabela paralela
- ~~DEFAULT 'Site Institucional'~~ resolvido: **sem DEFAULT** (NULL se omitido; cada writer envia valor explícito)

## PENDENTES — qualidade phone / produto (CSV 15 linhas)
- Normalizar phone E.164 vs formato livre na API nova (decisão admin/negócio)
- Telefone internacional (+971): aceitar exclusão consciente na landing (só BR) vs revisitar depois
- Coluna `codigo` (ex. A1268): função desconhecida 🔴
- Evidência: created_at mais recente = hoje → tabela compartilhada ativa pelo site institucional (reforça anti-tabela-paralela)

## RESOLVIDOS — Designer
- Topologia híbrida + packages/shared obrigatório (aprovado)
- Arquitetura alvo (target_architecture / domain / data / migration plan) **aprovada** em 2026-09-10T18:32:01.864Z (Bruno). Pendências de dados Neon/phone permanecem como gaps, não bloqueiam a arquitetura.

## PENDENTES — Screen Translator Fase 1
- Escolher modo: literal | modernizado | híbrido | outro
- EC-17 design-system ausente; EC-18 ui/inventory ausente; EC-01 par react-spa→astro-islands fora da tabela v1

## RESOLVIDOS — Design System (2026-09-10T18:39:12.657Z)
- Agente `reversa-design-system` executado sob demanda (EC-17). Artefatos em `_reversa_sdd/design-system/`: color-palette, typography, spacing, tokens, design-system.md.
- Dualidade nature-* vs :root documentada (não unificar sem decisão).

## NOTA — EC-01 esclarecido (Screen Translator)
- EC-01 **não** se refere ao formulário de cadastro estendido (8 passos / PATCH fase 2).
- EC-01 = o **par de plataformas** `react-spa` → `astro-islands` **não aparece** na tabela mestre de `adapter-pairs.md` v1 do Screen Translator. É sobre formato de spec (adapter), não sobre escopo de telas do funil.

## RESOLVIDOS — dual accent (2026-09-10T18:58:32.088Z)
- Decisão humana: **MANTER** #788262 (content) e #5c6450 (interactive); formalizar papéis, não unificar.
- Spec atualizada em `_reversa_sdd/design-system/color-palette.md` e `tokens.md` (`contentAccent` / `interactiveAccent`).
- Aplicação em `theme.css` + remoção de `.amenity-tabs button span`: **bloqueada** por `allowLegacyEdits: false` — ver `pending_legacy_accent_formalization.md`.

## RESOLVIDOS — accents no codigo (aplicado)
- theme.css: --color-nature-accent mantida; aliases --color-content-accent e --color-interactive-accent; --color-accent intacta.
- index.css: removida regra orfa .amenity-tabs button span.
- App.tsx: sem alteracao.

## RESOLVIDOS — Screen Translator modo (2026-09-10T19:21:58.748Z)
- Modo **híbrido** aprovado (Bruno).
- Visor/screenshots **dispensados**; fonte de verdade = código para literal-ish; architecture/DS/domain para modernizadas.
- EC-17 resolvido antes; EC-18/RF-13 waived nesta decisão.

## RESOLVIDOS — Screen Translator deviations (2026-09-10T19:27:56.179Z)
- DEV-001…008 aprovados com o modo híbrido.
- **DEV-009 = opção A (revisável)**: modal BR-only (+55) na v1; público campanha = Teresópolis/RJ; wa.me rodapé sem restrição de país; reabrir se campanha internacional.

## RESOLVIDOS — Inspector / pipeline (2026-09-10T19:27:56.179Z)
- parity_specs.md + 8 parity_tests/*.feature
- handoff.md gerado
- Nenhuma deviation pendente

## RESOLVIDOS — emenda parity / contrato estável (2026-09-11)
- **PT-004 (`04-interesse-planta.feature`) DEPRECATED**: nature:plan + `interesse_planta` no POST foram removidos de propósito (Prioridade #0 / BFF estável sem coluna; decisão de produto “todas as plantas → cadastro normal”; UI “Interesse: X m²” revertida na codificação). Feature mantida só como histórico; fora do suite ativo e do manifesto de paridade.
- **PT-001 atualizado**: resposta do POST é `{ id }` — sem `token` / `lead_token`. Cliente envia só `{ nome, email, telefone }`; `pagina_origem` só no servidor.
- **DEV-008 formalizado** no `screen_deviation_log`: Header sticky no shell (fora do Hero) — não literal nesse ponto.

## PENDENTES (não bloqueiam start de código; bloqueiam partes do go-live)
- Neon DDL / pagina_origem / coluna codigo
- Política privacidade URL (PATCH fase 2)
- HUMANA-005 SEO confirmação
- Phone API: E.164 vs livre
- Metragem oficial Gênesis (campanha 65,88 m² vs site 56,60 m²); HUMANA-004=(b) manter site até confirmar — gap de conteúdo/negócio, não de stack

