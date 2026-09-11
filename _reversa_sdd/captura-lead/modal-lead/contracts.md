# Contrato Lead API

> captura-lead/modal-lead · Revisao 2026-09-10
> Contrato validado por stakeholder. Implementacao front ainda ausente (console.log).

## POST /api/leads

| Campo | Tipo | Obrigatorio | Regra | Confianca |
|-------|------|-------------|-------|-----------|
| nome | string | sim | trim != vazio | 🟢 |
| email | string | sim | e-mail valido | 🟢 |
| telefone | string | sim | 11 digitos apenas (sem +55) | 🟢 |
| interesse_planta | string | nao (desejado) | metragem do CTA planta | 🟢 |
| consentimento_lgpd | boolean | sim em producao | checkbox explicito | 🟢 req / 🔴 URL politica |

**Efeitos:** gera lead_token opaco != id; INSERT Neon com pagina_origem = 'Pagina de Vendas'; retorna { id, token }.

**Auth visitante:** nenhuma. 🟢

## PATCH /api/leads/:id

Body: { token, field, value }. Valida token contra o lead.

Allowlist de field (nomes exatos):

1. relationship_status
2. children_status
3. profession
4. monthly_investment (nao monthly_income)
5. sexo
6. current_city
7. birth_date
8. profile_type

> Stakeholder citou "7 nomes" mas enumerou 8 — usar a lista explicita. 🟡

## Downstream

Tabela Neon compartilhada lida por outro projeto (sync CVCRM). Fora de escopo deste backend. 🟢

## Transporte no legado atual

| Aspecto | Estado | Confianca |
|---------|--------|-----------|
| Cliente atual | console.log com { name, email, phone:+55... } | 🟢 |
| Alinhamento | legado EN vs API PT; telefone com +55 vs 11 digitos | 🟡 adaptar no Astro |
| OpenAPI | openapi/lead.yaml v0.2 | 🟢 |
