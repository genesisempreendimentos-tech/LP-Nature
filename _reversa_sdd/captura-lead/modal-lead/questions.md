# Perguntas em Aberto — Modal / CRM

> Opcional · `captura-lead/modal-lead` · Writer · 2026-09-10

## Lacunas 🔴 que bloqueiam produção

1. **Qual endpoint/CRM** deve receber o LeadPayload (RD Station, HubSpot, webhook próprio, planilha, e-mail)?
2. **Autenticação** do POST (API key, Bearer, signed URL)? Onde fica o segredo (não no bundle)?
3. **Campos extras** necessários (UTM, metragem `nature:plan`, página, consentimento LGPD)?
4. **SLA de resposta** comunicado ("em breve") — há automação de follow-up?
5. **Ambiente** (staging vs prod) e política de retenção de dados.
6. **Duplo canal**: footer `wa.me` vs modal — o comercial quer unificar ou manter ambos?
7. **privacyHref** ainda é `#` — URL real da política de privacidade?

## Inferências 🟡 a validar

- O evento `nature:plan` deveria enriquecer o lead com a metragem selecionada.
- O nome `WhatsAppFab` sugere WhatsApp, mas o comportamento é modal — renomear?
