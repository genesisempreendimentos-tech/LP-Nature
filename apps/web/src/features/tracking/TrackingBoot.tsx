import { useEffect } from "react"
import { bootTracking } from "./trackingBoot"

/** Ilha mínima — dispara pageview/engajamento no cliente. */
export default function TrackingBoot() {
  useEffect(() => bootTracking(), [])
  return null
}
