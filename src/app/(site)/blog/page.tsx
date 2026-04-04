import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { Media as MediaType } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
  })

  return (
    <section style={{ padding: '8em 2em 4em' }}>
      <h1 style={{ fontSize: 'var(--font-h1)', lineHeight: 1.05, marginBottom: '1em' }}>
        Blog
      </h1>

      <div>
        {posts.docs.map((post) => {
          const image = post.featuredImage as MediaType | undefined
          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ display: 'block', marginBottom: '2em' }}
            >
              {image?.url && (
                <img
                  src={image.url}
                  alt={image.alt || post.title}
                  loading="lazy"
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                />
              )}
              <h2 style={{ fontSize: 'var(--font-h3)', marginTop: '0.5em' }}>
                {post.title}
              </h2>
              {post.excerpt && <p style={{ opacity: 0.6, marginTop: '0.25em' }}>{post.excerpt}</p>}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
