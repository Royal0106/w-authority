import type { ReactNode } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { Reveal } from '~/components/motion/reveal'
import type { FaqItem } from '~/types/content'
import { cn } from '~/lib/cn'

export function FaqAccordion({
  items,
  className,
  defaultOpen,
}: {
  items: Array<FaqItem>
  className?: string
  /** Index of the item expanded on first render. */
  defaultOpen?: number
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen !== undefined ? `faq-${defaultOpen}` : undefined}
      className={cn(
        'overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface',
        className,
      )}
    >
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`faq-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

/**
 * FAQ block with the heading on the left and the accordion on the right —
 * the layout used on the contact, expertise and speaking pages.
 */
export function FaqSplit({
  eyebrow = 'FAQ',
  title,
  description,
  items,
  aside,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: Array<FaqItem>
  aside?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12', className)}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-display-md">{title}</h2>
        {description ? (
          <div className="mt-3 max-w-sm text-sm leading-relaxed text-content-muted">
            {description}
          </div>
        ) : null}
        {aside ? <div className="mt-6">{aside}</div> : null}
      </Reveal>

      <Reveal delay={0.08}>
        <FaqAccordion items={items} />
      </Reveal>
    </div>
  )
}
