import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger)

export const natureEase = CustomEase.create("nature-out", "0.23,1,0.32,1")
export { gsap, SplitText, ScrollTrigger }
