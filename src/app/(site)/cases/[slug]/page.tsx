import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewBlocks } from '@/components/live-preview/LivePreviewBlocks'
import StructuredData, { buildWebPageSchema } from '@/components/seo/StructuredData'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const project = result.docs[0]
  const meta = project?.meta as { title?: string; description?: string; image?: any } | undefined

  return {
    title: meta?.title || project?.title || 'Case',
    description: meta?.description || project?.excerpt || undefined,
    openGraph: meta?.image?.url ? { images: [{ url: meta.image.url }] } : undefined,
  }
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { isEnabled: isDraft } = await draftMode()

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: isDraft,
  })

  const project = result.docs[0]
  if (!project) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const meta = project.meta as { title?: string; description?: string; image?: any } | undefined

  const structuredData = (
    <StructuredData
      customJsonLd={project.structuredData as string | undefined}
      autoSchema={buildWebPageSchema({
        title: meta?.title || project.title,
        description: meta?.description || project.excerpt || undefined,
        url: `${baseUrl}/cases/${project.slug}`,
        image: meta?.image?.url,
      })}
    />
  )

  if (isDraft) {
    return (
      <>
        {structuredData}
        <LivePreviewBlocks initialData={project} serverURL={baseUrl} />
      </>
    )
  }

  return (
    <>
      {structuredData}
      <RenderBlocks blocks={project.layout || []} />
    </>
  )
}
