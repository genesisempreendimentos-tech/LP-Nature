/** Dispara eventos do Meta Pixel se `fbq` estiver disponível. */
export function trackMeta(
  event: "Lead" | "ViewContent" | "CompleteRegistration" | "PageView",
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return
  const fbq = (
    window as Window & {
      fbq?: (...args: unknown[]) => void
    }
  ).fbq
  if (typeof fbq !== "function") return
  if (params) fbq("track", event, params)
  else fbq("track", event)
}
