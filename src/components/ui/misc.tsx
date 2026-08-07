import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'
import { Icon } from './icon'
import { IMAGES, type ImageKey } from '~/data/images.generated'
import { cn } from '~/lib/cn'

/* ---------------------------------------------------------------- Avatar */

export function Avatar({
  image,
  alt,
  className,
  fallback,
  /** Hairline ring — used where avatars overlap photography or each other. */
  ring = false,
}: {
  image?: ImageKey
  alt: string
  className?: string
  fallback?: string
  ring?: boolean
}) {
  const initials =
    fallback ??
    alt
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()

  const meta = image ? IMAGES[image] : undefined

  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative inline-flex size-9 shrink-0 overflow-hidden rounded-full bg-brand-soft',
        ring && 'ring-2 ring-canvas',
        className,
      )}
    >
      {meta ? (
        <AvatarPrimitive.Image
          src={meta.src}
          srcSet={meta.srcSet}
          sizes="96px"
          alt={alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : null}
      <AvatarPrimitive.Fallback
        delayMs={meta ? 200 : 0}
        className="grid size-full place-items-center text-[10px] font-semibold tracking-wide text-brand-strong"
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

/* ------------------------------------------------------------- Separator */

export function Separator({
  className,
  ...props
}: ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        'shrink-0 bg-hairline data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  )
}

/* --------------------------------------------------------------- Tooltip */

export const TooltipProvider = TooltipPrimitive.Provider

export function Tooltip({
  children,
  content,
  side = 'top',
}: {
  children: ReactNode
  content: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={8}
          className="z-50 rounded-[var(--radius-card)] bg-ink-900 px-2.5 py-1.5 text-xs text-white shadow-lift dark:bg-surface dark:text-content dark:border dark:border-hairline"
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-ink-900 dark:fill-[var(--surface-raised)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

/* -------------------------------------------------------------- Skeleton */

export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      className={cn('skeleton-shimmer rounded-[var(--radius-card)] bg-surface-tint', className)}
      {...props}
    />
  )
}

/* ----------------------------------------------------------------- Alert */

const alertVariants = cva(
  'flex gap-3 rounded-[var(--radius-card)] border p-4 text-sm leading-relaxed',
  {
    variants: {
      tone: {
        info: 'border-hairline bg-surface-soft text-content-muted',
        success: 'border-emerald-500/25 bg-emerald-500/8 text-emerald-800 dark:text-emerald-200',
        warning: 'border-amber-500/25 bg-amber-500/8 text-amber-800 dark:text-amber-200',
        danger: 'border-rose-500/25 bg-rose-500/8 text-rose-800 dark:text-rose-200',
      },
    },
    defaultVariants: { tone: 'info' },
  },
)

export function Alert({
  tone,
  title,
  children,
  className,
}: VariantProps<typeof alertVariants> & {
  title?: string
  children?: ReactNode
  className?: string
}) {
  const iconName =
    tone === 'success' ? 'check' : tone === 'danger' ? 'shield-alert' : tone === 'warning' ? 'info' : 'info'
  return (
    <div role="status" className={cn(alertVariants({ tone }), className)}>
      <Icon name={iconName} className="mt-0.5 size-4" />
      <div className="grid gap-1">
        {title ? <p className="font-semibold text-content">{title}</p> : null}
        {children}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- Table */

export function Table({ className, ...props }: ComponentProps<'table'>) {
  return (
    <div className="w-full overflow-x-auto rounded-[var(--radius-card)] border border-hairline">
      <table className={cn('w-full border-collapse text-left text-sm', className)} {...props} />
    </div>
  )
}

export function TableHead({ className, ...props }: ComponentProps<'thead'>) {
  return (
    <thead
      className={cn(
        'bg-surface-soft [&_th]:px-4 [&_th]:py-3 [&_th]:text-[11px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.1em] [&_th]:text-content-muted',
        className,
      )}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      className={cn(
        '[&_td]:border-t [&_td]:border-hairline [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-content-muted',
        className,
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------ StarRating */

export function StarRating({
  value,
  count,
  className,
  size = 'sm',
}: {
  value: number
  count?: number
  className?: string
  size?: 'sm' | 'md'
}) {
  const rounded = Math.round(value * 2) / 2
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span className="sr-only">{`Rated ${value} out of 5`}</span>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rounded >= star
          const half = !filled && rounded >= star - 0.5
          return (
            <Icon
              key={star}
              name="star"
              className={cn(
                size === 'sm' ? 'size-3' : 'size-3.5',
                filled || half ? 'fill-brand text-brand' : 'text-blush-500/70',
                half && 'opacity-60',
              )}
            />
          )
        })}
      </span>
      {typeof count === 'number' ? (
        <span className="text-xs text-content-subtle">({count})</span>
      ) : null}
    </div>
  )
}
