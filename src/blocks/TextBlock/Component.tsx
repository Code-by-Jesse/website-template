import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import styles from './TextBlock.module.scss'

interface TextBlockProps {
  heading?: string | null
  content: SerializedEditorState
  alignment?: 'left' | 'center'
  maxWidth?: 'narrow' | 'medium' | 'wide'
}

export default function TextBlock({
  heading,
  content,
  alignment = 'left',
  maxWidth = 'medium',
}: TextBlockProps) {
  return (
    <section
      className={styles.section}
      data-align={alignment}
      data-width={maxWidth}
      data-header-theme="light"
    >
      <div className={styles.container}>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        <div className={styles.content}>
          <RichText data={content} />
        </div>
      </div>
    </section>
  )
}
