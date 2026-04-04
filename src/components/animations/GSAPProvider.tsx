'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Custom ease (zelfde als je Webflow "osmo" ease)
if (typeof window !== 'undefined') {
  gsap.defaults({
    ease: 'cubic-bezier(0.625, 0.05, 0, 1)',
    duration: 0.6,
  })
}

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Init Lenis smooth scrolling
    const lenis = new Lenis({
      lerp: 0.165,
      wheelMultiplier: 1.25,
    })
    lenisInstance = lenis

    // Sync Lenis met ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return <>{children}</>
}
