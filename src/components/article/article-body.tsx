import { Img } from '~/components/ui/image'
import type { ArticleBlock } from '~/types/content'

/**
 * Renders the structured article body.
 *
 * Blocks are data rather than raw HTML, so headings can be given stable ids
 * for the table of contents and images keep their reserved space.
 */
export function ArticleBody({ blocks }: { blocks: Array<ArticleBlock> }) {
  return (
    <div className="prose-authority">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={block.id} id={block.id} className="scroll-mt-32">
                {block.text}
              </h2>
            )
          case 'paragraph':
            return <p key={index}>{block.text}</p>
          case 'list':
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case 'quote':
            return (
              <blockquote key={index}>
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-6 font-display text-3xl leading-none text-brand"
                >
                  “
                </span>
                {block.text}
                <cite>— {block.attribution}</cite>
              </blockquote>
            )
          case 'image':
            return (
              <figure key={index}>
                <Img
                  image={block.image}
                  alt={block.alt}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  wrapperClassName="aspect-16/9 w-full rounded-[var(--radius-card)]"
                />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
