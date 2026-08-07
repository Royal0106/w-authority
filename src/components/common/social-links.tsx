import { Icon } from '~/components/ui/icon'
import { siteConfig } from '~/config/site'
import type { IconName } from '~/types/content'
import { cn } from '~/lib/cn'

export function SocialLinks({
  className,
  iconClassName,
  size = 'md',
}: {
  className?: string
  iconClassName?: string
  size?: 'sm' | 'md'
}) {
  return (
    <ul className={cn('flex items-center gap-4', className)}>
      {siteConfig.social.profiles.map((profile) => (
        <li key={profile.name}>
          <a
            href={profile.href}
            target="_blank"
            rel="noreferrer noopener"
            className="block text-content-muted transition-colors duration-200 hover:text-brand"
          >
            <span className="sr-only">{`${profile.name} — opens in a new tab`}</span>
            <Icon
              name={profile.icon as IconName}
              className={cn(size === 'sm' ? 'size-4' : 'size-[18px]', iconClassName)}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
