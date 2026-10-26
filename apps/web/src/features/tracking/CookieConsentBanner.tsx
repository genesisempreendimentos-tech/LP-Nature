import { useCallback, useEffect, useState } from "react"
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from "./cookieConsent"

const POLICIES_HREF =
  "https://genesisempreendimentos.com.br/politica-cookies"

/**
 * Banner de cookies — não modal: página continua navegável.
 * Aceite dispara evento → tracking PATCH + Meta Pixel (runTracking / metaPixel).
 */
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (readCookieConsent() === null) {
      setVisible(true)
    }
  }, [])

  const decide = useCallback((value: CookieConsentValue) => {
    writeCookieConsent(value)
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      setVisible(false)
      setExiting(false)
      return
    }

    setExiting(true)
    window.setTimeout(() => {
      setVisible(false)
      setExiting(false)
    }, 280)
  }, [])

  if (!visible) return null

  return (
    <aside
      className={`cookie-consent${exiting ? " is-exiting" : ""}`}
      role="region"
      aria-label="Preferências de cookies"
      aria-describedby="cookie-consent-body cookie-consent-note"
    >
      <div className="cookie-consent-inner">
        <div className="cookie-consent-copy">
          <h2 className="cookie-consent-title" id="cookie-consent-title">
            Sua privacidade é importante para nós
          </h2>
          <p className="cookie-consent-body" id="cookie-consent-body">
            Usamos cookies essenciais para o site funcionar e, com o seu
            aceite, cookies de medição (analytics) e o Meta Pixel para
            entender visitas e campanhas. Você pode aceitar ou rejeitar os
            opcionais.
          </p>
          <p className="cookie-consent-note" id="cookie-consent-note">
            Sem escolha, tratamos como pendente: registramos a visita sem IP,
            user-agent ou id de sessão. Analytics completo e Pixel só após
            aceitar.
          </p>
        </div>

        <div className="cookie-consent-actions">
          <button
            type="button"
            className="section-cta cookie-consent-accept"
            onClick={() => decide("aceito")}
          >
            <span className="section-cta-label">Aceitar cookies</span>
          </button>
          <button
            type="button"
            className="cookie-consent-deny"
            onClick={() => decide("rejeitado")}
          >
            Rejeitar cookies
          </button>
          <a
            className="cookie-consent-policies"
            href={POLICIES_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar políticas
          </a>
        </div>
      </div>
    </aside>
  )
}
