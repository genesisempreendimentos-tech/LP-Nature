import type {
  AceitePayload,
  AcessoEntradaPayload,
  AcessoSaidaPayload,
} from "@nature/shared"

const ENTRADA = "/api/tracking"
const SAIDA = "/api/tracking/saida"
const CONSENTIMENTO = "/api/tracking/consentimento"

async function postJson(url: string, body: unknown): Promise<void> {
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    })
  } catch {
    /* silencioso */
  }
}

export async function postEntrada(payload: AcessoEntradaPayload): Promise<void> {
  await postJson(ENTRADA, payload)
}

export function postSaida(payload: AcessoSaidaPayload): void {
  const body = JSON.stringify(payload)
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" })
      if (navigator.sendBeacon(SAIDA, blob)) return
    }
  } catch {
    /* fallback abaixo */
  }
  void fetch(SAIDA, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {})
}

export async function patchAceite(payload: AceitePayload): Promise<void> {
  try {
    await fetch(CONSENTIMENTO, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch {
    /* silencioso */
  }
}
