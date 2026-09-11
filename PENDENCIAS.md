# Pendências Nature — Página de Vendas

Registro enxuto do que ainda depende de negócio/jurídico/ops.  
Extraído de `_reversa_sdd/` antes da remoção dos artefatos do Reversa (2026-09-11).

---

## 1. Política de privacidade + consentimento LGPD

Bloqueia o lançamento do **cadastro estendido** (fluxo de 8 passos / `PATCH`).

O link do rodapé (`https://genesisempreendimentos.com.br/politicas`) é o
MESMO usado no rodapé institucional oficial da Gênesis (confirmado no
bundle do site deles) — não é um link nosso errado. Porém, testado ao
vivo (curl + navegador real): a rota retorna 200 mas renderiza a HOME
do site, não o conteúdo da política. `/politica-de-privacidade/`
(alternativa também real do domínio) falha do mesmo jeito. Como
controle: `/politica-cookies` funciona normalmente — ou seja, o site
da Gênesis não está todo quebrado, só a rota de privacidade.

Falta, além do checkbox de consentimento e do ok jurídico:
**avisar a Gênesis que a própria política de privacidade dela está
soft-broken no site institucional** — isso não é algo que o Nature
resolve, é um problema no domínio deles.

**Depende de:** jurídico / negócio (checkbox + ok) **e** Gênesis / TI
deles (corrigir a rota quebrada no próprio site institucional).

---

## 2. Metragem oficial divergente

- Documento de campanha original: **65,88 a 292,49 m²**
- Código / site atual: **56,60 a 292,49 m²**

Na migração ficou decidido **manter os números do site**. Confirmar com a Gênesis qual é o valor oficial.

**Depende de:** Gênesis / conteúdo.

---

## 3. Objetivo SEO / ads da migração para Astro

Durante a migração, SEO/ads foi tratado como **premissa provisória**, nunca confirmada com o time. Validar se esse era (e ainda é) o motivo real da troca de stack.

**Depende de:** time / quem decide produto.

---

## 4. Formato do telefone (E.164 vs livre)

A API grava o telefone **como veio**, sem normalizar. Falta decisão de produto: padronizar E.164 (`+55…`) ou manter formato livre / só dígitos nacionais.

**Depende de:** produto / admin.

---

## 5. Coluna `codigo` em `site_nature` (Neon)

Existe na tabela compartilhada; a API nova **não usa**. Função desconhecida (ex. códigos tipo A1268). Não consumir até alguém confirmar o que é.

**Depende de:** ops / quem conhece o schema Neon legado.
