'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Media as MediaType } from '@/payload-types'
import { ButtonGroup, type ButtonProps } from '@/components/ui/Button/Button'
import styles from './ThreeColGridBlock.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface GridItem {
  media: MediaType | string
  title: string
  description?: string | null
  href?: string | null
}

interface ThreeColGridBlockProps {
  heading?: string | null
  items: GridItem[]
  buttons?: ButtonProps[]
}

export default function ThreeColGridBlock({ heading, items, buttons }: ThreeColGridBlockProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    const cards = el.querySelectorAll(`.${styles.card}`)

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'cubic-bezier(0.625, 0.05, 0, 1)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
          delay: (i % 3) * 0.1,
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section} data-header-theme="light">
      {heading && <h2 className={styles.heading}>{heading}</h2>}

      <div className={styles.grid}>
        {items?.map((item, i) => {
          const image = typeof item.media === 'object' ? item.media : null
          const Tag = item.href ? Link : 'div'
          const linkProps = item.href ? { href: item.href } : {}

          return (
            <Tag key={i} className={styles.card} {...(linkProps as any)}>
              {image?.url && (
                <div className={styles.imageWrap}>
                  <img
                    src={image.url}
                    alt={image.alt || item.title}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className={styles.title}>{item.title}</h3>
              {item.description && <p className={styles.description}>{item.description}</p>}
            </Tag>
          )
        })}
      </div>

      <ButtonGroup buttons={buttons} />
    </section>
  )
}
