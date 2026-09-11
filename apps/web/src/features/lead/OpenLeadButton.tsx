import { openLeadModal } from "./store"

/** CTA estático no harness Astro → ilha de lead. */
export default function OpenLeadButton({
  label = "Quero saber mais",
}: {
  label?: string
}) {
  return (
    <button
      type="button"
      className="harness-cta"
      onClick={() => openLeadModal()}
    >
      {label}
    </button>
  )
}
