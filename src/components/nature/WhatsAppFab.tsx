import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react"
import { useGSAP } from "@gsap/react"
import { MessageSquare, X } from "lucide-react"
import { gsap, ScrollTrigger } from "../../motion/gsap"
import { useLeadModal } from "../../context/LeadModalContext"

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
  const value = Number.parseInt(sessionStorage.getItem(COUNT_KEY) ?? "0", 10)
  return Number.isFinite(value) ? value : 0
}

function readIndex() {
  const value = Number.parseInt(sessionStorage.getItem(INDEX_KEY) ?? "0", 10)
  return Number.isFinite(value) ? value % PHRASES.length : 0
}

function isDismissed() {
  return sessionStorage.getItem(DISMISS_KEY) === "1"
}

export function WhatsAppFab() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const { isOpen, openLeadModal } = useLeadModal()
  const [fabVisible, setFabVisible] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const [phrase, setPhrase] = useState(() => PHRASES[readIndex()])
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  const mountedAtRef = useRef(Date.now())
  const showTimerRef = useRef(0)
  const hideTimerRef = useRef(0)
  const fabVisibleRef = useRef(false)
  const modalOpenRef = useRef(isOpen)
  const bubbleOpenRef = useRef(false)
  const awaitingReappearRef = useRef(false)

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

  const clearAllTimers = useCallback(() => {
    clearShowTimer()
    clearHideTimer()
  }, [clearHideTimer, clearShowTimer])

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
        awaitingReappearRef.current = false

        const nextCount = readCount() + 1
        sessionStorage.setItem(COUNT_KEY, String(nextCount))
        sessionStorage.setItem(INDEX_KEY, String((index + 1) % PHRASES.length))

        clearHideTimer()
        hideTimerRef.current = window.setTimeout(() => {
          hideTimerRef.current = 0
          setBubbleOpen(false)
          bubbleOpenRef.current = false

          if (!isDismissed() && nextCount < MAX_SHOWS) {
            awaitingReappearRef.current = true
            scheduleShow(REAPPEAR_MS)
          }
        }, VISIBLE_MS)
      }, delayMs)
    },
    [clearHideTimer, clearShowTimer],
  )

  const dismissBubble = useCallback(
    (event: ReactMouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      sessionStorage.setItem(DISMISS_KEY, "1")
      awaitingReappearRef.current = false
      clearAllTimers()
      setBubbleOpen(false)
      bubbleOpenRef.current = false
    },
    [clearAllTimers],
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  // Hide bubble while the lead modal is open; resume cycle afterward if needed.
  useEffect(() => {
    if (isOpen) {
      clearHideTimer()
      if (bubbleOpenRef.current) {
        setBubbleOpen(false)
        bubbleOpenRef.current = false
        if (!isDismissed() && readCount() < MAX_SHOWS) {
          awaitingReappearRef.current = true
        }
      }
      clearShowTimer()
      return
    }

    if (
      !fabVisibleRef.current ||
      isDismissed() ||
      readCount() >= MAX_SHOWS ||
      bubbleOpenRef.current
    ) {
      return
    }

    if (awaitingReappearRef.current) {
      scheduleShow(REAPPEAR_MS)
      return
    }

    if (readCount() === 0) {
      const delay = Math.max(FIRST_DELAY_MS - (Date.now() - mountedAtRef.current), 0)
      scheduleShow(delay)
    }
  }, [isOpen, clearHideTimer, clearShowTimer, scheduleShow])

  // Arm first / pending show when the FAB becomes visible.
  useEffect(() => {
    if (!fabVisible) {
      clearAllTimers()
      if (bubbleOpenRef.current) {
        setBubbleOpen(false)
        bubbleOpenRef.current = false
        if (!isDismissed() && readCount() < MAX_SHOWS) {
          awaitingReappearRef.current = true
        }
      }
      return
    }

    if (modalOpenRef.current || isDismissed() || readCount() >= MAX_SHOWS) return
    if (bubbleOpenRef.current || showTimerRef.current) return

    if (awaitingReappearRef.current) {
      scheduleShow(REAPPEAR_MS)
      return
    }

    if (readCount() === 0) {
      const delay = Math.max(FIRST_DELAY_MS - (Date.now() - mountedAtRef.current), 0)
      scheduleShow(delay)
    }
  }, [fabVisible, clearAllTimers, scheduleShow])

  useEffect(() => () => clearAllTimers(), [clearAllTimers])

  useGSAP(() => {
    const wrap = wrapRef.current
    const hero = document.querySelector("#inicio")
    if (!wrap || !hero) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.set(wrap, {
      autoAlpha: 0,
      scale: reduced ? 1 : 0.86,
      pointerEvents: "none",
    })

    ScrollTrigger.create({
      trigger: hero,
      start: "bottom top",
      onEnter: () => {
        setFabVisible(true)
        gsap.to(wrap, {
          autoAlpha: 1,
          scale: 1,
          duration: reduced ? 0 : 0.45,
          ease: "power3.out",
          overwrite: true,
          onStart: () => {
            wrap.style.pointerEvents = "auto"
          },
        })
      },
      onLeaveBack: () => {
        setFabVisible(false)
        gsap.to(wrap, {
          autoAlpha: 0,
          scale: reduced ? 1 : 0.86,
          duration: reduced ? 0 : 0.28,
          ease: "power2.in",
          overwrite: true,
          onComplete: () => {
            wrap.style.pointerEvents = "none"
          },
        })
      },
    })
  }, [])

  return (
    <div ref={wrapRef} className="lead-fab">
      {bubbleOpen && (
        <div
          className={`lead-fab-bubble${reducedMotion ? " is-instant" : ""}`}
          role="status"
        >
          <button
            type="button"
            className="lead-fab-bubble-body"
            onClick={openLeadModal}
          >
            {phrase}
          </button>
          <button
            type="button"
            className="lead-fab-bubble-close"
            onClick={dismissBubble}
            aria-label="Fechar mensagem"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      )}

      <button
        type="button"
        className="lead-fab-button"
        onClick={openLeadModal}
        aria-label="Falar com um consultor"
      >
        <MessageSquare size={24} strokeWidth={1.6} aria-hidden="true" />
      </button>
    </div>
  )
}

export default WhatsAppFab
