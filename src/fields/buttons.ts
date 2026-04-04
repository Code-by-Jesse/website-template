import type { ArrayField } from 'payload'

export const buttonsField: ArrayField = {
  name: 'buttons',
  label: 'Buttons',
  type: 'array',
  maxRows: 3,
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
        description: 'Bijv. /contact, /cases of een externe URL',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary (outline)', value: 'secondary' },
        { label: 'Text link', value: 'link' },
      ],
    },
    {
      name: 'newTab',
      label: 'Open in nieuw tabblad',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
