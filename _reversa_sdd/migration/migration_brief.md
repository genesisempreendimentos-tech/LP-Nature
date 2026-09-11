---
schemaVersion: 1
generatedAt: 2026-09-10T18:02:38.875Z
reversa:
  version: "1.3.3"
kind: migration_brief
producedBy: orchestrator
hash: "sha256:5918974141f8e751a959155ac882ae0c662dd245bab47023b5b40f466ef6b108"
---

# Migration Brief

> Documento de critério de migração coletado em entrevista no início do `/reversa-migrate`.
> Consumido pelos seis agentes do Time de Migração. Não pergunta paradigma (responsabilidade do Paradigm Advisor) nem apetite (derivado em `paradigm_decision.md`).

## Objetivo da migração

Inferência do stakeholder (Bruno), **não confirmada com o time**: melhorar performance/SEO para conversão de campanhas pagas (ads) e Quality Score.

⚠️ Se o motivo real for outro (custo de manutenção, preferência de stack, etc.), isso muda a prioridade do Strategist — validar com o time quando possível. 🟡

## Métricas de sucesso

- Melhora mensurável em **LCP / TTFB / Lighthouse** vs. site atual (React/Vite SPA).
- Critério protegido: **ZERO regressão na taxa de captura de lead** — migração técnica que piora conversão é fracasso mesmo com Lighthouse perfeito.
- Número-alvo específico de Lighthouse/LCP: **não definido** (gap). 🔴

## Restrições

- **Prazo**: não discutido (gap). 🔴
- **Orçamento**: não discutido (gap). 🔴
- **Técnicas**: contrato de API **preservado** — `POST /api/leads`, `PATCH /api/leads/:id`, Neon, allowlist de 8 campos já validada no Reviewer / `openapi/lead.yaml` v0.2.
- **Regulatórias**: formulário estendido **não pode ir a produção** sem política de privacidade real + checkbox de consentimento — bloqueia lançamento, não é preferência. 🔴
- **Operacionais**: não discutidos além do acima.

## Fatores de risco conhecidos

- (a) `LeadModal` e gate `App.ready` são estado compartilhado entre módulos; ilhas Astro não compartilham estado React por padrão — precisa **nanostores** (ou equivalente).
- (b) Backend Node/Express + Neon **ainda não existe**; só o contrato foi desenhado — migrar front e construir backend ao mesmo tempo é risco de sequenciamento.
- (c) Metragem do documento de campanha (65,88 m²) diverge da do site real (56,60 m²) — não resolvido (conteúdo/negócio).
- (d) POIs e lazer com fonte dupla (`siteData` vs. hardcoded) — migrar sem unificar replica a duplicação.

## Stakeholders

| Nome / papel | Responsabilidade na migração |
|---|---|
| Bruno | Decisão de produto/arquitetura |
| Administrador do Neon (nome a confirmar) | Confirmar nome real da tabela; aprovar migration da coluna `pagina_origem` |
| Mantenedor do sync CVCRM | Avisar sobre coluna nova; lado dele não muda |
| Gênesis Empreendimentos | Dona do dado real — metragem certa, grafia do endereço, fotografia oficial, texto de política de privacidade |

## Stack alvo

- **Linguagem**: TypeScript / JavaScript (Node)
- **Framework front**: **Astro** (com Tailwind, GSAP, Leaflet mantidos — sem motivo para trocar)
- **Estado compartilhado client**: **nanostores**
- **Framework/API**: Node/Express + **Neon Postgres** (backend ainda a construir)
- **Banco**: Neon Postgres (tabela compartilhada de leads)
- **Mensageria**: não se aplica
- **Infra**: VPS própria (já definida)
- **Observabilidade**: não discutido (gap). 🔴
- **Outros**: React islands onde necessário para interatividade (modal, mapa, motion)

## Escopo declarado

- **Incluído**: os 7 módulos da extração — `casca-aplicacao`, `hero`, `secoes-marketing`, `mapa-localizacao`, `captura-lead`, `animacao`, `dados-conteudo` (landing inteira).
- **Excluído da migração**: site institucional (projeto separado); projeto de sync CVCRM.
- **Fora do escopo de MIGRAÇÃO** (conteúdo/negócio, não arquitetura): confirmar metragem real; corrigir grafia do endereço; escrever política de privacidade; obter fotografia oficial.

## Notas livres

- Extração Reversa completa com Reviewer; contrato de lead e decisões de canal (FAB→modal, wa.me só no rodapé) já documentados em `_reversa_sdd/`.
- Objetivo de performance/SEO é hipótese de Bruno até o time confirmar.
- Go-live do formulário estendido bloqueado por LGPD até política + checkbox existirem.
