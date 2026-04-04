'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ButtonGroup, type ButtonProps } from '@/components/ui/Button/Button'
import styles from './CTABlock.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface CTABlockProps {
  heading: string
  text?: string | null
  buttons?: ButtonProps[]
  theme?: 'accent' | 'dark' | 'light'
}

export default function CTABlock({
  heading,
  text,
  buttons,
  theme = 'accent',
}: CTABlockProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.fromTo(el.querySelector(`.${styles.inner}`),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'cubic-bezier(0.625, 0.05, 0, 1)',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-theme={theme}
      data-header-theme={theme === 'light' ? 'dark' : 'light'}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>{heading}</h2>
        {text && <p className={styles.text}>{text}</p>}
        <ButtonGroup buttons={buttons} />
      </div>
    </section>
  )
}
