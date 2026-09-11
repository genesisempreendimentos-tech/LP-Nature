import { useEffect } from "react"
import { bindAppReadyFromDom } from "../shell/appReady"
import { initMarketingReveal } from "./marketingReveal"

/** Boot mínimo: liga appReady → scroll-reveal das seções estáticas. */
export default function MarketingRevealBoot() {
  useEffect(() => {
    bindAppReadyFromDom()
    initMarketingReveal()
  }, [])
  return null
}
