# Perguntas para Validação — Nature - Pagina de Vendas

> Gerado pelo Revisor em 2026-09-10
> ✅ Todas respondidas por Bruno em 2026-09-10

---

## Pergunta 1

**Contexto:** Destino do lead / API
**Spec afetada:** captura-lead/modal-lead, openapi/lead.yaml
**Pergunta:** Destino de produção do lead?
✅ Respondida

**Resposta:** Contrato desenhado (não inventado), ainda não implementado no front (próximo passo Astro).

POST /api/leads — body { nome, email, telefone } (telefone só 11 dígitos) → gera lead_token opaco (≠ id) → INSERT Neon com pagina_origem='Página de Vendas' **explícito** (coluna **sem DEFAULT**; omitir o campo grava NULL, não um rótulo inventado) → retorna { id, token }.

PATCH /api/leads/:id — body { token, field, value }; valida token; allowlist: relationship_status, children_status, profession, monthly_investment (não monthly_income), sexo, current_city, birth_date, profile_type.

Auth visitante: nenhuma; token por lead impede edição cruzada por id.

Downstream CVCRM: fora de escopo — só gravar certo na tabela compartilhada.

---

## Pergunta 2

**Contexto:** Privacidade / LGPD
**Spec afetada:** rodape, sitedata, modal
**Pergunta:** URL política + checkbox?
✅ Respondida

**Resposta:** Gap real: não existe URL de política ainda. Checkbox de consentimento é obrigatório antes de produção — formulário estendido coleta renda, nascimento, filhos, gênero (dado sensível LGPD). Bloqueia produção.

---

## Pergunta 3

**Contexto:** nature:plan
**Spec afetada:** plantas, modal-lead
**Pergunta:** Metragem no payload?
✅ Respondida

**Resposta:** Sim — campo interesse_planta (metragem clicada), capturado ao abrir modal a partir de CTA de planta, no POST /api/leads inicial (não no cadastro estendido).

---

## Pergunta 4

**Contexto:** Canais conversão
**Spec afetada:** rodape, fab-bubble
**Pergunta:** Unificar ou manter dual?
✅ Respondida

**Resposta:** Não unificar rodapé com modal. Manter wa.me no rodapé como único canal WhatsApp real e intencional (não resquício). FAB continua abrindo modal.

---

## Pergunta 5

**Contexto:** Galeria Architecture
**Spec afetada:** arquitetura
**Pergunta:** Unsplash vs oficial?
✅ Respondida

**Resposta:** Manter Unsplash por enquanto — troca depende de fotografia oficial da Gênesis. Pendência rastreada.

---

## Pergunta 6

**Contexto:** Grafia endereço
**Spec afetada:** sitedata, mapa
**Pergunta:** Hildegardo ou Hidelgardo?
✅ Respondida

**Resposta:** Hidelgardo é a forma correta. Trocar toda ocorrência de Hildegardo → Hidelgardo.

---

## Pergunta 7

**Contexto:** Fonte de verdade POI/lazer
**Spec afetada:** proximidades, lazer
**Pergunta:** Qual fonte?
✅ Respondida

**Resposta:** POIs: siteData como fonte de verdade; points[] do mapa deve ler de lá. Lazer: consolidar em siteData.amenities (sugestão nova do stakeholder, não decisão prévia documentada).

---

## Pergunta 8

**Contexto:** Prefill WhatsApp rodapé
**Spec afetada:** rodape
**Pergunta:** Usar whatsappMessage?
✅ Respondida

**Resposta:** Sim — usar siteData.contact.whatsappMessage ("Olá, tenho interesse no Nature Residencial") no wa.me do rodapé.
