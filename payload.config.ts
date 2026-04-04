import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Pages } from '@/collections/Pages'
import { Projects } from '@/collections/Projects'
import { BlogPosts } from '@/collections/BlogPosts'
import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'
import { HeaderGlobal } from '@/globals/Header'
import { FooterGlobal } from '@/globals/Footer'
import { SiteSettings } from '@/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— CMS',
      icons: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      ],
    },
    components: {
      graphics: {
        Logo: '/src/components/admin/Logo',
        Icon: '/src/components/admin/Icon',
      },
      afterNavLinks: ['/src/components/admin/CustomNav'],
      views: {
        dashboard: {
          Component: '/src/components/admin/Dashboard',
        },
      },
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        if (collectionConfig?.slug === 'pages') {
          const slug = data?.slug
          if (slug === 'home') return baseUrl
          return `${baseUrl}/${slug}`
        }

        if (collectionConfig?.slug === 'projects') {
          return `${baseUrl}/cases/${data?.slug}`
        }

        if (collectionConfig?.slug === 'blog-posts') {
          return `${baseUrl}/blog/${data?.slug}`
        }

        return baseUrl
      },
      collections: ['pages', 'projects', 'blog-posts'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1194 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  editor: lexicalEditor(),

  collections: [
    // Algemeen
    Pages,
    Projects,
    Media,
    // Content
    BlogPosts,
    Categories,
    // Beheer
    Users,
  ],

  globals: [
    // Globals
    HeaderGlobal,
    FooterGlobal,
    // Beheer
    SiteSettings,
  ],

  secret: process.env.PAYLOAD_SECRET || 'UNSAFE-DEFAULT-SECRET',

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./data/payload.db',
    },
  }),

  sharp,

  plugins: [
    seoPlugin({
      collections: ['pages', 'projects', 'blog-posts'],
      uploadsCollection: 'media',
    }),
  ],
})
