import type { Block } from 'payload'

export const FullWidthTextBlock: Block = {
  slug: 'full-width-text',
  labels: {
    singular: 'Volledige breedte tekst',
    plural: 'Volledige breedte teksten',
  },
  fields: [
    {
      name: 'text',
      label: 'Tekst',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Grote paragraaf tekst — wordt woord voor woord ingeanimeerd bij scrollen',
      },
    },
    {
      name: 'size',
      label: 'Tekstgrootte',
      type: 'select',
      defaultValue: 'large',
      options: [
        { label: 'Medium', value: 'medium' },
        { label: 'Groot', value: 'large' },
        { label: 'Extra groot', value: 'xlarge' },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Midden', value: 'center' },
      ],
    },
  ],
}
