import { useEffect } from "react"
import { captureUtm } from "../../lib/utmTracking"
import { bootTracking } from "./runTracking"

/** Ilha mínima — cookies UTM (leads) + pageview/saída unificados. */
export default function TrackingBootIsland() {
  useEffect(() => {
    captureUtm()
    return bootTracking()
  }, [])
  return null
}
