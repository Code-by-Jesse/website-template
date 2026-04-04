import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const payload = await getPayload({ config })

  let siteName = 'Klantnaam'
  let webiconUrl: string | null = null

  try {
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    siteName = (settings.siteName as string) || siteName
    const webicon = settings.webicon as { url?: string } | undefined
    webiconUrl = webicon?.url || null
  } catch {}

  return {
    name: siteName,
    short_name: siteName,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: webiconUrl
      ? [
          { src: webiconUrl, sizes: '512x512', type: 'image/png' },
          { src: webiconUrl, sizes: '192x192', type: 'image/png' },
        ]
      : [],
  }
}
