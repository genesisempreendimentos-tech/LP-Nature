import { atom } from "nanostores"

export type LeadSession = {
  id: string
}

const STORAGE_KEY = "nature.leadSession"

function readStoredSession(): LeadSession | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<LeadSession>
    if (parsed?.id && typeof parsed.id === "string") return { id: parsed.id }
  } catch {
    /* ignore */
  }
  return null
}

/** Modal aberto? */
export const $leadModalOpen = atom(false)

export const $leadSession = atom<LeadSession | null>(readStoredSession())

/** Elemento que abriu o modal — para devolver o foco ao fechar (a11y). */
let leadModalTrigger: HTMLElement | null = null

export function getLeadModalTrigger() {
  return leadModalTrigger
}

export function openLeadModal() {
  if (typeof document !== "undefined") {
    const active = document.activeElement
    leadModalTrigger =
      active instanceof HTMLElement && active !== document.body ? active : null
  }
  $leadModalOpen.set(true)
}

export function closeLeadModal() {
  $leadModalOpen.set(false)
}

export function setLeadSession(session: LeadSession | null) {
  $leadSession.set(session)
  try {
    if (session) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* private mode */
  }
}
