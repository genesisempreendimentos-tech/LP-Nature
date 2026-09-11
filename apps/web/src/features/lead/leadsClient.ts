import type {
  LeadCreatePayload,
  LeadCreateResponse,
} from "@nature/shared"

export type { LeadCreatePayload, LeadCreateResponse }

const LEADS_ENDPOINT = "/api/leads"

export async function createLead(
  payload: LeadCreatePayload,
): Promise<LeadCreateResponse> {
  const response = await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  let data: unknown = null
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Não foi possível enviar seu contato. Tente novamente."
    throw new Error(message)
  }

  const body = data as Partial<LeadCreateResponse>
  if (!body?.id) {
    throw new Error("Resposta inválida da API de leads.")
  }

  return { id: body.id }
}
