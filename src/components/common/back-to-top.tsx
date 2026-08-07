import { Icon } from '~/components/ui/icon'
import { useScrolledPast } from '~/hooks/use-scroll-progress'
import { cn } from '~/lib/cn'

/**
 * Appears once the reader is well down a long page. Pages here run to several
 * thousand pixels, so getting back to the navigation is otherwise a chore.
 */
export function BackToTop() {
  const visible = useScrolledPast(1200)

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      }
      aria-label="Back to top"
      // Hidden from the tab order while off-screen so it is not a phantom stop.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full',
        'border border-hairline bg-surface text-content-muted shadow-lift',
        'transition-[opacity,transform,color] duration-300 ease-[var(--ease-premium)]',
        'hover:text-brand focus-visible:text-brand',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <Icon name="arrow-right" className="size-4 -rotate-90" />
    </button>
  )
}
