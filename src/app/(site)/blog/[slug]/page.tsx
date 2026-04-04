import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { LivePreviewBlog } from '@/components/live-preview/LivePreviewBlog'
import StructuredData, { buildArticleSchema } from '@/components/seo/StructuredData'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const post = result.docs[0]
  const meta = post?.meta as { title?: string; description?: string; image?: any } | undefined

  return {
    title: meta?.title || post?.title || 'Blog',
    description: meta?.description || post?.excerpt || undefined,
    openGraph: meta?.image?.url ? { images: [{ url: meta.image.url }] } : undefined,
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { isEnabled: isDraft } = await draftMode()

  const result = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: isDraft,
  })

  const post = result.docs[0]
  if (!post) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const meta = post.meta as { title?: string; description?: string; image?: any } | undefined

  const structuredData = (
    <StructuredData
      customJsonLd={post.structuredData as string | undefined}
      autoSchema={buildArticleSchema({
        title: meta?.title || post.title,
        description: meta?.description || post.excerpt || undefined,
        url: `${baseUrl}/blog/${post.slug}`,
        image: meta?.image?.url,
        publishedAt: post.publishedAt || undefined,
      })}
    />
  )

  if (isDraft) {
    return (
      <>
        {structuredData}
        <LivePreviewBlog initialData={post} serverURL={baseUrl} />
      </>
    )
  }

  return (
    <>
      {structuredData}
      <article style={{ padding: '8em 2em 4em', maxWidth: '55em', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-h1)', lineHeight: 1.1, marginBottom: '0.5em' }}>
          {post.title}
        </h1>

        {post.publishedAt && (
          <time style={{ opacity: 0.5, fontSize: 'var(--font-small)' }}>
            {new Date(post.publishedAt).toLocaleDateString('nl-NL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}

        {post.content && (
          <div style={{ marginTop: '2em', lineHeight: 1.6 }}>
            <RichText data={post.content} />
          </div>
        )}
      </article>
    </>
  )
}
