import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

const STORAGE_KEY = "nature.leadSession"

type LeadSession = {
  id: string
}

type LeadModalContextValue = {
  isOpen: boolean
  openLeadModal: () => void
  closeLeadModal: () => void
  leadSession: LeadSession | null
  setLeadSession: (session: LeadSession | null) => void
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null)

function readStoredSession(): LeadSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<LeadSession>
    if (parsed?.id && typeof parsed.id === "string") {
      return { id: parsed.id }
    }
  } catch {
    /* ignore */
  }
  return null
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [leadSession, setLeadSessionState] = useState<LeadSession | null>(() =>
    typeof window !== "undefined" ? readStoredSession() : null,
  )

  const setLeadSession = useCallback((session: LeadSession | null) => {
    setLeadSessionState(session)
    try {
      if (session) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
      } else {
        sessionStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      /* private mode etc. */
    }
  }, [])

  const openLeadModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeLeadModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      openLeadModal,
      closeLeadModal,
      leadSession,
      setLeadSession,
    }),
    [isOpen, openLeadModal, closeLeadModal, leadSession, setLeadSession],
  )

  return (
    <LeadModalContext.Provider value={value}>{children}</LeadModalContext.Provider>
  )
}

export function useLeadModal() {
  const context = useContext(LeadModalContext)
  if (!context) {
    throw new Error("useLeadModal deve ser usado dentro de LeadModalProvider")
  }
  return context
}
