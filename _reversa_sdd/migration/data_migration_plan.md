---
schemaVersion: 1
generatedAt: 2026-09-10T18:24:33.210Z
reversa:
  version: "1.3.3"
kind: data_migration_plan
producedBy: designer
hash: "sha256:9ed707731020dca56f27e8600f2dbb45af51265c2e9e9df1b118f109eb4f5119"
---

# Data Migration Plan

> Emenda 2026-09-10 — alinhado ao target_data_model (schema Neon não autoritativo).

## Escopo
- **Sem backfill** do front React: não havia persistência (`console.log`).
- **Não** criar tabela nova. Usar a tabela compartilhada **`site_nature`** (CVCRM / outros empreendimentos).
- Única mudança de schema prevista agora: adicionar `pagina_origem` **sem DEFAULT** (NULL se omitido). Se já existir com `DEFAULT 'Site Institucional'`, executar `DROP DEFAULT`. SQL: `api/migrations/001_pagina_origem_no_default.sql`.
- Conteúdo: portar siteData → `apps/web/src/data` (unificar POIs/amenities; Hidelgardo).

## Mapeamento
| Fonte | Destino | Transformação |
|-------|---------|---------------|
| — (sem leads do SPA) | — | sem backfill de linhas do React |
| CSV/tabela existente | mesma tabela | API INSERT/UPDATE nas colunas reais |
| JSON `nome/email/telefone` | colunas reais (ex. name/email/phone se confirmado) | map no BFF 🔴 confirmar |
| — | `pagina_origem` | migration + valor por front |
| siteData | filesystem content | unificar |

## ETL / cutover de dados
- Schema: **só** migration `pagina_origem` **sem DEFAULT** após aprovação admin Neon — não `CREATE TABLE` paralelo.
- Parallel Run: ambos fronts INSERT na **mesma** tabela com `pagina_origem` **explícito** (nunca depender de default).
- Cutover de tráfego: ver `cutover_plan.md` (estratégia B).

## Validação
- Leads novos aparecem na tabela que o sync CVCRM já lê.
- Contagem por `pagina_origem` após a coluna existir.
- Zero tabela sombra.

## Lacunas 🔴
- DDL completo da tabela `site_nature` (confirmar colunas `lead_token`, etc.)
- Mapeamento exato JSON ↔ colunas (name vs nome, etc.)
- Lista CSV em `target_data_model.md` é **NÃO-AUTORITATIVA**
- ~~DEFAULT 'Site Institucional'~~ — **descartado** (decisão: sem DEFAULT; NULL = desconhecida)
