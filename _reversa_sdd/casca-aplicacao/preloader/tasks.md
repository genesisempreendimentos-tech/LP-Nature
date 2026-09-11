# Preloader (Intro), Tarefas de Implementação

> Caso de uso · `casca-aplicacao/preloader` · Writer · 2026-09-10

## Pré-requisitos

- [ ] GSAP + `@gsap/react` + `natureEase` disponíveis
- [ ] `NatureLogo` com variante `light`
- [ ] `App` passa `onReveal`, `onComplete` e `pageRef` com skip-link e imagem `.hero-background-image`
- [ ] Estilos `.nature-preloader` / `.preloader-*` (ou equivalentes) no CSS do projeto

## Tarefas

- [ ] T-01, Criar componente `Preloader` com props `onReveal`, `onComplete`, `pageRef` e markup de marca/caption/status/botão Pular
  - Origem no legado: `src/components/nature/Preloader.tsx:6-101`
  - Critério de pronto: overlay renderiza e botão chama exit
  - Confiança: 🟢

- [ ] T-02, Lock de scroll: salvar e setar `document.body.style.overflow = "hidden"`; restaurar no cleanup
  - Origem no legado: `Preloader.tsx:20-21`, `80`
  - Critério de pronto: página não rola durante intro; overflow volta após unmount
  - Confiança: 🟢

- [ ] T-03, Implementar `finish` com foco: se overlay contém `activeElement`, limpar inert da página e focar `.skip-link`; sempre chamar `onComplete`
  - Origem no legado: `Preloader.tsx:23-29`
  - Critério de pronto: teclado não fica preso no overlay desmontado
  - Confiança: 🟢

- [ ] T-04, Implementar tween de saída pausado (`yPercent: -100`, 0.65s, `natureEase`) com `onComplete: finish`
  - Origem no legado: `Preloader.tsx:31-37`
  - Critério de pronto: animação de slide para cima ao sair com motion
  - Confiança: 🟢

- [ ] T-05, Implementar `exit` idempotente: reduced-motion → `finish`; senão `onReveal` + play do tween
  - Origem no legado: `Preloader.tsx:38-47`
  - Critério de pronto: reveal antecipa motion do Hero; complete só após saída
  - Confiança: 🟢

- [ ] T-06, Animação de entrada da marca/caption + wait de `image.decode`, `document.fonts.ready` e entry → `exit`
  - Origem no legado: `Preloader.tsx:54-72`
  - Critério de pronto: exit automático quando assets ok; decode rejeitado não trava
  - Confiança: 🟢

- [ ] T-07, Timeouts: `exit` em 1800 ms; `finish` em 2800 ms; limpar no dispose
  - Origem no legado: `Preloader.tsx:72-77`
  - Critério de pronto: assets lentos não prendem o visitante (ADR-006)
  - Confiança: 🟢

- [ ] T-08, Listeners Escape e change de `prefers-reduced-motion` → `exit`; remover no cleanup
  - Origem no legado: `Preloader.tsx:49-53`, `78-79`
  - Critério de pronto: Escape e toggle de reduced-motion encerram intro
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Happy path: assets rápidos → reveal → slide → complete
- [ ] TT-02, Assets lentos: exit forçado aos 1,8s
- [ ] TT-03, Safety: complete aos 2,8s mesmo se tween falhar
- [ ] TT-04, Escape e botão Pular
- [ ] TT-05, Reduced-motion: finish sem slide
- [ ] TT-06, Foco no overlay ao finish → skip-link recebe foco

## Tarefas de Migração de Dados

- N/A 🟢

## Ordem Sugerida

1. T-01 markup → T-02 overflow → T-03/T-04/T-05 máquina de saída
2. T-06 wait de assets → T-07 timeouts → T-08 listeners
3. TT-* com App real ou harness de callbacks

## Lacunas Pendentes (🔴)

- Nenhuma lacuna bloqueante específica do Preloader além de copy/timing de marca se o produto mudar de campanha (🟡 no design).
