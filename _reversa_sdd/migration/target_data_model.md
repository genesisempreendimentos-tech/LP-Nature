---
schemaVersion: 1
generatedAt: 2026-09-10T18:27:03.481Z
reversa:
  version: "1.3.3"
kind: target_data_model
producedBy: designer
hash: "sha256:f6be21e050f656a041ebe2292e7ca9c2c1d7f9366057bca0faf358c2ae151db3"
authoritativeSchema: false
---

# Target Data Model

> Designer · emenda 2026-09-10 (inspeção de 15 linhas CSV)  
> **Este artefato NÃO define schema autoritativo da tabela Neon.**

## Regra absoluta (bloqueia implementação)

🔴 **Proibido criar tabela paralela.**  
A API nova (`POST/PATCH /api/leads`) **DEVE** escrever na **mesma tabela** já lida pelo projeto externo de sync com o **CVCRM** (compartilhada com outros empreendimentos, ex. Nature Petrópolis Residences).

- **Nome da tabela**: a confirmar com o admin do Neon 🔴  
- **Schema completo** (tipos, constraints, PK, índices): a confirmar com o admin do Neon 🔴  
- **Antes de qualquer implementação** de BFF/migração DDL: obter dump/schema real e substituir este documento.

Qualquer `CREATE TABLE leads` inventado pelo Designer é **inválido como fonte de verdade** e foi retirado deste papel.

### Evidência de que a tabela protegida está ativa em produção

Inspeção das **15 linhas** do CSV (não só o cabeçalho): o `created_at` **mais recente é de hoje** (2026-09-10 no momento da inspeção humana). Isso indica que o **site institucional está inserindo nessa tabela em produção agora**.

Reforço concreto (não só hipótese) da regra “proibido tabela paralela”: um schema paralelo faria os leads do Parallel Run/Astro **sumirem do funil CVCRM** enquanto o institucional continua alimentando a tabela “certa”.

## Interpretação de “sem backfill histórico”

Significa apenas: o front legado React **não** tinha persistência (`console.log`) — não há linhas desse front para copiar.

**Não** significa: liberdade para desenhar schema do zero.  
As ~15 linhas já gravadas (e as futuras do Parallel Run) vivem na tabela compartilhada existente; a API Astro/BFF grava **nessa** tabela.

## Lacuna Discovery

A fase de Discovery (`data-dictionary.md`, `erd-complete.md`) **não** documentou a tabela Neon — só o estado de UI do LeadModal. O conhecimento Neon veio de validação humana (Reviewer/brief) + inspeção CSV, não de engenharia reversa do banco.

## Coluna nova obrigatória: `pagina_origem`

**Não** consta no export CSV abaixo — ainda não existia / a criar.

Tabela alvo: **`site_nature`** (compartilhada; não assumir que só “Site Institucional” + “Página de Vendas” escrevem nela — também Nature Petrópolis Residences e possíveis outras origens).

**Migration (SEM DEFAULT)** — ver também `api/migrations/001_pagina_origem_no_default.sql`:

```sql
ALTER TABLE site_nature
  ADD COLUMN IF NOT EXISTS pagina_origem text;

-- Se já existir com DEFAULT herdado:
ALTER TABLE site_nature
  ALTER COLUMN pagina_origem DROP DEFAULT;
```

