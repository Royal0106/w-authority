import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ElementType, ReactNode } from 'react'
import { Reveal } from '~/components/motion/reveal'
import { cn } from '~/lib/cn'

/* ------------------------------------------------------------- Container */

export function Container({
  className,
  as: Tag = 'div',
  ...props
}: ComponentProps<'div'> & { as?: ElementType }) {
  return <Tag className={cn('container-site', className)} {...props} />
}

/* --------------------------------------------------------------- Section */

const sectionVariants = cva('relative', {
  variants: {
    tone: {
      canvas: 'bg-canvas',
      soft: 'bg-surface-soft',
      tint: 'bg-surface-tint',
      brand: 'bg-brand text-on-brand',
      none: '',
    },
    spacing: {
      none: '',
      sm: 'py-10 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-20 lg:py-24',
    },
    bordered: {
      true: 'border-t border-hairline',
      false: '',
    },
  },
  defaultVariants: { tone: 'canvas', spacing: 'lg', bordered: false },
})

export type SectionProps = ComponentProps<'section'> &
  VariantProps<typeof sectionVariants> & {
    /** Skips the inner container when a section needs full-bleed children. */
    bleed?: boolean
    containerClassName?: string
  }

export function Section({
  className,
  containerClassName,
  tone,
  spacing,
  bordered,
  bleed = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ tone, spacing, bordered }), className)}
      {...props}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  )
}

/* --------------------------------------------------------- SectionHeader */

export type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** Right-aligned link or button rendered on the same row on desktop. */
  action?: ReactNode
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  as?: 'h1' | 'h2' | 'h3'
  animate?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
  titleClassName,
  as: Heading = 'h2',
  animate = true,
}: SectionHeaderProps) {
  const content = (
    <div
      className={cn(
        'flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <Heading className={cn('text-display-lg', titleClassName)}>{title}</Heading>
        {description ? (
          <div className="mt-3 text-sm leading-relaxed text-content-muted">{description}</div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )

  return animate ? <Reveal>{content}</Reveal> : content
}

/** Pink emphasis used inside display headings, e.g. “Lead <Accent>Powerfully.</Accent>” */
export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('text-brand', className)}>{children}</span>
}

/** Italic serif emphasis, e.g. “Real Women. <Emphasis>Real Results.</Emphasis>” */
export function Emphasis({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('italic', className)}>{children}</span>
}
