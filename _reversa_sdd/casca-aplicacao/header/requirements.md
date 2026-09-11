# Header (Navegação Sticky)

> Caso de uso · `casca-aplicacao/header` · Writer · 2026-09-10  
> Fonte: `src/components/nature/Header.tsx`

## Visão Geral

Barra de navegação sticky da landing: marca, âncoras das seções, menu mobile acessível e CTA que abre o modal de lead. Resolve orientação na página única e conversão a partir do chrome superior.

## Responsabilidades

- Exibir logo com link `#inicio` e fechar menu ao clicar.
- Navegar por âncoras: `#nature`, `#plantas`, `#lazer`, `#localizacao`.
- Alternar aparência sólida conforme scroll (histerese) ou menu aberto.
- Controlar menu mobile (toggle, Escape, click fora, breakpoint desktop).
- Abrir o modal de lead pelo CTA (não navegar para `#contato`).
- Animar entrada do pill quando `ready` e sem reduced-motion.

## Regras de Negócio

- Estado sólido: ativa se `scrollY > 80`; só desativa se `scrollY ≤ 40` (histerese). 🟢
- `data-scrolled={isSolid || menuOpen}` — menu aberto força aparência sólida. 🟢
- Escape com menu aberto: fecha e devolve foco ao toggle. 🟢
- Click/pointer fora do header fecha o menu. 🟢
- Viewport ≥ **761px**: fecha menu automaticamente. 🟢
- CTA chama `openLeadModal()` após fechar menu. 🟢
- Animação `.header-pill` só se `ready` e `prefers-reduced-motion: no-preference`. 🟢
- Labels ARIA do toggle refletem aberto/fechado; `aria-controls="main-nav"`. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Logo leva a `#inicio` e fecha menu | Must | Âncora e `menuOpen=false` |
| RF-02 | Links de âncora fecham menu ao clicar | Must | Navegação + menu fechado no mobile |
| RF-03 | Histerese de scroll 80/40 sem flicker | Must | Subir/descer na faixa 40–80 não oscila |
| RF-04 | Menu mobile toggle + Escape + click fora | Must | Fecha e restaura foco no Escape |
| RF-05 | Desktop ≥761px não deixa menu aberto | Must | Resize/matchMedia fecha |
| RF-06 | CTA abre LeadModal | Must | Modal visível; não muda hash para contato |
| RF-07 | Entrada animada do pill quando ready | Should | Fade in sem reduced-motion |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | Scroll via `requestAnimationFrame` (throttle) | `Header.tsx:24` | 🟢 |
| Acessibilidade | `aria-expanded`, Escape, foco no toggle | `Header.tsx:25-26`, `59` | 🟢 |
| Acessibilidade | Respeito a reduced-motion na entrada | `Header.tsx:50` | 🟢 |

## Critérios de Aceitação

```gherkin
Dado o header no topo (scrollY ≤ 40)
Quando o visitante rola além de 80px
Então o pill entra em estado sólido (data-scrolled true)

Dado o header sólido
Quando o visitante sobe mas ainda está acima de 40px
Então o estado sólido permanece (sem flicker)

Dado o menu mobile aberto
Quando o visitante pressiona Escape
Então o menu fecha e o foco volta ao botão toggle

Dado o menu mobile aberto
Quando a viewport passa a ≥761px
Então o menu fecha

Dado o header visível
Quando o visitante clica no CTA "Conheça seu novo endereço"
Então o modal de lead abre
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Âncoras + CTA lead | Must | Navegação e conversão |
| Histerese / menu a11y | Must | UX estável e teclado |
| Animação de entrada | Could | Cosmético dependente de ready |

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Header.tsx` | `Header` | 🟢 |
| `src/context/LeadModalContext.tsx` | `useLeadModal` | 🟢 |
| `src/components/nature/NatureLogo.tsx` | marca | 🟢 |
| `src/components/nature/Hero.tsx` | monta Header | 🟢 |
