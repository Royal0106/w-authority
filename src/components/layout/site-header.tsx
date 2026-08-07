import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { AnnouncementBar } from './announcement-bar'
import { MobileMenu } from './mobile-menu'
import { SiteSearch } from './site-search'
import { Logo } from '~/components/common/logo'
import { ThemeToggle } from '~/components/theme/theme-toggle'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { primaryNav, type NavItem } from '~/config/navigation'
import type { IconName } from '~/types/content'
import { cn } from '~/lib/cn'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div
        className={cn(
          'border-b bg-canvas/92 backdrop-blur-md transition-shadow duration-300',
          scrolled ? 'border-hairline shadow-soft' : 'border-transparent',
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Logo />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center">
              {primaryNav.map((item) => (
                <NavEntry key={item.label} item={item} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <SiteSearch />
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              shape="square"
              className="hidden sm:inline-flex"
            >
              <Link to="/newsletter">Join Community</Link>
            </Button>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

/**
 * A top-level nav item. Items with children open a mega menu on hover and on
 * focus, and close on Escape or blur so keyboard users get the same reach.
 */
function NavEntry({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => cancelClose(), [])

  const linkClass =
    'relative flex h-[72px] items-center px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-content-muted transition-colors duration-200 hover:text-brand'

  if (!item.children) {
    return (
      <li>
        <Link
          to={item.to}
          search={item.search as never}
          className={linkClass}
          activeProps={{ className: 'text-brand' }}
          activeOptions={{ exact: item.to === '/' }}
        >
          {item.label}
        </Link>
      </li>
    )
  }

  return (
    <li
      className="static"
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false)
      }}
    >
      <Link
        to={item.to}
        search={item.search as never}
        className={cn(linkClass, open && 'text-brand')}
        activeProps={{ className: 'text-brand' }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
      </Link>

      <div
        className={cn(
          'absolute inset-x-0 top-full origin-top border-t border-hairline bg-surface shadow-lift transition-[opacity,transform] duration-200 ease-[var(--ease-premium)]',
          open
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none -translate-y-1 opacity-0',
        )}
        hidden={!open}
      >
        <div className="container-site grid gap-8 py-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-4">{item.label}</p>
            <ul className="grid gap-1 sm:grid-cols-2">
              {item.children.map((child) => (
                <li key={child.label}>
                  <Link
                    to={child.to}
                    search={child.search as never}
                    onClick={() => setOpen(false)}
                    className="group flex items-start gap-3 rounded-[var(--radius-card)] p-3 transition-colors hover:bg-surface-soft"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-strong">
                      <Icon name={child.icon as IconName} className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-content group-hover:text-brand">
                        {child.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-content-muted">
                        {child.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {item.featured ? (
            <Link
              to={item.featured.to}
              onClick={() => setOpen(false)}
              className="group grid gap-4 rounded-[var(--radius-card)] border border-hairline bg-surface-soft p-4 transition-colors hover:border-brand/40 sm:grid-cols-[9rem_1fr]"
            >
              <Img
                image={item.featured.image}
                alt=""
                sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
                wrapperClassName="aspect-4/3 rounded-[var(--radius-card)]"
              />
              <span>
                <span className="eyebrow">{item.featured.eyebrow}</span>
                <span className="mt-2 block font-display text-base leading-snug text-content group-hover:text-brand">
                  {item.featured.title}
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-content-muted">
                  {item.featured.description}
                </span>
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </li>
  )
}
