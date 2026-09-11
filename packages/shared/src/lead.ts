/**
 * Contrato Lead — fonte única.
 *
 * Wire do POST (cliente → API): português `nome` / `email` / `telefone`.
 * Colunas Neon: `name` / `email` / `phone` (mapeadas só no apps/api).
 * `pagina_origem` NÃO vem do cliente — definida no servidor via PAGINA_ORIGEM.
 */

/** Body JSON do POST /api/leads (contrato atual em produção). */
export type LeadCreatePayload = {
  nome: string
  email: string
  telefone: string
}

/** Resposta 201 do POST /api/leads. */
export type LeadCreateResponse = {
  id: string
}

/**
 * Allowlist PATCH — nomes e capitalização exatos das colunas em site_nature.
 * `monthly_income` = renda familiar (passo 4); `monthly_investment` legado com CHECK antigo.
 */
export const LEAD_PATCH_ALLOWLIST = [
  "relationship_status",
  "children_status",
  "profession",
  "monthly_income",
  "monthly_investment",
  "sexo",
  "current_city",
  "birth_date",
  "profile_type",
  "whatsapp_clicked",
  "profile_completed",
] as const

export type LeadPatchField = (typeof LEAD_PATCH_ALLOWLIST)[number]

export const LEAD_PATCH_BOOLEAN_FIELDS = [
  "whatsapp_clicked",
  "profile_completed",
] as const satisfies readonly LeadPatchField[]

/** Payload parcial do PATCH /api/leads/:id. */
export type LeadPatchPayload = Partial<{
  relationship_status: string | null
  children_status: string | null
  profession: string | null
  monthly_income: string | null
  monthly_investment: string | null
  sexo: string | null
  current_city: string | null
  birth_date: string | null
  profile_type: string | null
  whatsapp_clicked: boolean
  profile_completed: boolean
}>

/** Resposta 200 do PATCH /api/leads/:id. */
export type LeadPatchResponse = {
  id: string
}
