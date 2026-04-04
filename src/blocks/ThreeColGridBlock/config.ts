import type { Block } from 'payload'
import { buttonsField } from '@/fields/buttons'

export const ThreeColGridBlock: Block = {
  slug: 'three-col-grid',
  labels: {
    singular: 'Drie kolommen grid',
    plural: 'Drie kolommen grids',
  },
  fields: [
    {
      name: 'heading',
      label: 'Sectie titel',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'href',
          label: 'Link',
          type: 'text',
          admin: {
            description: 'Optioneel: maakt het item klikbaar',
          },
        },
      ],
    },
    buttonsField,
  ],
}
