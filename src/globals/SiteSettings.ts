import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site instellingen',
  admin: { group: 'Beheer' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Algemeen',
          fields: [
            {
              name: 'siteName',
              label: 'Website naam',
              type: 'text',
              required: true,
            },
            {
              name: 'siteDescription',
              label: 'Standaard meta beschrijving',
              type: 'textarea',
              admin: {
                description: 'Wordt gebruikt als fallback wanneer een pagina geen eigen beschrijving heeft',
              },
            },
          ],
        },
        {
          label: 'Favicon & OG',
          fields: [
            {
              name: 'favicon',
              label: 'Favicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Bij voorkeur 32x32 PNG of SVG',
              },
            },
            {
              name: 'webicon',
              label: 'Webicon (512x512)',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'PNG 512x512 — wordt gebruikt voor PWA, Apple touch icon en app iconen',
              },
            },
            {
              name: 'ogImage',
              label: 'Standaard OG afbeelding',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Wordt getoond bij het delen op social media (1200x630 aanbevolen)',
              },
            },
          ],
        },
        {
          label: 'Scripts',
          fields: [
            {
              name: 'headScripts',
              label: 'Scripts in <head>',
              type: 'code',
              admin: {
                language: 'html',
                description: 'Bijv. Google Analytics, Google Tag Manager',
              },
            },
            {
              name: 'bodyScripts',
              label: 'Scripts voor </body>',
              type: 'code',
              admin: {
                language: 'html',
                description: 'Bijv. chat widgets, tracking pixels',
              },
            },
          ],
        },
      ],
    },
  ],
}
