# language: pt
# spec-id: PT-007
# rastreabilidade:
#   process_flows: mapa-localizacao
#   target_architecture: features/location island
#   paradigma_alvo: hibrido
#   deviations: DEV-007

Funcionalidade: Mapa Leaflet em island
  Como visitante
  Quero ver a localização e POIs
  Para entender o entorno do empreendimento

  @paridade @modernizado
  Cenário: Lazy load e gate de interação
    Dado que a seção de localização entrou no viewport
    Quando o mapa carrega
    Então vejo o estado loading e depois o mapa
    E o gate "Clique para navegar" habilita pan/zoom ao clicar

  @paridade @modernizado
  Cenário: POIs vêm de siteData unificado
    Dado siteData com POIs unificados
    Quando o mapa renderiza marcadores
    Então os pontos de interesse refletem a fonte única (não array hardcoded divergente)
