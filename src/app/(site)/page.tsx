import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import config from '@payload-config'
import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewBlocks } from '@/components/live-preview/LivePreviewBlocks'
import StructuredData, { buildWebPageSchema } from '@/components/seo/StructuredData'

async function getHomePage() {
  const payload = await getPayload({ config })
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  return page.docs[0] || null
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()
  const meta = page?.meta as { title?: string; description?: string; image?: any } | undefined

  return {
    title: meta?.title || page?.title || 'Home',
    description: meta?.description || undefined,
    openGraph: meta?.image?.url ? { images: [{ url: meta.image.url }] } : undefined,
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { isEnabled: isDraft } = await draftMode()

  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    draft: isDraft,
  })

  const pageData = page.docs[0]

  if (!pageData) {
    return (
      <section style={{ padding: '10em 2em', textAlign: 'center' }}>
        <h1>Welkom</h1>
        <p>Maak een pagina aan met slug &quot;home&quot; in het CMS.</p>
      </section>
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const meta = pageData.meta as { title?: string; description?: string; image?: any } | undefined

  const structuredData = (
    <StructuredData
      customJsonLd={pageData.structuredData as string | undefined}
      autoSchema={buildWebPageSchema({
        title: meta?.title || pageData.title,
        description: meta?.description,
        url: baseUrl,
        image: meta?.image?.url,
      })}
    />
  )

  if (isDraft) {
    return (
      <>
        {structuredData}
        <LivePreviewBlocks
          initialData={pageData}
          serverURL={baseUrl}
        />
      </>
    )
  }

  return (
    <>
      {structuredData}
      <RenderBlocks blocks={pageData.layout || []} />
    </>
  )
}
