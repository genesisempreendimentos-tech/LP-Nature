# Header (Navegação Sticky), Tarefas de Implementação

> Caso de uso · `casca-aplicacao/header` · Writer · 2026-09-10

## Pré-requisitos

- [ ] `LeadModalProvider` / `useLeadModal` disponível
- [ ] `NatureLogo` e estilos `.site-header` / `.header-pill` / `.header-nav`
- [ ] GSAP + `natureEase` (entrada opcional)
- [ ] Ícones lucide (Menu, X, ArrowUpRight) ou equivalentes

## Tarefas

- [ ] T-01, Criar `Header({ ready })` com estrutura: brand-link `#inicio`, toggle mobile, nav de âncoras, CTA button
  - Origem no legado: `src/components/nature/Header.tsx:56-80`
  - Critério de pronto: markup acessível (`aria-expanded`, `aria-controls`, labels)
  - Confiança: 🟢

- [ ] T-02, Estado `isSolid` com histerese: solidifica >80; só volta transparente se ≤40; atualizar via rAF no scroll
  - Origem no legado: `Header.tsx:10`, `15-24`
  - Critério de pronto: sem flicker na faixa 40–80
  - Confiança: 🟢

- [ ] T-03, `data-scrolled={isSolid || menuOpen}` no pill
  - Origem no legado: `Header.tsx:57`
  - Critério de pronto: menu aberto força visual sólido
  - Confiança: 🟢

- [ ] T-04, Menu: toggle; Escape fecha + foco no toggle; pointerdown fora fecha; ≥761px fecha
  - Origem no legado: `Header.tsx:25-37`
  - Critério de pronto: cenários Gherkin de menu em requirements
  - Confiança: 🟢

- [ ] T-05, Links de nav e brand fecham `menuOpen` no click
  - Origem no legado: `Header.tsx:58`, `62-65`
  - Critério de pronto: mobile não deixa menu aberto após navegar
  - Confiança: 🟢

- [ ] T-06, CTA: fechar menu + `openLeadModal()` (não usar href `#contato`)
  - Origem no legado: `Header.tsx:67-73`
  - Critério de pronto: modal abre (ADR-003)
  - Confiança: 🟢

- [ ] T-07, Animação de entrada `.header-pill` só se `ready` e reduced-motion no-preference; revert no cleanup
  - Origem no legado: `Header.tsx:47-54`
  - Critério de pronto: sem animação se !ready ou reduced-motion
  - Confiança: 🟢

- [ ] T-08, Montar Header dentro do Hero passando `ready` do App
  - Origem no legado: `src/components/nature/Hero.tsx` (composição)
  - Critério de pronto: header aparece na primeira dobra com prop correta
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Histerese 80/40
- [ ] TT-02, Escape fecha menu e restaura foco
- [ ] TT-03, Click fora fecha menu
- [ ] TT-04, Resize ≥761px fecha menu
- [ ] TT-05, CTA abre modal
- [ ] TT-06, Sem animação com reduced-motion / !ready

## Tarefas de Migração de Dados

- N/A 🟢

## Ordem Sugerida

1. T-01 → T-02/T-03 (visual scroll) → T-04/T-05 (menu)
2. T-06 (lead) → T-07 (motion) → T-08 (integração Hero)
3. TT-*

## Lacunas Pendentes (🔴)

- Confirmar com marketing se a ausência de link “Contato” na nav (só CTA modal) é intencional.
