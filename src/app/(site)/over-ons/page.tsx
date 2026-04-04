import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'

async function getPage() {
  const payload = await getPayload({ config })
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'over-ons' } },
    limit: 1,
  })
  return page.docs[0] || null
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage()
  const meta = page?.meta as { title?: string; description?: string; image?: any } | undefined

  return {
    title: meta?.title || page?.title || 'Over ons',
    description: meta?.description || undefined,
    openGraph: meta?.image?.url ? { images: [{ url: meta.image.url }] } : undefined,
  }
}

export default async function OverOnsPage() {
  const pageData = await getPage()

  if (!pageData) {
    return (
      <section style={{ padding: '8em 2em 4em' }}>
        <h1 style={{ fontSize: 'var(--font-h1)' }}>Over ons</h1>
        <p style={{ marginTop: '1em', opacity: 0.6 }}>
          Maak een pagina aan met slug &quot;over-ons&quot; in het CMS.
        </p>
      </section>
    )
  }

  return <RenderBlocks blocks={pageData.layout || []} />
}
