# Casca da Aplicação, Tarefas de Implementação

> Unit de módulo · Writer · 2026-09-10  
> Sequência executável para reimplementar a casca a partir do legado.

## Pré-requisitos

- [ ] Stack React 19 + Vite + TypeScript disponível
- [ ] `LeadModalProvider` / contexto de lead disponível (unit captura-lead) ou stub equivalente
- [ ] Tokens/CSS Nature (`bg-nature-background`, etc.) e `NatureLogo` disponíveis
- [ ] GSAP + `usePageMotion` disponíveis (unit animacao) ou no-op temporário
- [ ] Sem schema de banco — N/A para esta unit 🟢

## Tarefas

- [ ] T-01, Criar entry `main.tsx` montando App em `#root` e registrando plugins GSAP necessários
  - Origem no legado: `src/main.tsx`
  - Critério de pronto: app sobe sem erro; App renderiza
  - Confiança: 🟢

- [ ] T-02, Implementar `App` com estado `ready` / `introVisible` e regras de bootstrap (reduced-motion **ou** hash → sem intro)
  - Origem no legado: `src/App.tsx:18-30`
  - Critério de pronto: cenários Gherkin de bootstrap em `requirements.md` passam manualmente
  - Confiança: 🟢

- [ ] T-03, Envolver a árvore com `LeadModalProvider` e montar `LeadModal` no final do wrapper
  - Origem no legado: `src/App.tsx:33-57`
  - Critério de pronto: `openLeadModal` acessível a partir de filhos
  - Confiança: 🟢

- [ ] T-04, Compor `main#conteudo` na ordem: Hero, LifeMoment, Pillars, Location, FloorPlans, Amenities, Architecture, Trust, LeadForm
  - Origem no legado: `src/App.tsx:43-52`
  - Critério de pronto: ordem do DOM idêntica à do legado
  - Confiança: 🟢

- [ ] T-05, Aplicar `inert={introVisible}` no wrapper da página e skip-link para `#conteudo`
  - Origem no legado: `src/App.tsx:35-42`
  - Critério de pronto: durante intro a página não recebe interação; skip-link funciona após finish
  - Confiança: 🟢

- [ ] T-06, Condicionar `WhatsAppFab` a `!introVisible` e chamar `usePageMotion(pageRef, ready)`
  - Origem no legado: `src/App.tsx:31`, `55`
  - Critério de pronto: FAB ausente na intro; motion só com ready
  - Confiança: 🟢

- [ ] T-07, Integrar Preloader com callbacks `onReveal` → setReady e `onComplete` → setReady + setIntroVisible(false)
  - Origem no legado: `src/App.tsx:26-34`, `src/components/nature/Preloader.tsx`
  - Critério de pronto: reveal libera Hero; complete remove overlay
  - Confiança: 🟢
  - Nota: detalhamento fino na unit `casca-aplicacao/preloader/`

- [ ] T-08, Garantir Header sticky (via Hero) com histerese 80/40, menu mobile Escape/click-outside e CTA → modal
  - Origem no legado: `src/components/nature/Header.tsx`
  - Critério de pronto: sólido sem flicker; Escape fecha menu; CTA abre modal
  - Confiança: 🟢
  - Nota: detalhamento na unit `casca-aplicacao/header/`

- [ ] T-09, Implementar Footer com nav âncoras, contatos `siteData` e WhatsApp `wa.me`
  - Origem no legado: `src/components/nature/Footer.tsx`
  - Critério de pronto: links e contatos visíveis; wa.me abre com mensagem
  - Confiança: 🟢
  - Nota: detalhamento na unit `casca-aplicacao/rodape/`

- [ ] T-10, Reutilizar `NatureLogo` no Preloader, Header e Footer
  - Origem no legado: `src/components/nature/NatureLogo.tsx`
  - Critério de pronto: marca consistente nos três pontos
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Happy path: load sem hash/reduced-motion → intro → página interativa + FAB
- [ ] TT-02, Reduced-motion: sem Preloader, ready imediato
- [ ] TT-03, Hash na URL: sem Preloader (deep-link)
- [ ] TT-04, Escape / Pular durante intro: saída sem travar a página
- [ ] TT-05, Menu mobile: Escape devolve foco ao toggle; ≥761px fecha menu

## Tarefas de Migração de Dados

- N/A — sem persistência nesta unit. 🟢

## Ordem Sugerida

1. T-01 → T-02 (bootstrap mínimo)
2. T-03 (provider) antes de Header/FAB/CTAs
3. T-04 composição (stubs das seções ok)
4. T-05, T-06, T-07 (gate de intro)
5. T-08, T-09, T-10 (chrome de página)
6. TT-* após T-07 estável

Bloqueios: T-07 depende de Preloader; T-08 depende de LeadModalContext; T-09 depende de `siteData`.

## Lacunas Pendentes (🔴)

- URL real de política de privacidade (`privacyHref`)
- Destino/hosting definitivo (impacto SEO/noindex — ADR-007) fora do escopo de código da casca, mas afeta aceite de publicação
