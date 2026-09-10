import { useEffect, useRef, useState, type ComponentType } from "react"

export default function LocationMapLazy() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [Map, setMap] = useState<ComponentType | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        import("./LocationMap").then((module) => setMap(() => module.default))
        observer.disconnect()
      },
      { rootMargin: "700px 0px" },
    )

    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={hostRef} className="location-map-lazy">
      {Map ? <Map /> : <div className="location-map-loading" aria-hidden="true" />}
    </div>
  )
}
