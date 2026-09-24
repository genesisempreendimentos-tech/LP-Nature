import { useEffect } from "react"
import { captureUtm } from "../../lib/utmTracking"
import { bootTracking } from "./runTracking"

/** Ilha mínima — UTM (essencial) + pageview/engajamento no cliente. */
export default function TrackingBootIsland() {
  useEffect(() => {
    captureUtm()
    return bootTracking()
  }, [])
  return null
}
