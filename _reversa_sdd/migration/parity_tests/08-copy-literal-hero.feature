# language: pt
# spec-id: PT-008
# rastreabilidade:
#   process_flows: hero
#   target_screens: hero (literal)
#   paradigma_alvo: hibrido

Funcionalidade: Copy do hero preservada
  Como visitante
  Quero ver a mensagem principal do Nature
  Para reconhecer o mesmo produto

  @paridade @literal
  Cenário: Textos-chave do hero
    Dado que a página Astro renderizou o hero
    Então vejo o eyebrow "ALTO, TERESÓPOLIS · RJ"
    E o título contém "O essencial" e "novo padrão"
    E o CTA "Encontre o seu espaço" abre o modal de lead
