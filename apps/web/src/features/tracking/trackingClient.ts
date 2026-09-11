import type {
  TrackingClientPayload,
  TrackingCreateResponse,
} from "@nature/shared"
import { getTrackingConsent } from "./cookieConsent"

const TRACKING_ENDPOINT = "/api/tracking"

type TrackingOutboundPayload = Omit<TrackingClientPayload, "consentimento"> & {
  /** Ignorado se enviado — o servidor de verdade é o localStorage / default negado. */
  consentimento?: TrackingClientPayload["consentimento"]
}

/**
 * Envia evento de tracking. `consentimento` sempre vem de
 * getTrackingConsent() (localStorage ou 'negado' até o aceite explícito).
 * Meta Pixel NÃO passa por aqui.
 */
export async function postTracking(
  payload: TrackingOutboundPayload,
): Promise<TrackingCreateResponse> {
  const body: TrackingClientPayload = {
    ...payload,
    consentimento: getTrackingConsent(),
  }

  const response = await fetch(TRACKING_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
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
        : "Falha ao enviar tracking."
    throw new Error(message)
  }

  return data as TrackingCreateResponse
}
