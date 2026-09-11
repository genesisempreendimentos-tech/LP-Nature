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
 * Visual Nature (--color-accent / display / Montserrat CTA).
 * Não controla o Meta Pixel.
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
            Utilizamos cookies para melhorar sua experiência, personalizar
            conteúdo e entender como o site é utilizado. Você pode aceitar ou
            negar cookies opcionais.
          </p>
          <p className="cookie-consent-note" id="cookie-consent-note">
            Cookies essenciais continuam ativos para o site funcionar. Analytics
            só com o seu aceite.
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
            onClick={() => decide("negado")}
          >
            Negar cookies
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
