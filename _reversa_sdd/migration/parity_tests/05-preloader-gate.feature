# language: pt
# spec-id: PT-005
# rastreabilidade:
#   process_flows: casca-aplicacao / preloader
#   target_architecture: features/shell
#   paradigma_alvo: hibrido
#   deviations: DEV-004

Funcionalidade: Gate de introdução
  Como visitante
  Quero ver a intro uma vez (ou pulá-la)
  Para então interagir com a página

  @paridade
  Cenário: Preloader completa e libera a página
    Dado que prefiro motion normal e não há hash na URL
    Quando o preloader termina
    Então a página deixa de estar inert
    E o FAB pode aparecer após sair do hero

  @paridade
  Cenário: Reduced motion ou hash pula preloader
    Dado prefers-reduced-motion ou URL com hash
    Quando a página carrega
    Então o preloader não bloqueia a interação
