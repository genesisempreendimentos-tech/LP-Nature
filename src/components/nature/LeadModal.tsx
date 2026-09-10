import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { IMaskInput } from "react-imask"
import { ArrowUpRight, X } from "lucide-react"
import { useLeadModal } from "../../context/LeadModalContext"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldErrors = {
  name?: string
  email?: string
  phone?: string
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

export function LeadModal() {
  const { isOpen, closeLeadModal } = useLeadModal()
  const titleId = useId()
  const descriptionId = useId()
  const nameRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setName("")
    setEmail("")
    setPhone("")
    setErrors({})
    setSubmitted(false)
  }, [isOpen])

  const validate = (): FieldErrors => {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = "Informe seu nome."
    if (!email.trim()) next.email = "Informe seu e-mail."
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = "Informe um e-mail válido."
    if (digitsOnly(phone).length !== 11) {
      next.phone = "Informe o telefone completo com DDD (11 dígitos)."
    }
    return next
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const data = {
      name: name.trim(),
      email: email.trim(),
      phone: `+55${digitsOnly(phone)}`,
    }
    console.log(data)
    setSubmitted(true)
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeLeadModal()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="lead-modal-overlay" />
        <Dialog.Content
          className="lead-modal-content"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            nameRef.current?.focus()
          }}
        >
          <div className="lead-modal-top">
            <p className="eyebrow">NATURE RESIDENCIAL</p>
            <Dialog.Close className="lead-modal-close" aria-label="Fechar">
              <X size={20} strokeWidth={1.6} />
            </Dialog.Close>
          </div>

          {submitted ? (
            <div className="lead-modal-success" role="status">
              <Dialog.Title id={titleId} className="lead-modal-title">
                Recebemos seu contato
              </Dialog.Title>
              <Dialog.Description id={descriptionId} className="lead-modal-description">
                Em breve a equipe Gênesis retorna com as informações do Nature.
              </Dialog.Description>
              <button type="button" className="section-cta" onClick={closeLeadModal}>
                <span className="section-cta-label">Fechar</span>
                <ArrowUpRight className="section-cta-arrow" size={22} strokeWidth={2.25} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <>
              <Dialog.Title id={titleId} className="lead-modal-title">
                Comece seu novo endereço
              </Dialog.Title>
              <Dialog.Description id={descriptionId} className="lead-modal-description">
                Deixe seus dados e a equipe comercial entra em contato com as
                unidades disponíveis.
              </Dialog.Description>

              <form className="lead-modal-form contact-form" onSubmit={onSubmit} noValidate>
                <label htmlFor="lead-modal-name">
                  Nome
                  <input
                    ref={nameRef}
                    id="lead-modal-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "lead-modal-name-error" : undefined}
                    required
                  />
                  {errors.name && (
                    <span id="lead-modal-name-error" className="lead-modal-error">
                      {errors.name}
                    </span>
                  )}
                </label>

                <label htmlFor="lead-modal-email">
                  E-mail
                  <input
                    id="lead-modal-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@exemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "lead-modal-email-error" : undefined}
                    required
                  />
                  {errors.email && (
                    <span id="lead-modal-email-error" className="lead-modal-error">
                      {errors.email}
                    </span>
                  )}
                </label>

                <label htmlFor="lead-modal-phone">
                  Telefone
                  <div className="lead-modal-phone">
                    <span className="lead-modal-phone-prefix" aria-hidden="true">
                      <span className="lead-modal-flag">🇧🇷</span>
                      +55
                    </span>
                    <IMaskInput
                      id="lead-modal-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      mask="00 00000-0000"
                      unmask={false}
                      value={phone}
                      onAccept={(value: string) => setPhone(value)}
                      placeholder="21 99999-9999"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "lead-modal-phone-error" : undefined}
                      required
                    />
                  </div>
                  {errors.phone && (
                    <span id="lead-modal-phone-error" className="lead-modal-error">
                      {errors.phone}
                    </span>
                  )}
                </label>

                <button type="submit" className="section-cta lead-modal-submit">
                  <span className="section-cta-label">Enviar contato</span>
                  <ArrowUpRight className="section-cta-arrow" size={22} strokeWidth={2.25} aria-hidden="true" />
                </button>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default LeadModal
