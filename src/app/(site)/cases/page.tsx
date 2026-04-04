import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { Media as MediaType } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Cases',
}

export default async function CasesPage() {
  const payload = await getPayload({ config })

  const projects = await payload.find({
    collection: 'projects',
    sort: '-createdAt',
  })

  return (
    <section style={{ padding: '8em 2em 4em' }}>
      <h1 style={{ fontSize: 'var(--font-h1)', lineHeight: 1.05, marginBottom: '1em' }}>
        Cases
      </h1>

      <div>
        {projects.docs.map((project) => {
          const image = project.featuredImage as MediaType | undefined
          return (
            <Link
              key={project.id}
              href={`/cases/${project.slug}`}
              style={{ display: 'block', marginBottom: '2em' }}
            >
              {image?.url && (
                <img
                  src={image.url}
                  alt={image.alt || project.title}
                  loading="lazy"
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                />
              )}
              <h2 style={{ fontSize: 'var(--font-h3)', marginTop: '0.5em' }}>
                {project.title}
              </h2>
              {project.excerpt && <p style={{ opacity: 0.6, marginTop: '0.25em' }}>{project.excerpt}</p>}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
