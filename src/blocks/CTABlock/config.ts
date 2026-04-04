import type { Block } from 'payload'
import { buttonsField } from '@/fields/buttons'

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to action',
    plural: 'Call to actions',
  },
  fields: [
    {
      name: 'heading',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      label: 'Beschrijving',
      type: 'textarea',
    },
    buttonsField,
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'accent',
      options: [
        { label: 'Accent', value: 'accent' },
        { label: 'Donker', value: 'dark' },
        { label: 'Licht', value: 'light' },
      ],
    },
  ],
}
