# Formulário global (Genesis Forms)

Desligado por padrão. O modal nativo de reserva continua como fallback.

## Variáveis de build (`PUBLIC_*`)

Definidas no ambiente do `astro build` (no VPS não há `.env` em `apps/web`). Ver `.env.example` nesta pasta.

| Variável | Efeito |
| --- | --- |
| `PUBLIC_FORMULARIO_GLOBAL` | Só `1` liga o widget |
| `PUBLIC_FORMS_WIDGET_BASE` | Base HTTPS (prod: `https://forms.genesisapps.com.br`) |
| `PUBLIC_FORMS_ID` | formId (`nature-lp`) |
| `PUBLIC_FORMS_REAL` | Só `1` = produção real (`preview: false`); senão prévia |

Com a chave ligada em build de produção, `astro.config.mjs` exige base `https://` sem `localhost`.

## Integração

- Boot: `iniciarFormularioGlobal()` no `index.astro` (após `load` + idle).
- Abertura: primeira linha de `openLeadModal()` tenta `abrirFormularioGlobal()`; se falhar, abre o modal nativo.
- Tracking / atribuição do widget: `getTracking()` lê cookies `nature_utm_first` / `nature_utm_last` (opção A — permanecem para leads; o pageview usa `origem_bruta` em sessionStorage à parte) e ids (`nature_sessao_id` do tracker só após aceite de cookies, ou efêmeros `nature_form_uid` / `nature_form_sid`). Sem PII.
- Pixel: Meta Pixel só carrega com consentimento `aceito`. Em `lead_created`, `trackMeta("Lead")` é no-op se o Pixel não estiver carregado; em produção real (`PUBLIC_FORMS_REAL=1`) dispara uma vez por abertura.

## Origem do lead (API)

Cadastro nativo grava `origem_detalhe=lpe` (antes `lpa`). A coluna `origem_empreendimento_interesse` foi removida do INSERT.
