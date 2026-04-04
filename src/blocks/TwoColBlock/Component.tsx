'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Media as MediaType } from '@/payload-types'
import { ButtonGroup, type ButtonProps } from '@/components/ui/Button/Button'
import styles from './TwoColBlock.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface TwoColBlockProps {
  heading?: string | null
  subheading?: string | null
  content?: SerializedEditorState | null
  buttons?: ButtonProps[]
  media: MediaType | string
  mediaPosition?: 'left' | 'right'
  mediaRatio?: 'portrait' | 'landscape' | 'square'
  verticalAlign?: 'start' | 'center' | 'end'
}

export default function TwoColBlock({
  heading,
  subheading,
  content,
  buttons,
  media,
  mediaPosition = 'right',
  mediaRatio = 'portrait',
  verticalAlign = 'center',
}: TwoColBlockProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const image = typeof media === 'object' ? media : null

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    const textCol = el.querySelector(`.${styles.textCol}`)
    const mediaCol = el.querySelector(`.${styles.mediaCol}`)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    })

    if (textCol) {
      tl.fromTo(textCol,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'cubic-bezier(0.625, 0.05, 0, 1)' },
        0
      )
    }

    if (mediaCol) {
      tl.fromTo(mediaCol,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'cubic-bezier(0.625, 0.05, 0, 1)' },
        0.15
      )
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-media-position={mediaPosition}
      data-vertical-align={verticalAlign}
      data-header-theme="light"
    >
      <div className={styles.textCol}>
        {subheading && <span className={styles.subheading}>{subheading}</span>}
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        {content && (
          <div className={styles.content}>
            <RichText data={content} />
          </div>
        )}
        <ButtonGroup buttons={buttons} />
      </div>

      <div className={styles.mediaCol}>
        {image?.url && (
          <div className={styles.mediaWrap} data-ratio={mediaRatio}>
            <img
              src={image.url}
              alt={image.alt || ''}
              className={styles.image}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  )
}
