import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react"
import { useStore } from "@nanostores/react"
import { MessageSquare, X } from "lucide-react"
import { $leadModalOpen, openLeadModal } from "./store"

const PHRASES = [
  "Apartamentos de 2 e 3 quartos, de 56,60 a 292,49 m².",
  "Piscina, sauna, academia e espaço gourmet completos.",
  "No Alto, perto de tudo que Teresópolis tem de melhor.",
  "Fale com um especialista sobre as plantas disponíveis.",
  "Certificação ISO 9001 e parceria com a Caixa Econômica Federal.",
] as const

const DISMISS_KEY = "nature_bubble_dismissed"
const COUNT_KEY = "nature_bubble_shown"
const INDEX_KEY = "nature_bubble_index"

const FIRST_DELAY_MS = 10_000
const VISIBLE_MS = 6_000
const REAPPEAR_MS = 52_000
const MAX_SHOWS = 3

function readCount() {
  if (typeof window === "undefined") return 0
  const value = Number.parseInt(sessionStorage.getItem(COUNT_KEY) ?? "0", 10)
  return Number.isFinite(value) ? value : 0
}

function readIndex() {
  if (typeof window === "undefined") return 0
  const value = Number.parseInt(sessionStorage.getItem(INDEX_KEY) ?? "0", 10)
  return Number.isFinite(value) ? value % PHRASES.length : 0
}

function isDismissed() {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem(DISMISS_KEY) === "1"
}

/** FAB de lead (legado WhatsAppFab) — abre modal, sem wa.me. */
export default function LeadFabIsland() {
  const isOpen = useStore($leadModalOpen)
  const [fabVisible, setFabVisible] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const [phrase, setPhrase] = useState<string>(PHRASES[0])

  useEffect(() => {
    setPhrase(PHRASES[readIndex()])
  }, [])

  const showTimerRef = useRef(0)
  const hideTimerRef = useRef(0)
  const fabVisibleRef = useRef(false)
  const modalOpenRef = useRef(isOpen)
  const bubbleOpenRef = useRef(false)

  fabVisibleRef.current = fabVisible
  modalOpenRef.current = isOpen
  bubbleOpenRef.current = bubbleOpen

  const clearShowTimer = useCallback(() => {
    window.clearTimeout(showTimerRef.current)
    showTimerRef.current = 0
  }, [])

  const clearHideTimer = useCallback(() => {
    window.clearTimeout(hideTimerRef.current)
    hideTimerRef.current = 0
  }, [])

  const scheduleShow = useCallback(
    (delayMs: number) => {
      if (isDismissed() || readCount() >= MAX_SHOWS) return
      clearShowTimer()
      showTimerRef.current = window.setTimeout(() => {
        showTimerRef.current = 0
        if (
          isDismissed() ||
          modalOpenRef.current ||
          !fabVisibleRef.current ||
          bubbleOpenRef.current ||
          readCount() >= MAX_SHOWS
        ) {
          return
        }

        const index = readIndex()
        setPhrase(PHRASES[index])
        setBubbleOpen(true)
        bubbleOpenRef.current = true

        const nextCount = readCount() + 1
        sessionStorage.setItem(COUNT_KEY, String(nextCount))
        sessionStorage.setItem(INDEX_KEY, String((index + 1) % PHRASES.length))

        clearHideTimer()
        hideTimerRef.current = window.setTimeout(() => {
          hideTimerRef.current = 0
          setBubbleOpen(false)
          bubbleOpenRef.current = false
          if (!isDismissed() && nextCount < MAX_SHOWS) {
            scheduleShow(REAPPEAR_MS)
          }
        }, VISIBLE_MS)
      }, delayMs)
    },
    [clearHideTimer, clearShowTimer],
  )

  useEffect(() => {
    const hero = document.getElementById("inicio")
    const onScroll = () => {
      if (!hero) {
        setFabVisible(true)
        return
      }
      const bottom = hero.getBoundingClientRect().bottom
      setFabVisible(bottom < 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!fabVisible || isDismissed()) return
    scheduleShow(FIRST_DELAY_MS)
    return () => {
      clearShowTimer()
      clearHideTimer()
    }
  }, [fabVisible, scheduleShow, clearShowTimer, clearHideTimer])

  useEffect(() => {
    if (isOpen) {
      setBubbleOpen(false)
      bubbleOpenRef.current = false
      clearShowTimer()
      clearHideTimer()
    } else if (fabVisible && !isDismissed() && readCount() < MAX_SHOWS) {
      scheduleShow(FIRST_DELAY_MS)
    }
  }, [
    isOpen,
    fabVisible,
    scheduleShow,
    clearShowTimer,
    clearHideTimer,
  ])

  const dismissBubble = (event: ReactMouseEvent) => {
    event.stopPropagation()
    sessionStorage.setItem(DISMISS_KEY, "1")
    setBubbleOpen(false)
    bubbleOpenRef.current = false
    clearShowTimer()
    clearHideTimer()
  }

  if (!fabVisible) return null

  return (
    <div className="lead-fab">
      {bubbleOpen && (
        <div className="lead-fab-bubble" role="status">
          <p className="lead-fab-bubble-body">{phrase}</p>
          <button
            type="button"
            className="lead-fab-bubble-close"
            aria-label="Dispensar"
            onClick={dismissBubble}
          >
            <X size={16} />
          </button>
        </div>
      )}
      <button
        type="button"
        className="lead-fab-button"
        aria-label="Falar com um consultor"
        onClick={() => openLeadModal()}
      >
        <MessageSquare size={22} strokeWidth={1.7} aria-hidden="true" />
      </button>
    </div>
  )
}
