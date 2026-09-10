import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type LeadModalContextValue = {
  isOpen: boolean
  openLeadModal: () => void
  closeLeadModal: () => void
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null)

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openLeadModal = useCallback(() => setIsOpen(true), [])
  const closeLeadModal = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, openLeadModal, closeLeadModal }),
    [isOpen, openLeadModal, closeLeadModal],
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
