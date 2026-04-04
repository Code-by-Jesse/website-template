import type { Block } from 'payload'
import { buttonsField } from '@/fields/buttons'

export const TwoColBlock: Block = {
  slug: 'two-col',
  labels: {
    singular: 'Twee kolommen',
    plural: 'Twee kolommen',
  },
  fields: [
    {
      name: 'heading',
      label: 'Titel',
      type: 'text',
    },
    {
      name: 'subheading',
      label: 'Subtitel',
      type: 'text',
    },
    {
      name: 'content',
      label: 'Tekst',
      type: 'richText',
    },
    buttonsField,
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mediaPosition',
      label: 'Afbeelding positie',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Rechts', value: 'right' },
      ],
    },
    {
      name: 'mediaRatio',
      label: 'Afbeelding verhouding',
      type: 'select',
      defaultValue: 'portrait',
      options: [
        { label: 'Portrait (3:4)', value: 'portrait' },
        { label: 'Landscape (4:3)', value: 'landscape' },
        { label: 'Vierkant', value: 'square' },
      ],
    },
    {
      name: 'verticalAlign',
      label: 'Verticale uitlijning',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Boven', value: 'start' },
        { label: 'Midden', value: 'center' },
        { label: 'Onder', value: 'end' },
      ],
    },
  ],
}
