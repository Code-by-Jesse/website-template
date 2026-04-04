import HeroBlock from '@/blocks/HeroBlock/Component'
import TextBlock from '@/blocks/TextBlock/Component'
import MediaGridBlock from '@/blocks/MediaGridBlock/Component'
import TwoColBlock from '@/blocks/TwoColBlock/Component'
import ThreeColGridBlock from '@/blocks/ThreeColGridBlock/Component'
import FullWidthTextBlock from '@/blocks/FullWidthTextBlock/Component'
import CTABlock from '@/blocks/CTABlock/Component'

const blockComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  text: TextBlock,
  'media-grid': MediaGridBlock,
  'two-col': TwoColBlock,
  'three-col-grid': ThreeColGridBlock,
  'full-width-text': FullWidthTextBlock,
  cta: CTABlock,
}

interface RenderBlocksProps {
  blocks: Array<{ blockType: string; [key: string]: any }>
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={i} {...block} />
      })}
    </>
  )
}
