# Preloader (Intro)

> Caso de uso · `casca-aplicacao/preloader` · Writer · 2026-09-10  
> Fonte: `src/components/nature/Preloader.tsx`

## Visão Geral

Overlay de marca exibido antes da landing ficar plenamente interativa. Garante que a imagem do hero e as fontes estejam prontas (com teto de tempo), permite pular a intro e devolve o foco de forma acessível ao concluir.

## Responsabilidades

- Exibir marca Nature + caption + status “Preparando seu próximo endereço”.
- Travar scroll do `body` enquanto o overlay estiver montado.
- Aguardar decode da imagem hero, `document.fonts.ready` e animação de entrada — ou timeout.
- Notificar o App via `onReveal` (libera motion) e `onComplete` (remove intro).
- Oferecer Escape, botão “Pular” e reação a mudança para reduced-motion.

## Regras de Negócio

- Timeout de assets: **1800 ms** força `exit`. 🟢
- Safety: **2800 ms** força `finish` (sem depender da animação de saída). 🟢
- Em reduced-motion, `exit` chama `finish` direto (sem slide). 🟢
- Em motion normal, `exit` chama `onReveal` e anima `yPercent: -100` (0.65s, `natureEase`). 🟢
- Escape no document dispara `exit`. 🟢
- Mudança de media query para reduced-motion dispara `exit`. 🟢
- Se o foco estiver no overlay ao finalizar, remove `inert` da página e foca `.skip-link`. 🟢
- Botão “Pular introdução” chama o mesmo `exit`. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Overlay cobre a viewport com logo e caption | Must | Visível enquanto montado |
| RF-02 | Scroll da página bloqueado durante intro | Must | `body.overflow` hidden; restaurado no cleanup |
| RF-03 | Conclusão automática após assets ou 1800 ms | Must | Overlay inicia saída sem ação do usuário |
| RF-04 | Safety 2800 ms garante remoção do overlay | Must | Mesmo com falha de animação, intro some |
| RF-05 | Usuário pode pular via botão ou Escape | Must | `exit` imediato |
| RF-06 | Reduced-motion: saída sem animação de slide | Must | `onComplete` sem tween de exit |
| RF-07 | Foco acessível pós-intro quando necessário | Should | Skip-link recebe foco se overlay tinha foco |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | Bound de 1,8s / 2,8s para nunca prender o visitante | `Preloader.tsx:72-73` | 🟢 |
| Acessibilidade | Escape, botão Pular, `role="status"`, foco no skip-link | `Preloader.tsx:49-51`, `25-28`, `97-98` | 🟢 |
| Disponibilidade | Flags `disposed`/`exiting` evitam double-exit | `Preloader.tsx:18-40` | 🟢 |

## Critérios de Aceitação

```gherkin
Dado o Preloader montado sem reduced-motion
Quando a imagem do hero decodifica e as fontes ficam ready
Então onReveal é chamado e o overlay anima a saída até onComplete

Dado o Preloader montado e assets lentos
Quando passam 1800 ms
Então exit é forçado mesmo sem assets prontos

Dado o Preloader ainda visível após iniciar exit
Quando passam 2800 ms desde o mount
Então finish/onComplete ocorre (safety)

Dado o Preloader visível
Quando o usuário pressiona Escape ou clica em Pular introdução
Então a intro encerra sem travar a página

Dado prefers-reduced-motion: reduce durante a intro
Quando exit é disparado
Então onComplete ocorre sem animação de slide
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Timeouts + exit/finish | Must | Evita página presa (ADR-006) |
| Escape / Pular | Must | Controle do usuário |
| Reduced-motion | Must | Acessibilidade |
| Animação de marca | Should | Experiência de marca, não bloqueia funil |
| Foco no skip-link | Should | A11y de teclado |

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Preloader.tsx` | `Preloader` | 🟢 |
| `src/App.tsx` | callbacks `revealHero` / `completeIntro` | 🟢 |
| `src/motion/gsap.ts` | `natureEase` | 🟢 |
| `src/components/nature/NatureLogo.tsx` | logo light | 🟢 |
