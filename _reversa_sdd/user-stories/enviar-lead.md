# User Story — Enviar lead

> Writer · 2026-09-10 · doc_level completo

## História

Como **visitante decidido a consultar unidades**,  
quero **enviar nome, e-mail e telefone**,  
para **ser contatado pela equipe Gênesis**.

## Critérios

- [ ] Posso abrir o modal a partir de Header, SectionCta, FAB/bolha ou #contato.
- [ ] Validação impede envio sem nome, e-mail válido ou telefone 11 dígitos.
- [ ] Telefone é normalizado com prefixo +55.
- [ ] Vejo confirmação de sucesso na UI.
- [ ] **Lacuna:** o lead precisa chegar a um CRM/API (hoje só `console.log`). 🔴

## Units relacionadas

- `captura-lead/`, `captura-lead/modal-lead/`, `openapi/lead.yaml`

## Confiança

Validação e UI 🟢 · Persistência 🔴
