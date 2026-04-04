import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import '@/styles/globals.scss'
import GSAPProvider from '@/components/animations/GSAPProvider'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import PageTransition from '@/components/layout/PageTransition/PageTransition'
import type { Media as MediaType } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })

  let siteName = 'Klantnaam'
  let siteDescription = ''
  let faviconUrl: string | null = null
  let webiconUrl: string | null = null
  let ogImageUrl: string | null = null

  try {
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    siteName = (settings.siteName as string) || siteName
    siteDescription = (settings.siteDescription as string) || ''
    const favicon = settings.favicon as MediaType | undefined
    const webicon = settings.webicon as MediaType | undefined
    const ogImage = settings.ogImage as MediaType | undefined
    faviconUrl = favicon?.url || null
    webiconUrl = webicon?.url || null
    ogImageUrl = ogImage?.url || null
  } catch {}

  const icons: Metadata['icons'] = {}
  if (faviconUrl) icons.icon = faviconUrl
  if (webiconUrl) {
    icons.apple = { url: webiconUrl, sizes: '512x512' }
    if (!faviconUrl) icons.icon = webiconUrl
  }

  return {
    title: {
      template: `%s — ${siteName}`,
      default: siteName,
    },
    description: siteDescription || undefined,
    icons: (faviconUrl || webiconUrl) ? icons : undefined,
    openGraph: {
      siteName,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
    manifest: webiconUrl ? '/manifest.json' : undefined,
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })

  let headerData: { logoText?: string | null; logoUrl?: string | null; navItems?: any[] } = {}
  let footerData: { copyrightName?: string | null; navItems?: any[]; legalItems?: any[] } = {}

  try {
    const header = await payload.findGlobal({ slug: 'header' })
    const logo = header.logo as MediaType | undefined
    headerData = {
      logoText: header.logoText,
      logoUrl: logo?.url || null,
      navItems: header.navItems as any[],
    }
  } catch {}

  try {
    const footer = await payload.findGlobal({ slug: 'footer' })
    footerData = {
      copyrightName: footer.copyrightName,
      navItems: footer.navItems as any[],
      legalItems: footer.legalItems as any[],
    }
  } catch {}

  return (
    <html lang="nl">
      <body>
        <GSAPProvider>
          <Header
            logoText={headerData.logoText}
            logoUrl={headerData.logoUrl}
            navItems={headerData.navItems}
          />
          <PageTransition>
            <main>{children}</main>
            <Footer
              copyrightName={footerData.copyrightName}
              navItems={footerData.navItems}
              legalItems={footerData.legalItems}
            />
          </PageTransition>
        </GSAPProvider>
      </body>
    </html>
  )
}
