import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Logo } from '~/components/common/logo'
import { SocialLinks } from '~/components/common/social-links'
import { Button } from '~/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer'
import { Icon } from '~/components/ui/icon'
import { primaryNav, utilityNav, type NavItem } from '~/config/navigation'
import { siteConfig } from '~/config/site'
import type { IconName } from '~/types/content'
import { cn } from '~/lib/cn'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const close = () => setOpen(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-9 place-items-center rounded-full text-content transition-colors hover:bg-surface-soft hover:text-brand xl:hidden"
        >
          <svg
            viewBox="0 0 20 20"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M3 6h14M3 10h14M3 14h9" />
          </svg>
        </button>
      </DrawerTrigger>

      <DrawerContent title="Site navigation" className="overflow-y-auto">
        <div className="border-b border-hairline px-5 py-4">
          <Logo size="sm" />
        </div>

        <nav aria-label="Mobile" className="flex-1 px-3 py-4">
          <ul className="grid gap-0.5">
            {primaryNav.map((item) => (
              <MobileNavEntry
                key={item.label}
                item={item}
                expanded={expanded === item.label}
                onToggle={() =>
                  setExpanded((current) => (current === item.label ? null : item.label))
                }
                onNavigate={close}
              />
            ))}
          </ul>

          <div className="mt-6 border-t border-hairline pt-4">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-content-subtle">
              More
            </p>
            <ul className="grid gap-0.5">
              {utilityNav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={close}
                    className="block rounded-[var(--radius-card)] px-3 py-2.5 text-sm text-content-muted transition-colors hover:bg-surface-soft hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/speaking"
                  onClick={close}
                  className="block rounded-[var(--radius-card)] px-3 py-2.5 text-sm text-content-muted transition-colors hover:bg-surface-soft hover:text-brand"
                >
                  Speaking
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  onClick={close}
                  className="block rounded-[var(--radius-card)] px-3 py-2.5 text-sm text-content-muted transition-colors hover:bg-surface-soft hover:text-brand"
                >
                  Book a Session
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="border-t border-hairline px-5 py-5">
          <Button asChild className="w-full">
            <Link to="/newsletter" onClick={close}>
              Join Community
            </Link>
          </Button>
          <div className="mt-4 flex items-center justify-between">
            <SocialLinks size="sm" />
            <a
              href={`mailto:${siteConfig.contact.generalEmail}`}
              className="text-xs text-content-muted transition-colors hover:text-brand"
            >
              {siteConfig.contact.generalEmail}
            </a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function MobileNavEntry({
  item,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem
  expanded: boolean
  onToggle: () => void
  onNavigate: () => void
}) {
  if (!item.children) {
    return (
      <li>
        <Link
          to={item.to}
          search={item.search as never}
          onClick={onNavigate}
          className="block rounded-[var(--radius-card)] px-3 py-2.5 text-sm font-medium text-content transition-colors hover:bg-surface-soft hover:text-brand"
          activeProps={{ className: 'text-brand' }}
          activeOptions={{ exact: item.to === '/' }}
        >
          {item.label}
        </Link>
      </li>
    )
  }

  const panelId = `mobile-panel-${item.label.toLowerCase()}`

  return (
    <li>
      <div className="flex items-center">
        <Link
          to={item.to}
          search={item.search as never}
          onClick={onNavigate}
          className="flex-1 rounded-[var(--radius-card)] px-3 py-2.5 text-sm font-medium text-content transition-colors hover:bg-surface-soft hover:text-brand"
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label} menu`}
          className="grid size-9 place-items-center rounded-full text-content-muted transition-colors hover:bg-surface-soft hover:text-brand"
        >
          <Icon
            name="arrow-right"
            className={cn('size-3.5 transition-transform duration-300', expanded ? '-rotate-90' : 'rotate-90')}
          />
        </button>
      </div>

      {expanded ? (
        <ul id={panelId} className="mb-2 ml-3 grid gap-0.5 border-l border-hairline pl-3">
          {item.children.map((child) => (
            <li key={child.label}>
              <Link
                to={child.to}
                search={child.search as never}
                onClick={onNavigate}
                className="flex items-center gap-2.5 rounded-[var(--radius-card)] px-3 py-2 text-sm text-content-muted transition-colors hover:bg-surface-soft hover:text-brand"
              >
                <Icon name={child.icon as IconName} className="size-4 text-brand" />
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}
