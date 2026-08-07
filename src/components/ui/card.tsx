import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '~/lib/cn'

export const cardVariants = cva(
  'rounded-[var(--radius-card)] transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)]',
  {
    variants: {
      variant: {
        outline: 'border border-hairline bg-surface',
        soft: 'border border-hairline/70 bg-surface-soft',
        tint: 'border border-transparent bg-surface-tint',
        plain: 'bg-transparent',
      },
      interactive: {
        true: 'hover:border-brand/40 hover:shadow-lift hover:-translate-y-0.5',
        false: '',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: { variant: 'outline', interactive: false, padding: 'none' },
  },
)

export type CardProps = ComponentProps<'div'> & VariantProps<typeof cardVariants>

export function Card({ className, variant, interactive, padding, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, interactive, padding }), className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('grid gap-1.5', className)} {...props} />
}

export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      className={cn('font-display text-lg leading-snug text-content', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cn('text-sm leading-relaxed text-content-muted', className)} {...props} />
  )
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex items-center gap-3', className)} {...props} />
}
