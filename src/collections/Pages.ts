import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/blocks/HeroBlock/config'
import { TextBlock } from '@/blocks/TextBlock/config'
import { MediaGridBlock } from '@/blocks/MediaGridBlock/config'
import { TwoColBlock } from '@/blocks/TwoColBlock/config'
import { ThreeColGridBlock } from '@/blocks/ThreeColGridBlock/config'
import { FullWidthTextBlock } from '@/blocks/FullWidthTextBlock/config'
import { CTABlock } from '@/blocks/CTABlock/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Algemeen',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, TextBlock, MediaGridBlock, TwoColBlock, ThreeColGridBlock, FullWidthTextBlock, CTABlock],
    },
    {
      name: 'structuredData',
      label: 'Structured Data (JSON-LD)',
      type: 'code',
      admin: {
        language: 'json',
        description: 'Optioneel: custom JSON-LD schema. Laat leeg voor automatisch gegenereerde WebPage schema.',
        position: 'sidebar',
      },
    },
  ],
}
