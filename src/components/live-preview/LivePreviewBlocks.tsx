'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { RenderBlocks } from '@/blocks/RenderBlocks'

interface LivePreviewBlocksProps {
  initialData: {
    layout?: Array<{ blockType: string; [key: string]: any }>
    [key: string]: any
  }
  serverURL: string
}

export function LivePreviewBlocks({ initialData, serverURL }: LivePreviewBlocksProps) {
  const { data } = useLivePreview({
    initialData,
    serverURL,
    depth: 2,
  })

  return <RenderBlocks blocks={data.layout || []} />
}
