---
schemaVersion: 1
generatedAt: 2026-09-10T18:13:33.604Z
reversa:
  version: "1.3.3"
kind: cutover_plan
producedBy: strategist
hash: "sha256:eb4717ae9f672a91c57592efe3d681ccfd7de17641803a554cee15b06fb0f7eb"
chosenStrategy: B
---

# Cutover Plan

> Estratégia **escolhida: B — Parallel Run de URLs** (Bruno, 2026-09-10).
> Substitui a base recomendada A.

## Ideia
Manter legado e Astro+BFF ativos em URLs distintas; split de tráfego (ads/shadow); comparar taxa de captura e (se SEO confirmado) LCP/TTFB; só então desligar legado.

## Pré-requisitos
- [ ] Astro+BFF em URL nova (subdomínio ou path)
- [ ] Legado **também** grava no Neon com `pagina_origem` distinta (ex. "Legado React" vs "Página de Vendas") — senão comparação é injusta (legado hoje só console.log)
- [ ] v1 Astro: POST-only; sem PATCH sensível
- [ ] Dashboard: leads/dia por pagina_origem + erros API
- [ ] Soft split documentado (ex. 10% ads → Astro)
- [ ] Rollback = 0% no Astro
- [ ] Confirmação SEO (HUMANA-005) ou aceite explícito de seguir sem ela

## Janela
Indefinida. Parallel run sugerido: 7–14 dias com tráfego significativo, ou N leads úteis (N a definir).

## Passos
| # | Passo | Owner | Duração |
|---|-------|-------|---------|
| 1 | Instrumentar legado para POST Neon (mínimo) OU aceitar baseline só Astro | Eng. | 1–3 d |
| 2 | Deploy Astro+BFF URL B | Eng. | 0.5–1 d |
| 3 | E2E funil URL B | Eng.+Bruno | 0.5 d |
| 4 | Split ads 5–20% → URL B | Bruno/mídia | 1 h |
| 5 | Monitorar 7–14 d | Eng.+Bruno | 1–2 sem |
| 6 | Go/No-Go comparação captura (+ LCP se SEO ok) | Bruno | 1 h |
| 7 | Ramp 50% → 100% | Bruno/mídia | 1–3 d |
| 8 | Desligar legado | Eng. | 0.5 d |
| 9 | Fase 2 PATCH pós-política | depois | — |

## Rollback
Reduzir split a 0% imediatamente; legado permanece fonte principal.

## Critérios Go / No-Go
**Go para ramp:** taxa de lead Astro ≥ legado (mesmo período/campanha) dentro de margem acordada; erros API aceitáveis; sem incidente LGPD.
**No-Go:** queda material de captura no Astro; instabilidade BFF/Neon.

## Diferença vs A
B atrasa cutover 100% mas reduz risco de regressão de conversão; custo de manter dois fronts + instrumentar legado.
