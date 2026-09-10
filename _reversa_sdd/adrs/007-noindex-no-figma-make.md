# ADR-007 — `robots: noindex` na configuração Figma Make

- **Status:** aceito na config 🟢 (motivo de negócio 🔴)
- **Arquivo:** `.figma/make/site.json`

## Contexto

A landing replica/evolui `residencialnature.com.br`. Publicar outra URL indexável criaria conteúdo duplicado e risco de o preview de desenvolvimento competir com o domínio oficial.

## Decisão

`"robots": { "index": false }`. Título e Open Graph mesmo assim descrevem o Nature Residencial.

## Por quê (inferido)

Ambiente de Make/preview, não o site canônico de produção. 🟡 Motivo exato (staging vs go-live) **não está documentado** — validar antes de um deploy público. 🔴
