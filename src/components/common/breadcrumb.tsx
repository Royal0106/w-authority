import { Link } from '@tanstack/react-router'
import { Fragment } from 'react'
import { cn } from '~/lib/cn'
import type { AppPath } from '~/config/navigation'

export type Crumb = {
  label: string
  to?: AppPath
  params?: Record<string, string>
  search?: Record<string, string>
}

export function Breadcrumb({
  items,
  className,
}: {
  items: Array<Crumb>
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-xs', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li>
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    params={item.params as never}
                    search={item.search as never}
                    className="text-content-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-content' : 'text-content-muted'}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden="true" className="text-content-subtle">
                  ›
                </li>
              ) : null}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
