# Reveals de Página, Design Técnico

> Caso de uso · `animacao/reveals-pagina` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

Ver tabela de registry em `animacao/design.md`.

## Fluxo Principal

1. useGSAP callback checa ready. 🟢
2. mm.add no-preference cria splits + timelines. 🟢
3. cleanup: split.revert + mm.revert. 🟢

## Fluxos Alternativos

- **DOM sem seletor:** Tween não criado — silencioso. 🟡

## Dependências

- GSAP ecosystem
- classes CSS das seções

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Hook global vs motion colocada | `usePageMotion` | 🟢 |

## Estado Interno

Instâncias GSAP efêmeras. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🟡 Acoplamento forte a classnames do CSS legado.
