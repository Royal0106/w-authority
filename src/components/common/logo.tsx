import { Link } from '@tanstack/react-router'
import { siteConfig } from '~/config/site'
import { cn } from '~/lib/cn'

export function Logo({
  className,
  size = 'md',
  tone = 'default',
}: {
  className?: string
  size?: 'sm' | 'md'
  tone?: 'default' | 'inverse'
}) {
  const markSize = size === 'sm' ? 'size-9' : 'size-11'
  const nameSize = size === 'sm' ? 'text-[13px]' : 'text-[15px]'

  return (
    <Link
      to="/"
      className={cn('group inline-flex shrink-0 items-center gap-3', className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        className={cn(
          markSize,
          'grid shrink-0 place-items-center rounded-full border transition-colors duration-300',
          tone === 'inverse'
            ? 'border-white/50 text-white'
            : 'border-brand/45 text-brand-strong group-hover:border-brand',
        )}
      >
        <span className="font-display text-[13px] leading-none tracking-wide">
          {siteConfig.shortMark}
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            nameSize,
            'font-semibold uppercase tracking-[0.09em]',
            tone === 'inverse' ? 'text-white' : 'text-content',
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            'mt-1 whitespace-nowrap text-[8.5px] font-semibold uppercase tracking-[0.22em]',
            tone === 'inverse' ? 'text-white/70' : 'text-brand',
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  )
}