- **Proibido** `DEFAULT 'Site Institucional'` (suposição não verificada → rótulo errado em INSERT omitido).
- Sem DEFAULT: INSERT sem o campo grava **NULL** (origem desconhecida).
- Funil Página de Vendas: BFF grava valor **explícito** `'Página de Vendas'` (já no POST Prioridade #0).
- Parallel Run / legado instrumentado: cada front envia seu próprio valor explícito.
- Avisar mantenedor do sync CVCRM (lado dele não muda; só lê).


## Qualidade de dado herdada: campo `phone`

🔴 **GAP de qualidade — formato não normalizado no dado existente.**

Nas 15 linhas inspecionadas coexistem **pelo menos 3 formatos**:

| Exemplo observado | Padrão aparente |
|-------------------|-----------------|
| `(21) 96527-2231` | máscara nacional com pontuação |
| `+5521981810557` | E.164 BR |
| `21989941003` | dígitos nacionais sem + |

**Decisão pendente (admin Neon / negócio — não inventar na migração):**

| Opção | Descrição |
|-------|-----------|
| A | API nova **normaliza** para E.164 (`+55DDDNNNNNNNNN` para BR) antes de gravar |
| B | API nova **replica formato livre** como o dado legado já está (sem normalizar) |

- **Status:** PENDENTE — registrar escolha explícita antes de implementar o BFF.  
- **Não assumir** a regra do modal legado (“11 dígitos + prefixo visual +55”) como política de persistência no Neon sem essa decisão.

## Decisão de produto: telefones internacionais

Existe **pelo menos 1 lead real** com telefone internacional (`+971...`, Emirados Árabes Unidos) na tabela.

A regra do formulário de cadastro da landing (modal atual / contrato Reviewer: celular BR 11 dígitos, +55 fixo) **exclui esse perfil** — perfil que a empresa **já recebeu** pelo menos uma vez por outro canal/origem.

| Opção | Descrição |
|-------|-----------|
| A | **Aceitar a exclusão de forma consciente** na Página de Vendas (só BR); internacionais continuam podendo entrar por outros canais/sites |
| B | **Revisitar depois** (suporte internacional / seletor de país) — fora do escopo v1, mas tracked |

- **Status:** PENDENTE — precisa constar decisão explícita (A ou B); **não** deixar como lacuna muda.  
- Enquanto pendente: **não** tratar “só +55” como requisito de domínio fechado sem o registro da escolha.

## Allowlist PATCH da API vs colunas CSV

API (packages/shared) só aceita PATCH em:

`relationship_status`, `children_status`, `profession`, `monthly_investment`, `sexo`, `current_city`, `birth_date`, `profile_type`

O CSV inclui também `monthly_income` (e dezenas de colunas CVCRM).  
- **Não** mapear PATCH para `monthly_income` (decisão Reviewer: usar `monthly_investment`).  
- Colunas `cvcrm_*` / sync: escritas pelo projeto de sync — **fora do escopo** do BFF da landing (não sobrescrever no POST/PATCH do visitante).

## Conteúdo (filesystem) — BC Content

siteData unificado em `apps/web/src/data` (POIs + amenities, Hidelgardo). Sem DB de conteúdo.

## Referência NÃO-AUTORITATIVA

> **Rotulagem obrigatória: NÃO-AUTORITATIVA**  
> Lista de colunas recordadas/inspecionadas a partir de export CSV (15 linhas).  
> **Sem** confirmação de: nome da tabela, tipos, nullability, defaults, constraints, PK, FKs ou índices.  
> Serve **somente** para acelerar a confirmação com o admin Neon — **não** implementar DDL a partir desta lista.

```
id, name, email, phone,
codigo,                          # 🔴 GAP — função desconhecida (ex. valor observado "A1268"); não constava em listas anteriores
relationship_status, children_status, profession,
monthly_income, monthly_investment,
sexo, current_city, birth_date, profile_type, profile_completed,
canal, parameter, usuario_id, empreendimento_interesse, created_at,
cvcrm_lead_id, cvcrm_status, cvcrm_situation, cvcrm_stage,
cvcrm_is_sold, cvcrm_sale_value, cvcrm_sale_date, cvcrm_last_update,
cvcrm_payload, cvcrm_sync_status, cvcrm_sync_error,
cvcrm_last_synced_at, cvcrm_unidade, cvcrm_reserva_empreendimento,
cvcrm_sync_attempts, cvcrm_last_attempt_at
```

### Coluna `codigo` — 🔴 GAP
- Observada no CSV (ex.: `"A1268"`).  
- **Não** apareceu em nenhuma versão anterior da lista de colunas neste processo.  
- **Função desconhecida** — confirmar com admin Neon / negócio antes de a API ler ou escrever.

**Ausente na lista (a criar):** `pagina_origem`

**Possível desalinhamento de nomes API ↔ CSV:** contrato OpenAPI usa `nome`/`email`/`telefone` no JSON; CSV usa `name`/`email`/`phone`. O BFF deve mapear JSON → **colunas reais** confirmadas pelo admin (não assumir rename sem confirmação). 🔴

## Checklist antes de codar

- [ ] Admin Neon confirma nome da tabela e DDL completo  
- [ ] Migration `pagina_origem` **sem DEFAULT** (ADD COLUMN + DROP DEFAULT se já existir) aprovada / aplicada em `site_nature`  
- [ ] Mapeamento JSON API → colunas reais documentado em packages/shared  
- [ ] Proibido segundo schema/tabela “leads_v2” / “leads_astro”  
- [ ] Sync CVCRM informado  
- [ ] Decisão explícita: normalizar phone (E.164) vs formato livre  
- [ ] Decisão explícita: aceitar exclusão de internacionais na landing vs revisitar depois  
- [ ] Esclarecer função da coluna `codigo`  
