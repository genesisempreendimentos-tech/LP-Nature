# language: pt
# spec-id: PT-004
# status: DEPRECATED
# deprecatedAt: 2026-09-11
# rastreabilidade:
#   process_flows: secoes-marketing / plantas
#   target_architecture: floor-plans (SEM interesse_planta no POST)
#   paradigma_alvo: hibrido
#   supersedido_por: PT-001 + PT-002 (CTA de planta = cadastro normal)
#
# DEPRECATED — NÃO EXECUTAR NO PARITY SUITE
# Motivo: o comportamento testado (evento nature:plan + campo interesse_planta
# no POST /api/leads) foi removido de propósito nesta migração.
# Decisões:
#   - Curator / Reviewer: interesse_planta chegou a constar no contrato inicial,
#     mas a execução estável do BFF + Prioridade #0 excluiu lead_token e
#     interesse_planta (coluna/API fora do escopo).
#   - Codificação: "todas as plantas levam ao cadastro normal, sem essa
#     distinção"; listener nature:plan, payload e UI "Interesse: X m²"
#     revertidos (ambiguity_log — emenda interessePlanta / PT-004).
# A feature permanece no repositório só como registro histórico.

@deprecated @nao-executar
Funcionalidade: Interesse por planta no POST (OBSOLETA)
  Como visitante interessado em uma metragem
  Quero que a opção escolhida vá no lead
  Para a equipe saber qual planta consultar

  @deprecated
  Cenário: CTA de planta dispara nature:plan e abre modal
    Dado que estou na seção de plantas com uma metragem ativa
    Quando eu clico em "Quero conhecer esta opção"
    Então um evento nature:plan com a área selecionada é observado
    E o modal de lead abre
    Quando eu envio o formulário válido
    Então o POST /api/leads inclui interesse_planta correspondente à área
