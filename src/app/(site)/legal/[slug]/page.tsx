import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = result.docs[0]
  const meta = page?.meta as { title?: string; description?: string; image?: any } | undefined

  return {
    title: meta?.title || page?.title || 'Legal',
    description: meta?.description || undefined,
  }
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout || []} />
}
