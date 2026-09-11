import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { useStore } from "@nanostores/react"
import { IMaskInput } from "react-imask"
import { ArrowUpRight, X } from "lucide-react"
import { createLead } from "./leadsClient"
import {
  $leadModalOpen,
  closeLeadModal,
  getLeadModalTrigger,
  setLeadSession,
} from "./store"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldErrors = {
  name?: string
  email?: string
  phone?: string
  form?: string
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

export default function LeadModalIsland() {
  const isOpen = useStore($leadModalOpen)
  const titleId = useId()
  const descriptionId = useId()
  const nameRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setName("")
    setEmail("")
    setPhone("")
    setErrors({})
    setSubmitted(false)
    setSubmitting(false)
  }, [isOpen])

  const validate = (): FieldErrors => {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = "Informe seu nome."
    if (!email.trim()) next.email = "Informe seu e-mail."
    else if (!EMAIL_PATTERN.test(email.trim()))
      next.email = "Informe um e-mail válido."
    if (digitsOnly(phone).length !== 11) {
      next.phone = "Informe o telefone completo com DDD (11 dígitos)."
    }
    return next
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    setErrors({})

    try {
      const result = await createLead({
        nome: name.trim(),
        email: email.trim(),
        telefone: digitsOnly(phone),
      })
      setLeadSession({ id: result.id })
      setSubmitted(true)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível enviar seu contato. Tente novamente."
      setErrors({ form: message })
    } finally {
      setSubmitting(false)
    }
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
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            const trigger = getLeadModalTrigger()
            if (trigger && document.contains(trigger)) {
              trigger.focus()
              return
            }
            // Fallback: não deixar o foco em body sem destino.
            ;(document.querySelector(".harness-cta") as HTMLElement | null)?.focus()
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
              <Dialog.Description
                id={descriptionId}
                className="lead-modal-description"
              >
                Em breve a equipe Gênesis retorna com as informações do Nature.
              </Dialog.Description>
              <button
                type="button"
                className="section-cta"
                onClick={closeLeadModal}
              >
                <span className="section-cta-label">Fechar</span>
                <ArrowUpRight
                  className="section-cta-arrow"
                  size={22}
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </button>
            </div>
          ) : (
            <>
              <Dialog.Title id={titleId} className="lead-modal-title">
                Comece seu novo endereço
              </Dialog.Title>
              <Dialog.Description
                id={descriptionId}
                className="lead-modal-description"
              >
                Deixe seus dados e a equipe comercial entra em contato com as
                unidades disponíveis.
              </Dialog.Description>

              <form
                className="lead-modal-form contact-form"
                onSubmit={onSubmit}
                noValidate
              >
                <label htmlFor="lead-island-name">
                  Nome
                  <input
                    ref={nameRef}
                    id="lead-island-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    required
                    disabled={submitting}
                  />
                  {errors.name && (
                    <span className="lead-modal-error">{errors.name}</span>
                  )}
                </label>

                <label htmlFor="lead-island-email">
                  E-mail
                  <input
                    id="lead-island-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@exemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    required
                    disabled={submitting}
                  />
                  {errors.email && (
                    <span className="lead-modal-error">{errors.email}</span>
                  )}
                </label>

                <label htmlFor="lead-island-phone">
                  Telefone
                  <div className="lead-modal-phone">
                    <span className="lead-modal-phone-prefix" aria-hidden="true">
                      <span className="lead-modal-flag">BR</span>
                      +55
                    </span>
                    <IMaskInput
                      id="lead-island-phone"
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
                      required
                      disabled={submitting}
                    />
                  </div>
                  {errors.phone && (
                    <span className="lead-modal-error">{errors.phone}</span>
                  )}
                </label>

                {errors.form && (
                  <p className="lead-modal-error" role="alert">
                    {errors.form}
                  </p>
                )}

                <button
                  type="submit"
                  className="section-cta lead-modal-submit"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  <span className="section-cta-label">
                    {submitting ? "Enviando…" : "Enviar contato"}
                  </span>
                  <ArrowUpRight
                    className="section-cta-arrow"
                    size={22}
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                </button>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
