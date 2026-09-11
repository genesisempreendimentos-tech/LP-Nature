---
schemaVersion: 1
generatedAt: 2026-09-10T18:10:50.870Z
reversa:
  version: "1.3.3"
kind: migration_strategy
producedBy: strategist
hash: "sha256:ea40f739a0368aef61aa07775f67853095ca1d8e79591e97c87f15f3c554896c"
---

# Migration Strategy

> Estratégias candidatas, trade-offs e recomendação. A escolha final é humana.

## Contexto sintetizado
- **Tamanho do legado**: landing única, 7 módulos, ~SPA React; sem banco próprio no front; lead ainda sem backend real.
- **Apetite**: `balanced` (paradigm opção 3).
- **Gap de paradigma**: médio–alto (SPA React → Astro islands + BFF).
- **Restrições**: API contrato preservado; v1 = POST-only (PATCH fase 2); BFF no mesmo deploy (HUMANA-003=c); LGPD bloqueia PATCH; prazo/orçamento indefinidos.
- **Métrica protegida**: zero regressão na taxa de captura de lead.
- **Premissa SEO/ads**: **provisória** até confirmação do time (HUMANA-005=a). Strategist **não** trata SEO como fato.

## Estratégias avaliadas

### A — Soft-launch Big Bang (VPS nova + BFF Astro/Node) — **RECOMENDADA**
- **Descrição**: Implementar Astro + BFF `/api/leads` no mesmo deploy na VPS; cutover de tráfego (DNS/campanhas) quando go/no-go ok; rollback = apontar ads/DNS de volta ao legado.
- **Adequação ao apetite balanced**: alta — entrega transformacional do shell, incremental no tráfego.
- **Adequação ao gap**: alta — assume islands+nanostores de uma vez no alvo, sem fingir SPA.
- **Custo / risco / tempo**: custo médio; risco médio (conversão); tempo curto–médio (sistema pequeno).
- **Prós**: alinha HUMANA-003 (BFF); `pagina_origem='Página de Vendas'` já diferencia leads; v1 POST-only reduz LGPD; rollback claro.
- **Contras**: se SEO não for o motivo real, still ok; Big Bang de código sem soft traffic é perigoso — por isso soft-launch.

### B — Parallel Run de URLs (legado + Astro)
- **Descrição**: Duas URLs ativas; split de ads; comparar taxa de lead e LCP; Neon recebe ambas (origens distintas se legado ganhar tag depois).
- **Adequação**: alta para validar zero regressão de captura.
- **Custo / risco / tempo**: custo alto (manter dois fronts); risco médio; tempo médio.
- **Prós**: prova empírica de conversão antes de desligar legado.
- **Contras**: legado ainda sem API real (console.log) — paralelo de captura só é justo quando **ambos** gravam no Neon; senão compara maçãs com laranjas.

### C — Strangler por seções dentro do React
- **Descrição**: Trocar pedaços da SPA gradualmente.
- **Adequação**: baixa — objetivo é Astro content-first, não strangler interno React.
- **Contras**: atrasa ganho de LCP/SEO (se confirmado); complexidade sem benefício do brief.

## Recomendação
**Estratégia A (Soft-launch Big Bang)**, com elemento de medição inspirado em B:
1. Subir Astro+BFF na VPS (staging → prod).
2. Validar POST Neon + funil E2E.
3. Soft-launch: % de campanhas/ads (ou link shadow) antes de 100%.
4. Critério go: taxa de lead ≥ legado (quando legado também persistir) **ou**, enquanto legado só loga, baseline = formulários completados + erros API = 0 + LCP melhora se SEO confirmado.
5. PATCH/estendido só fase 2 após política URL (HUMANA-001/002).

## Premissas e sensibilidades
- Se o time **rejeitar** SEO/ads como objetivo → priorizar paridade de captura e manutenibilidade; Lighthouse vira nice-to-have.
- Se PATCH for antecipado à v1 → **obrigatório** obter política (rever HUMANA-001→a) antes do cutover público.

## Próximo passo humano
Escolher A, B ou C (ou variante). Cutover e riscos abaixo assumem **A** até decisão contrária.

## Decisão do usuário
- **Escolha**: B — Parallel Run de URLs
- **Decidido em**: 2026-09-10T18:13:33.604Z
- **Nota**: Strategist recomendava A; humano escolheu B para prova empírica de conversão antes de desligar o legado.
- **Implicação**: legado precisa persistir leads no Neon (ou baseline equivalente) para comparação justa; senão medir só o Astro vs baseline qualitativo.
