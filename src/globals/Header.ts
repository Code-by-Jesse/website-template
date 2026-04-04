import type { GlobalConfig } from 'payload'

export const HeaderGlobal: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: { group: 'Globals' },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Logo afbeelding (bij voorkeur SVG)',
      },
    },
    {
      name: 'logoText',
      type: 'text',
      admin: {
        description: 'Fallback tekst als er geen logo is',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigatie items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: {
            description: 'Bijv. /cases, /over-ons, /contact',
          },
        },
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Markeer als CTA button',
          },
        },
      ],
    },
  ],
}
