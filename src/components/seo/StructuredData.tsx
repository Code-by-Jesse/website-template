interface StructuredDataProps {
  customJsonLd?: string | null
  autoSchema?: Record<string, any>
}

export default function StructuredData({ customJsonLd, autoSchema }: StructuredDataProps) {
  let jsonLd: Record<string, any> | null = null

  if (customJsonLd) {
    try {
      jsonLd = JSON.parse(customJsonLd)
    } catch {}
  } else if (autoSchema) {
    jsonLd = autoSchema
  }

  if (!jsonLd) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Auto-genereer WebPage schema
export function buildWebPageSchema({
  title,
  description,
  url,
  image,
}: {
  title: string
  description?: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    ...(description && { description }),
    url,
    ...(image && { image }),
  }
}

// Auto-genereer Article schema (voor blog)
export function buildArticleSchema({
  title,
  description,
  url,
  image,
  publishedAt,
  authorName,
}: {
  title: string
  description?: string
  url: string
  image?: string
  publishedAt?: string
  authorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    ...(description && { description }),
    url,
    ...(image && { image }),
    ...(publishedAt && { datePublished: publishedAt }),
    ...(authorName && { author: { '@type': 'Person', name: authorName } }),
  }
}
