# language: pt
# spec-id: PT-001
# rastreabilidade:
#   process_flows: captura-lead / modal-lead
#   target_architecture: features/lead + apps/api + Neon
#   paradigma_alvo: hibrido islands + API síncrona
#   deviations: DEV-005, DEV-009
#   contrato_estavel: POST body { nome, email, telefone }; resposta { id }
#     (sem token / lead_token; pagina_origem só no servidor via PAGINA_ORIGEM)

Funcionalidade: Captura de lead via POST
  Como visitante da Página de Vendas
  Quero enviar nome, e-mail e telefone no modal
  Para que a equipe comercial receba o lead no Neon

  @paridade @critico
  Cenário: Envio válido cria lead e mostra sucesso
    Dado que o modal de lead está aberto
    E que a API POST /api/leads está disponível
    Quando eu preencho Nome, E-mail e Telefone BR com 11 dígitos
    E envio o formulário com o botão "Enviar contato"
    Então o cliente envia JSON só com nome, email e telefone
    E a API responde 201 com JSON contendo id (sem token)
    E o servidor grava pagina_origem da Página de Vendas
    E a UI exibe "Recebemos seu contato"

  @paridade @critico
  Cenário: Telefone inválido não chama a API
    Dado que o modal de lead está aberto
    Quando eu informo um telefone com menos de 11 dígitos
    E tento enviar
    Então vejo mensagem de erro de validação
    E nenhum POST /api/leads é disparado

  @paridade @critico
  Cenário: Prefixo internacional diferente de +55 é rejeitado no formulário v1
    Dado que o modal de lead está aberto
    Quando eu tento informar telefone fora do formato BR (+55 fixo)
    Então o formulário não aceita o envio estruturado
    # DEV-009 opção A — revisável se campanha internacional surgir
