'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FullWidthTextBlock.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface FullWidthTextBlockProps {
  text: string
  size?: 'medium' | 'large' | 'xlarge'
  alignment?: 'left' | 'center'
}

export default function FullWidthTextBlock({
  text,
  size = 'large',
  alignment = 'left',
}: FullWidthTextBlockProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    const words = el.querySelectorAll(`.${styles.word}`)
    if (!words.length) return

    // Woorden starten op lage opacity, worden woord voor woord zichtbaar bij scrollen
    gsap.set(words, { opacity: 0.15 })

    gsap.to(words, {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 0.5,
      },
    })
  }, { scope: sectionRef })

  const words = text.split(/\s+/)

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-size={size}
      data-align={alignment}
      data-header-theme="light"
    >
      <p className={styles.text}>
        {words.map((word, i) => (
          <span key={i} className={styles.word}>
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
