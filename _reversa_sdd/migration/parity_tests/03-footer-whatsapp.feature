# language: pt
# spec-id: PT-003
# rastreabilidade:
#   process_flows: casca-aplicacao / rodape
#   target_architecture: features/shell/footer
#   paradigma_alvo: hibrido
#   deviations: DEV-009

Funcionalidade: WhatsApp apenas no rodapé
  Como visitante
  Quero contactar via WhatsApp pelo rodapé
  Para falar com a equipe sem o formulário

  @paridade @critico
  Cenário: Link wa.me no footer
    Dado que estou no rodapé
    Quando eu aciono o contato WhatsApp
    Então abro URL wa.me com o número de siteData.contact.whatsapp
    E a mensagem de prefill usa whatsappMessage quando configurada
    # Sem restrição de país no canal wa.me (DEV-009)
