# language: pt
# spec-id: PT-002
# rastreabilidade:
#   process_flows: captura-lead / fab-bubble / Reviewer P4
#   target_architecture: features/lead nanostores
#   paradigma_alvo: hibrido
#   deviations: DEV-004

Funcionalidade: Conversão primária abre modal, não WhatsApp
  Como visitante
  Quero acionar CTAs de conversão
  Para abrir o formulário estruturado

  @paridade @critico
  Cenário: FAB abre o modal
    Dado que o FAB está visível após sair do hero
    Quando eu clico no botão "Falar com um consultor"
    Então o lead modal abre
    E nenhuma navegação para wa.me ocorre

  @paridade @critico
  Cenário: SectionCta e Header CTA abrem o mesmo modal
    Dado que a store de lead está fechada
    Quando eu aciono o CTA do header "Conheça seu novo endereço"
    Então o modal abre via nanostores compartilhada
    Quando eu fecho e aciono um SectionCta de seção
    Então o mesmo modal abre novamente
