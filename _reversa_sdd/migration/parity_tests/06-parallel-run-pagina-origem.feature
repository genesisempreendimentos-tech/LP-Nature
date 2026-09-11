# language: pt
# spec-id: PT-006
# rastreabilidade:
#   process_flows: captura-lead / Neon
#   target_architecture: AD-T03 Parallel Run
#   paradigma_alvo: hibrido
#   strategy: B

Funcionalidade: Parallel run diferencia origem do lead
  Como time de migração
  Quero distinguir leads do Astro e do legado
  Para comparar taxa de captura sem misturar canais

  @paridade @critico
  Cenário: Lead da Página de Vendas Astro grava pagina_origem correta
    Dado o BFF apontando para a tabela Neon compartilhada
    Quando um lead é criado pela URL Astro
    Então o registro persiste pagina_origem da Página de Vendas
    E não cria tabela paralela de leads

  @paridade
  Cenário: Instrumentação do legado usa pagina_origem distinta
    Dado o legado instrumentado para POST (cutover_plan)
    Quando um lead é criado pela URL React
    Então pagina_origem identifica o legado
    E ambos convivem na mesma tabela
