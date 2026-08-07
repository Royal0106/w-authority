import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '~/lib/cn'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-semibold leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        brand: 'bg-brand text-on-brand',
        soft: 'bg-brand-soft text-brand-strong',
        outline: 'border border-hairline text-content-muted',
        ghost: 'text-brand',
        neutral: 'bg-surface-soft text-content-muted',
      },
      size: {
        sm: 'h-5 px-2 text-[10px] tracking-[0.1em] uppercase',
        md: 'h-7 px-3 text-[11px] tracking-[0.1em] uppercase',
      },
      shape: {
        square: 'rounded-[3px]',
        pill: 'rounded-pill',
      },
    },
    defaultVariants: { variant: 'soft', size: 'sm', shape: 'square' },
  },
)

export type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>

export function Badge({ className, variant, size, shape, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    />
  )
}
