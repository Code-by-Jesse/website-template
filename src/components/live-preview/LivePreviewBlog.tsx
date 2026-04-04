'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface LivePreviewBlogProps {
  initialData: any
  serverURL: string
}

export function LivePreviewBlog({ initialData, serverURL }: LivePreviewBlogProps) {
  const { data } = useLivePreview({
    initialData,
    serverURL,
    depth: 2,
  })

  return (
    <article style={{ padding: '8em 2em 4em', maxWidth: '55em', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--font-h1)', lineHeight: 1.1, marginBottom: '0.5em' }}>
        {data.title}
      </h1>

      {data.publishedAt && (
        <time style={{ opacity: 0.5, fontSize: 'var(--font-small)' }}>
          {new Date(data.publishedAt).toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      )}

      {data.content && (
        <div style={{ marginTop: '2em', lineHeight: 1.6 }}>
          <RichText data={data.content} />
        </div>
      )}
    </article>
  )
}
