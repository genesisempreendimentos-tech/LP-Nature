/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Só "1" liga o formulário global Genesis. */
  readonly PUBLIC_FORMULARIO_GLOBAL?: string
  /** Base do widget (ex.: https://forms.genesisapps.com.br). */
  readonly PUBLIC_FORMS_WIDGET_BASE?: string
  /** formId público (ex.: nature-lp). */
  readonly PUBLIC_FORMS_ID?: string
  /** Só "1" = produção real (preview: false). Qualquer outro valor = prévia. */
  readonly PUBLIC_FORMS_REAL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
