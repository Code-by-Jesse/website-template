'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { Media as MediaType } from '@/payload-types'
import BunnyBackground from '@/components/video/BunnyBackground'
import styles from './HeroBlock.module.scss'

gsap.registerPlugin(useGSAP)

interface HeroBlockProps {
  heading: string
  subheading?: string | null
  backgroundImage?: MediaType | string | null
  backgroundVideo?: string | null
  theme?: 'light' | 'dark'
  fullHeight?: boolean
}

export default function HeroBlock({
  heading,
  subheading,
  backgroundImage,
  backgroundVideo,
  theme = 'dark',
  fullHeight = true,
}: HeroBlockProps) {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = heroRef.current
    if (!el) return

    const heading = el.querySelector(`.${styles.heading}`)
    const sub = el.querySelector(`.${styles.subheading}`)

    const tl = gsap.timeline()

    if (heading) {
      tl.fromTo(heading,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'cubic-bezier(0.625, 0.05, 0, 1)' },
        0.2
      )
    }

    if (sub) {
      tl.fromTo(sub,
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: 'cubic-bezier(0.625, 0.05, 0, 1)' },
        0.4
      )
    }
  }, { scope: heroRef })

  const bgImage = typeof backgroundImage === 'object' ? backgroundImage?.url : null

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${fullHeight ? styles.fullHeight : ''}`}
      data-theme={theme}
      data-header-theme={theme === 'dark' ? 'light' : 'dark'}
    >
      {backgroundVideo && (
        <BunnyBackground
          src={backgroundVideo}
          autoplay
          muted
          lazy={false}
        />
      )}
      {bgImage && !backgroundVideo && (
        <img
          className={styles.backgroundImage}
          src={bgImage}
          alt=""
          loading="eager"
        />
      )}
      <div className={styles.content}>
        <h1 className={styles.heading}>{heading}</h1>
        {subheading && <p className={styles.subheading}>{subheading}</p>}
      </div>
    </section>
  )
}
