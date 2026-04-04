import type { Block } from 'payload'

export const TextBlock: Block = {
  slug: 'text',
  labels: {
    singular: 'Tekst',
    plural: 'Tekst blokken',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
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
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Smal', value: 'narrow' },
        { label: 'Medium', value: 'medium' },
        { label: 'Breed', value: 'wide' },
      ],
    },
  ],
}
