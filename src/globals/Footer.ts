import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Globals' },
  fields: [
    {
      name: 'copyrightName',
      type: 'text',
      required: true,
      admin: {
        description: 'Bijv. Bedrijfsnaam',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Footer links',
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
        },
      ],
    },
    {
      name: 'legalItems',
      type: 'array',
      label: 'Legal links',
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
        },
      ],
    },
  ],
}
