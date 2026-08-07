import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon } from '~/components/ui/icon'
import { cn } from '~/lib/cn'

/**
 * Scroll-snap carousel.
 *
 * Deliberately CSS-driven: the track is a native scroller so touch, trackpad
 * and keyboard all work without a JS gesture layer. The arrows and dots just
 * drive `scrollTo`.
 */
export function Carousel({
  children,
  className,
  trackClassName,
  ariaLabel,
  showArrows = true,
  showDots = false,
  /** Number of slides scrolled per arrow press. */
  itemsPerPage = 1,
}: {
  children: ReactNode
  className?: string
  trackClassName?: string
  ariaLabel: string
  showArrows?: boolean
  showDots?: boolean
  itemsPerPage?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ atStart: true, atEnd: false, page: 0, pages: 1 })

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const pageWidth = el.clientWidth || 1
    setState({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
      page: Math.round(el.scrollLeft / pageWidth),
      pages: Math.max(1, Math.ceil(el.scrollWidth / pageWidth)),
    })
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [measure])

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + 24 : el.clientWidth
    el.scrollBy({ left: direction * step * itemsPerPage, behavior: 'smooth' })
  }

  const scrollToPage = (page: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: page * el.clientWidth, behavior: 'smooth' })
  }

  const arrowClass =
    'grid size-9 place-items-center rounded-full border border-hairline bg-surface text-content-muted shadow-soft transition-colors duration-200 hover:border-brand hover:text-brand disabled:opacity-35 disabled:pointer-events-none'

  return (
    <div className={cn('relative', className)}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          'scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-1',
          trackClassName,
        )}
      >
        {children}
      </div>

      {showArrows ? (
        <>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={state.atStart}
            aria-label="Previous slide"
            className={cn(arrowClass, 'absolute -left-3 top-1/2 -translate-y-1/2 lg:-left-5')}
          >
            <Icon name="arrow-right" className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={state.atEnd}
            aria-label="Next slide"
            className={cn(arrowClass, 'absolute -right-3 top-1/2 -translate-y-1/2 lg:-right-5')}
          >
            <Icon name="arrow-right" className="size-4" />
          </button>
        </>
      ) : null}

      {showDots && state.pages > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: state.pages }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToPage(index)}
              aria-label={`Go to slide group ${index + 1}`}
              aria-current={state.page === index ? 'true' : undefined}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                state.page === index ? 'w-5 bg-brand' : 'w-1.5 bg-blush-500/60 hover:bg-brand/60',
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

/**
 * Fixed-width slide that snaps to the start of the track.
 *
 * `relative` is load-bearing: absolutely positioned descendants (including
 * Tailwind's `sr-only`) would otherwise resolve against the carousel root
 * outside the scroller and stretch the page's scroll width.
 */
export function CarouselSlide({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('relative snap-start shrink-0', className)}>{children}</div>
}
