import type { Media as MediaType } from '@/payload-types'
import styles from './MediaGridBlock.module.scss'

interface MediaGridBlockProps {
  items: Array<{
    media: MediaType | string
    aspectRatio?: 'wide' | 'square' | 'portrait'
  }>
}

export default function MediaGridBlock({ items }: MediaGridBlockProps) {
  return (
    <section className={styles.section} data-header-theme="dark">
      <div className={styles.grid}>
        {items?.map((item, i) => {
          const media = typeof item.media === 'object' ? item.media : null
          if (!media?.url) return null

          return (
            <div
              key={i}
              className={styles.item}
              data-ratio={item.aspectRatio || 'wide'}
            >
              {media.mimeType?.startsWith('video/') ? (
                <video
                  className={styles.media}
                  src={media.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  className={styles.media}
                  src={media.url}
                  alt={media.alt || ''}
                  loading="lazy"
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
