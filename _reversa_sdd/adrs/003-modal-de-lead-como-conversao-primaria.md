# ADR-003 — Modal global de lead como conversão primária

- **Status:** aceito no código 🟢 (decisão retroativa 🟡)
- **Módulos:** `lead-capture`, `hero`, `app-shell`, `marketing-sections`

## Contexto

O brief descrevia:

- formulário curto **na seção final** (nome, WhatsApp, e-mail) + checkbox LGPD;
- CTA sticky após ~35% no desktop e barra inferior no mobile;
- “não abrir popups automaticamente”;
- FAB/WhatsApp como canal.

O código tem `LeadForm` **sem campos** (só CTA), `LeadModal` Radix global, e `WhatsAppFab` cujo clique **não** abre `wa.me`.

## Decisão

1. Um `LeadModalProvider` na raiz; qualquer `SectionCta` / Header / Hero / FAB / bubble chama `openLeadModal()`.
2. O único formulário vive no modal.
3. Footer permanece com WhatsApp real (`wa.me`) como canal institucional paralelo.
4. Nome de componente `WhatsAppFab` foi preservado; comportamento atual é consultor/modal.

## Por quê (inferido)

Concentrar o funil num único fluxo reduz duplicação de validação e permite CTAs em todas as seções sem repetir o form. A bubble (máx. 3, dismissível, só após o hero) é um compromisso entre o sticky CTA do brief e a proibição de popup de urgência. 🟡

## Dívida explícita 🔴

- Sem checkbox LGPD.
- Sem envio a CRM.
- `CustomEvent("nature:plan")` não chega ao modal.
- Copy `siteData.cta` subutilizada.
