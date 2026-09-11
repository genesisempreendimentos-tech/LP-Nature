-- Nature — Página de Vendas
-- Migration: pagina_origem SEM DEFAULT
--
-- Motivo: a tabela é compartilhada (ex. Nature Petrópolis Residences e outras
-- origens digitais). Assumir DEFAULT 'Site Institucional' rotulava errado
-- qualquer INSERT que omitisse o campo. Sem DEFAULT → NULL = origem desconhecida.
--
-- O POST /api/leads deste site continua enviando pagina_origem = 'Página de Vendas'
-- explicitamente (sem depender de default).

-- Se a coluna ainda não existe:
ALTER TABLE site_nature
  ADD COLUMN IF NOT EXISTS pagina_origem text;

-- Se já foi criada com DEFAULT 'Site Institucional' (ou outro), remover:
ALTER TABLE site_nature
  ALTER COLUMN pagina_origem DROP DEFAULT;
