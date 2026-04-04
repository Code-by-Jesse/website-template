'use client'

import { useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from './PageTransition.module.scss'

gsap.registerPlugin(useGSAP)

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const prevPathname = useRef(pathname)

  useGSAP(() => {
    // Pagina enter animatie (bij elke route change)
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname

      const tl = gsap.timeline()

      // Content slide in
      tl.fromTo(contentRef.current,
        { y: '15vh', opacity: 0 },
        { y: '0vh', opacity: 1, duration: 0.8, ease: 'cubic-bezier(0.625, 0.05, 0, 1)' },
        0
      )

      // Overlay weg
      tl.to(overlayRef.current,
        { opacity: 0, duration: 0.5, ease: 'power2.out' },
        0
      )

      tl.set(overlayRef.current, { visibility: 'hidden' })

      // Scroll naar boven
      window.scrollTo(0, 0)
    }
  }, { dependencies: [pathname] })

  // Exporteer startTransition zodat Link componenten de leave-animatie kunnen triggeren
  const startLeaveAnimation = useCallback(() => {
    if (isAnimating.current) return Promise.resolve()
    isAnimating.current = true

    return new Promise<void>((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false
          resolve()
        },
      })

      tl.set(overlayRef.current, { visibility: 'visible', opacity: 0 })

      tl.to(overlayRef.current, {
        opacity: 0.8,
        duration: 0.6,
        ease: 'cubic-bezier(0.7, 0.05, 0.13, 1)',
      }, 0)

      tl.to(contentRef.current, {
        y: '-10vh',
        opacity: 0,
        duration: 0.6,
        ease: 'cubic-bezier(0.7, 0.05, 0.13, 1)',
      }, 0)
    })
  }, [])

  return (
    <>
      <div ref={overlayRef} className={styles.overlay} />
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </>
  )
}
