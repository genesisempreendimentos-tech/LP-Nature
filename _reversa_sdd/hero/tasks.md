# Hero, Tarefas de Implementação

> `hero` · Writer · 2026-09-10

## Pré-requisitos
- [ ] LeadModalContext
- [ ] Header
- [ ] GSAP SplitText
- [ ] imagem CDN

## Tarefas
- [ ] T-01, Montar layout Hero + Header(ready)
  - Origem no legado: `Hero.tsx`
  - Critério de pronto: dobra completa
  - Confiança: 🟢
- [ ] T-02, Wire CTA → openLeadModal e âncoras secundárias
  - Origem no legado: `Hero.tsx`
  - Critério de pronto: modal abre
  - Confiança: 🟢
- [ ] T-03, Implementar motion SplitText/Ken Burns/facts/parallax com guards
  - Origem no legado: `Hero.tsx useGSAP`
  - Critério de pronto: respeita ready/reduced-motion
  - Confiança: 🟢

## Tarefas de Teste
- [ ] TT-01, CTA abre modal
- [ ] TT-02, Sem motion se !ready
- [ ] TT-03, Facts once on scroll

## Tarefas de Migração de Dados
- N/A 🟢

## Ordem Sugerida
1. Layout → CTA → motion

## Lacunas Pendentes (🔴)
- Validar se toda copy vem de siteData
