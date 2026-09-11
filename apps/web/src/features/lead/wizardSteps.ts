import type { LeadPatchField } from "@nature/shared"

export type WizardStepKind = "choice" | "text" | "date"

export type WizardOption = {
  label: string
  /** Valor gravado no Neon (pode diferir do label). */
  value: string
}

export type WizardStep = {
  field: Exclude<
    LeadPatchField,
    "whatsapp_clicked" | "profile_completed" | "monthly_investment"
  >
  title: string
  kind: WizardStepKind
  options?: readonly WizardOption[]
  placeholder?: string
  confirmLabel?: string
}

export const WIZARD_STEPS: readonly WizardStep[] = [
  {
    field: "relationship_status",
    title: "Status de Relacionamento",
    kind: "choice",
    options: [
      { label: "Solteiro(a)", value: "Solteiro(a)" },
      { label: "Namorando", value: "Namorando" },
      { label: "Noivo(a)", value: "Noivo(a)" },
      { label: "Casado(a) / União estável", value: "Casado(a) / União estável" },
      { label: "Viúvo(a)", value: "Viúvo(a)" },
    ],
  },
  {
    field: "children_status",
    title: "Tem filhos?",
    kind: "choice",
    options: [
      { label: "Nenhum", value: "Nenhum" },
      { label: "Um", value: "Um" },
      { label: "Dois", value: "Dois" },
      { label: "Três", value: "Três" },
      { label: "Mais de três", value: "Mais de três" },
    ],
  },
  {
    field: "profession",
    title: "Qual é a sua profissão?",
    kind: "text",
    placeholder: "Ex: Engenheiro(a), Professor(a)",
  },
  {
    // Coluna com CHECK antigo (faixas de investimento) ≠ UI de renda.
    // Renda familiar grava em monthly_income (sem CHECK no Neon).
    field: "monthly_income",
    title: "Qual é a sua renda familiar mensal?",
    kind: "choice",
    options: [
      { label: "Até R$ 3 mil", value: "Até R$ 3 mil" },
      { label: "R$ 3 a 5 mil", value: "R$ 3 a 5 mil" },
      { label: "R$ 5 a 8 mil", value: "R$ 5 a 8 mil" },
      { label: "R$ 8 a 12 mil", value: "R$ 8 a 12 mil" },
      { label: "R$ 12 a 20 mil", value: "R$ 12 a 20 mil" },
      { label: "Acima de R$ 20 mil", value: "Acima de R$ 20 mil" },
    ],
  },
  {
    // CHECK Neon: masculino | feminino | prefiro_nao_dizer
    field: "sexo",
    title: "Qual é o seu gênero?",
    kind: "choice",
    options: [
      { label: "Masculino", value: "masculino" },
      { label: "Feminino", value: "feminino" },
      { label: "Prefiro não dizer", value: "prefiro_nao_dizer" },
    ],
  },
  {
    field: "current_city",
    title: "Cidade de Residência",
    kind: "text",
    placeholder: "Ex: Teresópolis - RJ",
  },
  {
    field: "birth_date",
    title: "Data de Nascimento",
    kind: "date",
    placeholder: "dd/mm/aaaa",
  },
  {
    field: "profile_type",
    title: "Seu Perfil",
    kind: "choice",
    options: [
      { label: "Morador", value: "Morador" },
      { label: "Investidor", value: "Investidor" },
      { label: "Corretor", value: "Corretor" },
    ],
    confirmLabel: "Confirmar inscrição",
  },
] as const

export const WIZARD_STEP_COUNT = WIZARD_STEPS.length

/** Converte dd/mm/aaaa → YYYY-MM-DD ou null se inválido. */
export function parseBrDateToIso(value: string): string | null {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return null
  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  if (year < 1900 || year > new Date().getFullYear()) return null
  const dt = new Date(Date.UTC(year, month - 1, day))
  if (
    dt.getUTCFullYear() !== year ||
    dt.getUTCMonth() !== month - 1 ||
    dt.getUTCDate() !== day
  ) {
    return null
  }
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}
