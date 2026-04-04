import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/blocks/HeroBlock/config'
import { TextBlock } from '@/blocks/TextBlock/config'
import { MediaGridBlock } from '@/blocks/MediaGridBlock/config'
import { TwoColBlock } from '@/blocks/TwoColBlock/config'
import { ThreeColGridBlock } from '@/blocks/ThreeColGridBlock/config'
import { FullWidthTextBlock } from '@/blocks/FullWidthTextBlock/config'
import { CTABlock } from '@/blocks/CTABlock/config'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'client', 'updatedAt'],
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
      name: 'client',
      type: 'text',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Korte beschrijving voor overzichtspagina',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featuredVideo',
      type: 'text',
      admin: {
        description: 'Bunny.net video URL (optioneel, vervangt afbeelding op hover)',
      },
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'service',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'year',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'Live website URL',
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
        description: 'Optioneel: custom JSON-LD. Laat leeg voor automatisch gegenereerde schema.',
        position: 'sidebar',
      },
    },
  ],
}
