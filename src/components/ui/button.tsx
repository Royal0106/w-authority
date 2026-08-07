import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '~/lib/cn'

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-semibold uppercase tracking-[0.08em]',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-premium)]',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:translate-y-px',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-on-brand shadow-[0_10px_24px_-14px_var(--brand-base)] hover:bg-brand-strong',
        outline:
          'border border-hairline bg-surface text-content hover:border-brand hover:text-brand',
        soft: 'bg-brand-soft text-brand-strong hover:bg-brand hover:text-on-brand',
        ghost: 'text-content hover:bg-surface-soft hover:text-brand',
        link: 'text-brand underline-offset-4 hover:underline px-0 tracking-normal normal-case',
        inverse:
          'bg-surface text-content hover:bg-blush-100 dark:hover:bg-surface-soft',
      },
      size: {
        sm: 'h-9 px-4 text-[10px]',
        md: 'h-11 px-6 text-[11px]',
        lg: 'h-12 px-8 text-xs',
        icon: 'size-10 p-0',
      },
      shape: {
        square: 'rounded-[var(--radius-card)]',
        pill: 'rounded-pill',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md', shape: 'square' },
  },
)

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Render as the single child element (e.g. a router `Link`). */
    asChild?: boolean
  }

export function Button({
  className,
  variant,
  size,
  shape,
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      type={asChild ? undefined : (type ?? 'button')}
      className={cn(buttonVariants({ variant, size, shape }), className)}
      {...props}
    />
  )
}
