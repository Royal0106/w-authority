import type { RefObject } from 'react'
import { useScrollProgress } from '~/hooks/use-scroll-progress'

/**
 * Thin bar pinned under the header showing how far through the article the
 * reader is. Long-form pages otherwise give no sense of remaining length.
 */
export function ReadingProgress({ target }: { target: RefObject<HTMLElement | null> }) {
  const progress = useScrollProgress(target)

  return (
    <div
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 bg-transparent"
    >
      <div
        className="h-full origin-left bg-brand transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
