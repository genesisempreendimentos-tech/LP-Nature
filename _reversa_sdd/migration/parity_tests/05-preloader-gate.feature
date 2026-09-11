# language: pt
# spec-id: PT-005
# rastreabilidade:
#   process_flows: casca-aplicacao / app-ready
#   target_architecture: features/shell (appReady)
#   paradigma_alvo: hibrido
#   deviations: DEV-010
# status: ativo (reescrito 2026-09-11 — sem overlay de preloader)

Funcionalidade: App ready imediato
  Como visitante
  Quero interagir com a página assim que ela carrega
  Para não ficar bloqueado por uma intro

  @paridade
  Cenário: Página marca appReady no load
    Dado que a landing Astro carrega
    Quando o script inline de boot roda
    Então documentElement.dataset.appReady é "1"
    E o evento nature:app-ready é disparado
    E não existe overlay de preloader montado

  @paridade
  Cenário: Seções de marketing consomem appReady sem gate visual
    Dado que appReady já está setado
    Quando uma seção com data-marketing-reveal entra no viewport
    Então o reveal CSS/IntersectionObserver pode ocorrer
    E a página nunca esteve inert por causa de intro
