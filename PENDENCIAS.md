# Pendências Nature — Página de Vendas

Registro enxuto do que ainda depende de negócio/jurídico/ops.  
Extraído de `_reversa_sdd/` antes da remoção dos artefatos do Reversa (2026-09-11).

---

## 1. Política de privacidade + consentimento LGPD

Bloqueia o lançamento do **cadastro estendido** (fluxo de 8 passos / `PATCH`).  
O link do rodapé já aponta para a política da Gênesis; falta o **checkbox de consentimento** e o ok jurídico para a fase 2.

**Depende de:** jurídico / negócio.

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
