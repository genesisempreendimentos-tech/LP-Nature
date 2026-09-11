# Preloader (Intro), Design Técnico

> Caso de uso · `casca-aplicacao/preloader` · Writer · 2026-09-10  
> Fonte: `src/components/nature/Preloader.tsx`

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `Preloader` | `(props: PreloaderProps)` | `JSX.Element` | Overlay fullscreen |
| `PreloaderProps.onReveal` | `() => void` | void | App seta `ready=true` |
| `PreloaderProps.onComplete` | `() => void` | void | App seta `ready=true` + `introVisible=false` |
| `PreloaderProps.pageRef` | `RefObject<HTMLDivElement \| null>` | — | Wrapper da página (inert / skip-link / img hero) |

Sem HTTP. 🟢

## Fluxo Principal

1. Mount: `useGSAP` no `overlayRef`; salva `body.overflow` e seta `hidden`. 🟢
2. Define `finish`: se foco no overlay → `pageRef.inert=false` + focus `.skip-link`; chama `onComplete()`. 🟢
3. Cria tween pausado de saída: `yPercent: -100`, 0.65s, `natureEase`, `onComplete: finish`. 🟢
4. Define `exit`: se `disposed`/`exiting` return; se reduced-motion → `finish()`; senão `onReveal()` + play do tween. 🟢
5. Anima entrada de `.preloader-brand` / `.preloader-caption` (opacity/y, stagger 0.06). 🟢
6. Aguarda `Promise.all([image.decode(), document.fonts.ready, entry])` → `exit`. 🟢
7. `setTimeout(exit, 1800)` e `setTimeout(finish, 2800)`. 🟢
8. Listeners: Escape → `exit`; change de reduced-motion → `exit`. 🟢
9. Cleanup: `disposed=true`, clear timeouts, remove listeners, restaura overflow. 🟢

## Fluxos Alternativos

- **Botão Pular:** `onClick` → `finishRef.current()` (= `exit`). 🟢
- **Reduced-motion no exit:** pula tween; `finish` imediato. 🟢
- **Safety 2800 ms:** `finish` mesmo se `exit`/tween falhar. 🟢
- **Imagem hero ausente:** `imageReady` resolve imediatamente (`Promise.resolve()`). 🟢
- **`decode` rejeita:** `.catch(() => {})` — não bloqueia. 🟢

## Dependências

- `NatureLogo` (`light`) — marca no centro.
- `gsap` / `@gsap/react` / `natureEase` — entrada e saída.
- `App` — callbacks e `pageRef` com `.hero-background-image` e `.skip-link`.

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Dois estágios: reveal (motion) vs complete (desmonta) | `exit` chama `onReveal` antes do tween; `finish` → `onComplete` | 🟢 |
| Bound temporal obrigatório (ADR-006) | timeouts 1800 / 2800 | 🟢 |
| Escape + Pular + media change como saídas explícitas | keydown / button / reduce listener | 🟢 |
| Restauração de overflow no cleanup do GSAP | return do `useGSAP` | 🟢 |

## Estado Interno

| Campo | Escopo | Papel |
|-------|--------|-------|
| `overlayRef` | ref | root do overlay / tween |
| `finishRef` | ref | aponta para `exit` (botão Pular) |
| `disposed` / `exiting` | closure | idempotência |
| `document.body.style.overflow` | DOM | lock de scroll |

Sem storage. 🟢

## Observabilidade

- Nenhum log/métrica. 🟡
- Status visual via `role="status"` (“Preparando seu próximo endereço”). 🟢

## Riscos e Lacunas

- 🟡 Depende do seletor `.hero-background-image` existir no `pageRef` — se Hero mudar classe, o wait de imagem degrada para no-op + timeout.
- 🟡 Caption/status hardcoded em PT no componente (não vêm de `siteData`).
- 🔴 Critérios de brand exact (timing/copy) para outras campanhas — só o Nature atual está no código.
