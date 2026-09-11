# Captura de Lead

> Unit de módulo · `captura-lead` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Funil de conversão primário da landing: modal Radix com formulário (nome/e-mail/telefone), contexto global de abertura, FAB/bolha com timing em sessionStorage e seção `#contato` que reabre o modal. Hoje o submit apenas `console.log` — sem CRM/API.

## Responsabilidades

- LeadModalProvider / useLeadModal (open/close/isOpen).
- Validar e 'enviar' LeadPayload (client-only).
- WhatsAppFab: bolha timed + botão abrem modal (não wa.me).
- LeadForm #contato e SectionCta como gatilhos.

## Regras de Negócio

- Nome obrigatório (trim). 🟢
- E-mail obrigatório + regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/. 🟢
- Telefone: exatamente 11 dígitos; payload phone = `+55` + dígitos. 🟢
- Submit sucesso → console.log(data) + UI success; sem HTTP. 🔴
- FAB/bolha abrem openLeadModal; footer usa wa.me (exceção). 🟢
- Bolha: first 10s, visible 6s, reappear 52s, max 3, dismiss sessionStorage. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Abrir/fechar modal globalmente | Must | openLeadModal de qualquer CTA |
| RF-02 | Validar nome, e-mail e telefone 11 dígitos | Must | Mensagens de erro |
| RF-03 | Montar payload +55 e logar | Must | console.log no sucesso |
| RF-04 | POST real para CRM/API | Won't | Não implementado 🔴 |
| RF-05 | FAB com bolha timed max 3 | Should | sessionStorage keys |
| RF-06 | Seção #contato com CTA de modal | Must | LeadForm |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Acessibilidade | Radix Dialog; foco inicial no nome; aria-invalid/errors | `LeadModal.tsx` | 🟢 |
| Privacidade | Dados só no console do cliente — não persistem server-side | `LeadModal.tsx:62` | 🔴 |
| UX | Reset de campos ao reabrir modal | `LeadModal.tsx:31-38` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado o modal aberto
Quando envia sem nome
Então vê "Informe seu nome." e não loga

Dado e-mail inválido
Quando envia
Então vê "Informe um e-mail válido."

Dado telefone com ≠11 dígitos
Quando envia
Então vê erro de DDD/11 dígitos

Dado formulário válido
Quando envia
Então console.log recebe {name, email, phone:'+55...'} e a UI de sucesso aparece

Dado o FAB visível
Quando clica no botão ou na bolha
Então o modal abre e NÃO navega para wa.me
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Contexto + modal + validação | Must | Conversão (ADR-003) |
| FAB/bolha | Should | Reengajamento |
| Integração CRM | Won't | Lacuna crítica |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/context/LeadModalContext.tsx` | Provider / useLeadModal | 🟢 |
| `src/components/nature/LeadModal.tsx` | LeadModal | 🟢 |
| `src/components/nature/WhatsAppFab.tsx` | WhatsAppFab | 🟢 |
| `src/components/nature/LeadForm.tsx` | LeadForm | 🟢 |
| `src/components/nature/SectionCta.tsx` | SectionCta | 🟢 |
