import { Icon } from '~/components/ui/icon'
import { cn } from '~/lib/cn'

/**
 * Build a compact page list: always show first/last and a window around the
 * current page, collapsing the rest into ellipses.
 */
export function paginationRange(current: number, total: number, siblings = 1) {
  const range: Array<number | 'ellipsis'> = []
  const left = Math.max(2, current - siblings)
  const right = Math.min(total - 1, current + siblings)

  range.push(1)
  if (left > 2) range.push('ellipsis')
  for (let page = left; page <= right; page++) range.push(page)
  if (right < total - 1) range.push('ellipsis')
  if (total > 1) range.push(total)

  return range
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}) {
  if (totalPages <= 1) return null
  const pages = paginationRange(page, totalPages)

  const buttonBase =
    'grid size-9 place-items-center rounded-[var(--radius-card)] border text-xs font-medium transition-colors duration-200'

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          buttonBase,
          'border-hairline text-content-muted hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-40',
        )}
      >
        <Icon name="arrow-right" className="size-3.5 rotate-180" />
      </button>

      {pages.map((entry, index) =>
        entry === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="grid size-9 place-items-center text-xs text-content-subtle"
          >
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            onClick={() => onPageChange(entry)}
            aria-current={entry === page ? 'page' : undefined}
            aria-label={`Page ${entry}`}
            className={cn(
              buttonBase,
              entry === page
                ? 'border-brand bg-brand text-on-brand'
                : 'border-hairline text-content-muted hover:border-brand hover:text-brand',
            )}
          >
            {entry}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          buttonBase,
          'border-hairline text-content-muted hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-40',
        )}
      >
        <Icon name="arrow-right" className="size-3.5" />
      </button>
    </nav>
  )
}
