import { useEffect, useState } from 'react'
import { cn } from '~/lib/cn'

/**
 * Sticky table of contents that highlights the heading currently in view.
 *
 * Uses an IntersectionObserver rather than scroll maths so it stays cheap and
 * stays correct when images finish loading and shift the layout.
 */
export function TableOfContents({
  headings,
  className,
}: {
  headings: Array<{ id: string; text: string }>
  className?: string
}) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )

    for (const heading of headings) {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-labelledby="toc-heading" className={cn('rounded-[var(--radius-card)] bg-surface-soft p-5', className)}>
      <p
        id="toc-heading"
        className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand"
      >
        Table of Contents
      </p>
      <ol className="mt-4 grid gap-2.5">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          // Headings carry their own numbering ("2. Morning Routine…"). Entries
          // without one — like a closing "Conclusion" — stay unnumbered.
          const label = heading.text
          return (
            <li key={heading.id} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className={cn(
                  'mt-1.5 size-1.5 shrink-0 rounded-full transition-colors',
                  isActive ? 'bg-brand' : 'bg-blush-500/70',
                )}
              />
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'text-xs leading-relaxed transition-colors hover:text-brand',
                  isActive ? 'font-medium text-brand' : 'text-content-muted',
                )}
              >
                {label}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
