# Modal de Lead

> Caso de uso · `captura-lead/modal-lead` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Dialog acessível de captura com validação client-side e estado de sucesso. Contrato de payload documentado; persistência real ausente.

## Responsabilidades

- UI do formulário (nome, e-mail, telefone mascarado).
- Validar e emitir LeadPayload via console.log.
- Integrar com contexto isOpen/close.

## Regras de Negócio

- Reset ao abrir (isOpen true). 🟢
- phone mask '00 00000-0000'; valida 11 dígitos. 🟢
- prefixo visual +55; payload inclui +55. 🟢
- noValidate no form — validação custom. 🟢
- Persistencia no legado atual: so console.log. 🟢 Contrato alvo validado POST/PATCH /api/leads (Neon). 🟢 Impl. pendente (Astro). 🟡

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Campos nome, e-mail, telefone com erros | Must | aria-invalid |
| RF-02 | Sucesso após validação | Must | role=status |
| RF-03 | Fechar via X / onOpenChange | Must | closeLeadModal |
| RF-04 | Enviar ao backend | Won't | console.log only |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Acessibilidade | Radix + focus name on open | `onOpenAutoFocus` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado modal aberto com dados válidos
Quando submete
Então vê "Recebemos seu contato" após console.log

Dado modal fechado e reaberto
Quando inspeciona os campos
Então estão vazios sem erros
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Formulário + validação + success | Must | Conversão |
| API | Won't | Lacuna |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/LeadModal.tsx` | LeadModal | 🟢 |
| `src/context/LeadModalContext.tsx` | useLeadModal | 🟢 |

## Adendo de revisao (2026-09-10)

- Payload API: nome, email, telefone (11 digitos); opcional interesse_planta. 🟢
- Cadastro estendido via PATCH + token + allowlist (contracts.md). 🟢
- Producao: checkbox LGPD obrigatorio; URL politica ainda inexistente. 🔴 bloqueia go-live
