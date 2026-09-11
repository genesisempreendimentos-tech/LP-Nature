# FAB e Bolha (WhatsAppFab)

> Caso de uso · `captura-lead/fab-bubble` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Botão flutuante + bolha de mensagens rotativas que reengaja o visitante após sair do Hero. Abre o modal de lead — não o WhatsApp.

## Responsabilidades

- Aparecer após scroll past `#inicio` (ScrollTrigger).
- Agendar bolha: 10s / visível 6s / reaparece 52s / máx 3.
- Persistir contagem/índice/dismiss em sessionStorage.
- Clique → openLeadModal.

## Regras de Negócio

- FIRST_DELAY_MS=10000, VISIBLE_MS=6000, REAPPEAR_MS=52000, MAX_SHOWS=3. 🟢
- Keys: nature_bubble_dismissed, nature_bubble_shown, nature_bubble_index. 🟢
- Não usa wa.me (diferente do Footer). 🟢
- Pausa ciclo enquanto modal aberto. 🟢
- Montado só quando introVisible=false (casca). 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | FAB visível após deixar o Hero | Must | ScrollTrigger bottom top de #inicio |
| RF-02 | Bolha com timing e max 3 | Must | sessionStorage count |
| RF-03 | Dismiss permanente na sessão | Should | dismissed=1 |
| RF-04 | Clique abre modal | Must | não navega WhatsApp |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Acessibilidade | aria-label no botão; bolha role=status | `WhatsAppFab.tsx` | 🟢 |
| Motion | Respeita prefers-reduced-motion nas tweens | `useGSAP` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado o visitante rolou além do Hero e a intro terminou
Quando passam ~10s sem dismiss e count=0
Então a bolha aparece com uma frase e some após ~6s

Dado count já em 3 ou dismissed
Quando o tempo passa
Então a bolha não reaparece nesta sessão

Dado a bolha ou o FAB
Quando clica
Então o LeadModal abre e a URL não muda para wa.me
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| FAB → modal | Must | Conversão secundária |
| Bolha timed | Should | Reengajamento |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/WhatsAppFab.tsx` | WhatsAppFab | 🟢 |

## Adendo de revisao (2026-09-10)

FAB continua abrindo o modal (nao WhatsApp). Confirmado. 🟢
