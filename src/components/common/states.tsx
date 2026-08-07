import type { ReactNode } from 'react'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Icon } from '~/components/ui/icon'
import { Skeleton } from '~/components/ui/misc'
import type { IconName } from '~/types/content'
import { cn } from '~/lib/cn'

export function EmptyState({
  icon = 'search',
  title,
  description,
  action,
  className,
}: {
  icon?: IconName
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <Card
      variant="soft"
      padding="lg"
      className={cn('flex flex-col items-center gap-3 text-center', className)}
    >
      <span className="grid size-12 place-items-center rounded-full bg-surface text-brand">
        <Icon name={icon} />
      </span>
      <h3 className="font-display text-lg">{title}</h3>
      {description ? (
        <p className="max-w-sm text-sm leading-relaxed text-content-muted">{description}</p>
      ) : null}
      {action}
    </Card>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We hit an unexpected error. Try again, and if it keeps happening let us know.',
  onRetry,
  className,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <Card
      variant="outline"
      padding="lg"
      className={cn('flex flex-col items-center gap-3 text-center', className)}
      role="alert"
    >
      <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand-strong">
        <Icon name="shield-alert" />
      </span>
      <h3 className="font-display text-lg">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-content-muted">{description}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" shape="pill" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </Card>
  )
}

/** Matches the shape of `<ArticleCard />` so lists don't jump while loading. */
export function ArticleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-hairline">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="grid gap-3 p-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/5" />
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
    </div>
  )
}

export function ArticleListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  )
}
