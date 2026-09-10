import { useCallback, useRef, useState } from "react"
import { Hero } from "./components/nature/Hero"
import { LifeMoment } from "./components/nature/LifeMoment"
import { Pillars } from "./components/nature/Pillars"
import { Location } from "./components/nature/Location"
import { FloorPlans } from "./components/nature/FloorPlans"
import { Amenities } from "./components/nature/Amenities"
import { Architecture } from "./components/nature/Architecture"
import { Trust } from "./components/nature/Trust"
import { LeadForm } from "./components/nature/LeadForm"
import { Footer } from "./components/nature/Footer"
import Preloader from "./components/nature/Preloader"
import WhatsAppFab from "./components/nature/WhatsAppFab"
import LeadModal from "./components/nature/LeadModal"
import { LeadModalProvider } from "./context/LeadModalContext"
import usePageMotion from "./motion/usePageMotion"

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(
    () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      Boolean(window.location.hash),
  )
  const [introVisible, setIntroVisible] = useState(!ready)
  const revealHero = useCallback(() => setReady(true), [])
  const completeIntro = useCallback(() => {
    setReady(true)
    setIntroVisible(false)
  }, [])
  usePageMotion(pageRef, ready)
  return (
    <LeadModalProvider>
      {introVisible && <Preloader onReveal={revealHero} onComplete={completeIntro} pageRef={pageRef} />}
      <div
        ref={pageRef}
        inert={introVisible}
        className="w-full bg-nature-background min-h-screen selection:bg-nature-accent selection:text-white"
      >
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <main id="conteudo">
          <Hero ready={ready} />
          <LifeMoment />
          <Pillars />
          <Location />
          <FloorPlans />
          <Amenities />
          <Architecture />
          <Trust />
          <LeadForm />
        </main>
        <Footer />
        {!introVisible && <WhatsAppFab />}
        <LeadModal />
      </div>
    </LeadModalProvider>
  )
}
