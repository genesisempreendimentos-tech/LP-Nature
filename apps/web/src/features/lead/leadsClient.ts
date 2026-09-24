import type {
  LeadCreatePayload,
  LeadCreateResponse,
  LeadPatchPayload,
  LeadPatchResponse,
} from "@nature/shared"
import { getUtmPair } from "../../lib/utmTracking"

export type {
  LeadCreatePayload,
  LeadCreateResponse,
  LeadPatchPayload,
  LeadPatchResponse,
}

const LEADS_ENDPOINT = "/api/leads"

export class LeadApiError extends Error {
  readonly status: number
  readonly duplicate: boolean

  constructor(message: string, status: number) {
    super(message)
    this.name = "LeadApiError"
    this.status = status
    this.duplicate = status === 409
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

function errorMessage(data: unknown, fallback: string) {
  if (
    data &&
    typeof data === "object" &&
    "error" in data &&
    typeof (data as { error: unknown }).error === "string"
  ) {
    return (data as { error: string }).error
  }
  return fallback
}

export async function createLead(
  payload: LeadCreatePayload,
): Promise<LeadCreateResponse> {
  const utms = getUtmPair()
  const response = await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      utm_first:
        payload.utm_first !== undefined ? payload.utm_first : utms.utm_first,
      utm_last:
        payload.utm_last !== undefined ? payload.utm_last : utms.utm_last,
    }),
  })

  const data = await readJson(response)

  if (!response.ok) {
    throw new LeadApiError(
      errorMessage(data, "Não foi possível enviar seu contato. Tente novamente."),
      response.status,
    )
  }

  const body = data as Partial<LeadCreateResponse>
  if (!body?.id) {
    throw new LeadApiError("Resposta inválida da API de leads.", 502)
  }

  return { id: body.id }
}

export async function patchLead(
  id: string,
  payload: LeadPatchPayload,
): Promise<LeadPatchResponse> {
  const response = await fetch(`${LEADS_ENDPOINT}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = await readJson(response)

  if (!response.ok) {
    throw new LeadApiError(
      errorMessage(data, "Não foi possível atualizar seu cadastro. Tente novamente."),
      response.status,
    )
  }

  const body = data as Partial<LeadPatchResponse>
  if (!body?.id) {
    throw new LeadApiError("Resposta inválida da API de leads.", 502)
  }

  return { id: body.id }
}
