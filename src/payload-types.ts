// Dit bestand wordt automatisch gegenereerd door Payload CMS.
// Run: npm run generate:types
//
// Placeholder tot eerste keer genereren:

export interface Media {
  id: string
  alt: string
  url?: string | null
  mimeType?: string | null
  filename?: string | null
  width?: number | null
  height?: number | null
  sizes?: {
    thumbnail?: { url?: string | null } | null
    tablet?: { url?: string | null } | null
    desktop?: { url?: string | null } | null
  }
}
