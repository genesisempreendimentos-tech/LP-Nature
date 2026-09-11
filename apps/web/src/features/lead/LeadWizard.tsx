import { useMemo, useState } from "react"
import { IMaskInput } from "react-imask"
import { Check } from "lucide-react"
import type { LeadPatchPayload } from "@nature/shared"
import { patchLead } from "./leadsClient"
import {
  WIZARD_STEP_COUNT,
  WIZARD_STEPS,
  parseBrDateToIso,
} from "./wizardSteps"
import { closeLeadModal } from "./store"

type LeadWizardProps = {
  leadId: string
  titleId: string
  descriptionId: string
  onComplete: () => void
}

type Answers = Partial<Record<(typeof WIZARD_STEPS)[number]["field"], string>>

export default function LeadWizard({
  leadId,
  titleId,
  descriptionId,
  onComplete,
}: LeadWizardProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [draft, setDraft] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [navDir, setNavDir] = useState<"forward" | "back">("forward")
  const [panelKey, setPanelKey] = useState(0)

  const step = WIZARD_STEPS[stepIndex]
  const isLast = stepIndex === WIZARD_STEP_COUNT - 1
  const stored = answers[step.field] ?? ""
  const isCompact = step.kind === "text" || step.kind === "date"

  const currentValue = useMemo(() => {
    if (step.kind === "choice") return stored
    return draft || stored
  }, [draft, step.kind, stored])

  const canContinue = (() => {
    if (step.kind === "choice") return Boolean(currentValue)
    if (step.kind === "date") return Boolean(parseBrDateToIso(currentValue))
    return currentValue.trim().length > 0
  })()

  const setChoice = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.field]: value }))
    setError(null)
  }

  const goToStep = (nextIndex: number, dir: "forward" | "back") => {
    const nextStep = WIZARD_STEPS[nextIndex]
    setNavDir(dir)
    setPanelKey((k) => k + 1)
    setStepIndex(nextIndex)
    setDraft(answers[nextStep.field] ?? "")
    setError(null)
  }

  const onBack = () => {
    if (stepIndex === 0 || busy) return
    goToStep(stepIndex - 1, "back")
  }

  const onContinue = async () => {
    if (!canContinue || busy) return
    setBusy(true)
    setError(null)

    try {
      let valueToSave = currentValue.trim()
      if (step.kind === "date") {
        const iso = parseBrDateToIso(valueToSave)
        if (!iso) {
          setError("Informe uma data válida (dd/mm/aaaa).")
          setBusy(false)
          return
        }
        valueToSave = iso
      }

      const payload: LeadPatchPayload = {
        [step.field]: valueToSave,
      }

      if (isLast) {
        payload.profile_completed = true
      }

      await patchLead(leadId, payload)

      setAnswers((prev) => ({
        ...prev,
        [step.field]:
          step.kind === "date" ? currentValue.trim() : valueToSave,
      }))

      if (isLast) {
        // fbq('track', 'CompleteRegistration');
        // TODO: disparar quando o fluxo de cadastro completo (8 passos)
        // for implementado — hoje bloqueado por PENDENCIAS.md item 1 (LGPD)
        // Nota: o wizard técnico já existe; manter desligado até ok jurídico.
        onComplete()
        return
      }

      goToStep(stepIndex + 1, "forward")
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível salvar. Tente novamente.",
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className={
        isCompact ? "lead-wizard lead-wizard--compact" : "lead-wizard"
      }
    >
      <div className="lead-wizard-header">
        <p className="lead-wizard-step">
          Passo {stepIndex + 1} de {WIZARD_STEP_COUNT}
        </p>
        <h2 id={titleId} className="lead-wizard-title">
          {step.title}
        </h2>
        <p id={descriptionId} className="sr-only">
          Etapa {stepIndex + 1} de {WIZARD_STEP_COUNT} do cadastro completo.
        </p>
      </div>

      <div
        key={panelKey}
        className={
          navDir === "back"
            ? "lead-wizard-panel lead-wizard-panel--back"
            : "lead-wizard-panel lead-wizard-panel--forward"
        }
      >
        <div className="lead-wizard-body">
          {step.kind === "choice" && step.options && (
            <div
              className="lead-wizard-options"
              role="radiogroup"
              aria-labelledby={titleId}
            >
              {step.options.map((option) => {
                const selected = currentValue === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={
                      selected
                        ? "lead-wizard-option is-selected"
                        : "lead-wizard-option"
                    }
                    onClick={() => setChoice(option.value)}
                    disabled={busy}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          )}

          {step.kind === "text" && (
            <label className="lead-wizard-field">
              <span className="sr-only">{step.title}</span>
              <input
                type="text"
                value={currentValue}
                onChange={(event) => {
                  setDraft(event.target.value)
                  setError(null)
                }}
                placeholder={step.placeholder}
                disabled={busy}
                autoComplete="off"
              />
            </label>
          )}

          {step.kind === "date" && (
            <label className="lead-wizard-field">
              <span className="sr-only">{step.title}</span>
              <IMaskInput
                mask="00/00/0000"
                value={currentValue}
                unmask={false}
                onAccept={(value: string) => {
                  setDraft(value)
                  setError(null)
                }}
                placeholder={step.placeholder}
                inputMode="numeric"
                disabled={busy}
              />
            </label>
          )}

          {error && (
            <p className="lead-modal-error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>

      <div
        className={
          stepIndex > 0
            ? "lead-wizard-footer"
            : "lead-wizard-footer lead-wizard-footer--solo"
        }
      >
        {stepIndex > 0 ? (
          <button
            type="button"
            className="lead-wizard-back"
            onClick={onBack}
            disabled={busy}
          >
            ← Voltar
          </button>
        ) : null}
        <button
          type="button"
          className="lead-wizard-continue"
          onClick={onContinue}
          disabled={!canContinue || busy}
          aria-busy={busy}
        >
          {busy
            ? "Salvando…"
            : isLast
              ? (step.confirmLabel ?? "Confirmar inscrição")
              : "Continuar →"}
        </button>
      </div>
    </div>
  )
}

export function LeadThanks({
  titleId,
  descriptionId,
}: {
  titleId: string
  descriptionId: string
}) {
  return (
    <div className="lead-thanks">
      <span className="lead-thanks-icon" aria-hidden="true">
        <Check size={22} strokeWidth={2.25} />
      </span>
      <h2 id={titleId} className="lead-thanks-title">
        Obrigado!
      </h2>
      <p id={descriptionId} className="lead-thanks-desc">
        Seu cadastro foi concluído com sucesso. Em breve um especialista entra
        em contato para apresentar as condições exclusivas do Nature.
      </p>
      <button
        type="button"
        className="lead-thanks-close"
        onClick={closeLeadModal}
      >
        Fechar
      </button>
    </div>
  )
}
