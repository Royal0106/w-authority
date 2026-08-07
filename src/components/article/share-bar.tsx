import { useState } from 'react'
import { toast } from 'sonner'
import { Icon } from '~/components/ui/icon'
import { Tooltip } from '~/components/ui/misc'
import { siteConfig } from '~/config/site'
import { cn } from '~/lib/cn'

/** Share row under the article header — network links, copy link and save. */
export function ShareBar({
  title,
  path,
  className,
}: {
  title: string
  path: string
  className?: string
}) {
  const [saved, setSaved] = useState(false)
  const url = `${siteConfig.url}${path}`

  const targets = [
    {
      label: 'Share on Facebook',
      icon: 'facebook' as const,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: 'Share on X',
      icon: 'x' as const,
      href: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: 'Share on LinkedIn',
      icon: 'linkedin' as const,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ]

  const buttonClass =
    'grid size-9 place-items-center rounded-full border border-hairline text-content-muted transition-colors duration-200 hover:border-brand hover:text-brand'

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Could not copy the link')
    }
  }

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <p className="text-[10px] font-medium text-content-subtle">Share this article</p>
      <div className="flex items-center gap-2">
        {targets.map((target) => (
          <Tooltip key={target.label} content={target.label}>
            <a
              href={target.href}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonClass}
              aria-label={target.label}
            >
              <Icon name={target.icon} className="size-4" />
            </a>
          </Tooltip>
        ))}

        <Tooltip content="Copy link">
          <button type="button" onClick={copyLink} className={buttonClass} aria-label="Copy link">
            <Icon name="globe" className="size-4" />
          </button>
        </Tooltip>

        <Tooltip content={saved ? 'Saved' : 'Save for later'}>
          <button
            type="button"
            onClick={() => {
              setSaved((value) => !value)
              toast.success(saved ? 'Removed from saved' : 'Saved for later')
            }}
            aria-pressed={saved}
            aria-label={saved ? 'Remove from saved' : 'Save for later'}
            className={cn(buttonClass, saved && 'border-brand bg-brand text-on-brand hover:text-on-brand')}
          >
            <Icon name="bookmark" className="size-4" />
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
