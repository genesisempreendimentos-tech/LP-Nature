/**
 * Contrato Lead — fonte única (topology_decision.md).
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
 * Allowlist PATCH futuro (fase 2 — bloqueado por LGPD).
 * Nomes e capitalização exatos das colunas em site_nature.
 */
export const LEAD_PATCH_ALLOWLIST = [
  "relationship_status",
  "children_status",
  "profession",
  "monthly_investment",
  "sexo",
  "current_city",
  "birth_date",
  "profile_type",
] as const

export type LeadPatchField = (typeof LEAD_PATCH_ALLOWLIST)[number]

/** Payload parcial do PATCH /api/leads/:id (ainda não exposto). */
export type LeadPatchPayload = Partial<
  Record<LeadPatchField, string | null>
>
