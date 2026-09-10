import { useEffect, useState } from "react"

type Options = {
  /** Minimum scrollY before down-scroll can collapse the header */
  collapseAfter?: number
  /** Ignore scroll deltas smaller than this (px) */
  delta?: number
  /** Solid/scrolled color threshold */
  solidAt?: number
}

/**
 * Scroll direction + solid-header threshold for the Nature header.
 * - scrollingDown: true when rolling down past collapseAfter
 * - scrollingDown: false as soon as the user rolls up (even slightly)
 * - isSolid: scrollY > solidAt (default 64)
 */
export function useScrollDirection({
  collapseAfter = 100,
  delta = 5,
  solidAt = 64,
}: Options = {}) {
  const [scrollingDown, setScrollingDown] = useState(false)
  const [scrollY, setScrollY] = useState(
    () => (typeof window !== "undefined" ? window.scrollY : 0),
  )

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const diff = y - lastY

      if (Math.abs(diff) >= delta) {
        if (diff > 0 && y > collapseAfter) {
          setScrollingDown(true)
        } else if (diff < 0) {
          setScrollingDown(false)
        }
        lastY = y
      }

      setScrollY(y)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [collapseAfter, delta])

  return {
    scrollingDown,
    scrollY,
    isSolid: scrollY > solidAt,
  }
}

export default useScrollDirection
