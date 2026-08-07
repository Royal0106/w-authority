import { Link } from '@tanstack/react-router'
import { SocialLinks } from '~/components/common/social-links'
import { Icon } from '~/components/ui/icon'
import { utilityNav } from '~/config/navigation'
import { siteConfig } from '~/config/site'

/**
 * Slim promo strip above the navbar. Hidden below `lg` where the space is
 * better spent on the primary navigation.
 */
export function AnnouncementBar() {
  const { announcement } = siteConfig

  return (
    <div className="hidden border-b border-hairline bg-surface-soft lg:block">
      <div className="container-site flex h-9 items-center justify-between gap-6 text-[11px]">
        <Link
          to="/blog/$slug"
          params={{ slug: announcement.articleSlug }}
          className="group inline-flex min-w-0 items-center gap-2 text-content-muted transition-colors hover:text-brand"
        >
          <Icon name="sparkles" className="size-3.5 text-brand" />
          <span className="font-semibold text-brand">{announcement.label}:</span>
          <span className="truncate group-hover:underline">{announcement.text}</span>
        </Link>

        <div className="flex shrink-0 items-center gap-5">
          <nav aria-label="Secondary">
            <ul className="flex items-center gap-5">
              {utilityNav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-content-muted transition-colors hover:text-brand"
                    activeProps={{ className: 'text-brand' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden="true" className="h-3 w-px bg-hairline" />
          <SocialLinks size="sm" className="gap-3.5" />
        </div>
      </div>
    </div>
  )
}
