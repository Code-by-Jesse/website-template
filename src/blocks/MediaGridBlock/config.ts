import type { Block } from 'payload'

export const MediaGridBlock: Block = {
  slug: 'media-grid',
  labels: {
    singular: 'Media Grid',
    plural: 'Media Grids',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'aspectRatio',
          type: 'select',
          defaultValue: 'wide',
          options: [
            { label: 'Wide (16:9)', value: 'wide' },
            { label: 'Vierkant (1:1)', value: 'square' },
            { label: 'Portrait (2:3)', value: 'portrait' },
          ],
        },
      ],
    },
  ],
}
