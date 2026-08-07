import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Container } from '~/components/layout/section'
import { Reveal } from '~/components/motion/reveal'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Img, type ImageKey } from '~/components/ui/image'
import type { AppPath } from '~/config/navigation'
import type { IconName } from '~/types/content'
import { cn } from '~/lib/cn'

/**
 * Closing call-to-action card: image on the left, message and a single primary
 * action on the right. Used on the legal, article and utility pages.
 */
export function CtaCard({
  icon = 'message-circle',
  title,
  description,
  actionLabel,
  actionTo,
  image = 'misc/legal-cta',
  className,
}: {
  icon?: IconName
  title: ReactNode
  description: ReactNode
  actionLabel: string
  actionTo: AppPath
  image?: ImageKey
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'grid overflow-hidden rounded-[var(--radius-card)] bg-surface-tint md:grid-cols-[0.5fr_1fr]',
        className,
      )}
    >
      <Img image={image} alt="" wrapperClassName="aspect-16/9 w-full md:aspect-auto md:h-full" />
      <div className="flex flex-col items-start gap-3 p-8 md:flex-row md:items-center md:gap-6 md:p-10">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-brand">
          <Icon name={icon} className="size-5" />
        </span>
        <div className="flex-1">
          <h2 className="text-display-md">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-content-muted">{description}</p>
          <Button asChild className="mt-5">
            <Link to={actionTo}>
              {actionLabel}
              <Icon name="arrow-right" className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </Reveal>
  )
}

/**
 * Full-bleed closing CTA with a portrait, headline, supporting options and a
 * primary action — the “Let's Work Together” pattern from the about page.
 */
export function CtaFeature({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
  image,
  options,
  className,
}: {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  actionLabel: string
  actionTo: AppPath
  image: ImageKey
  options?: Array<{ title: string; icon: IconName }>
  className?: string
}) {
  return (
    <section className={cn('bg-surface-tint', className)}>
      <Container className="grid items-end gap-8 pt-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-12 lg:pt-0">
        <Reveal className="hidden lg:block">
          <Img
            image={image}
            alt=""
            sizes="(min-width: 1024px) 260px, 90vw"
            wrapperClassName="aspect-3/4 w-full max-w-64 rounded-t-[var(--radius-card)]"
            objectPosition="center 20%"
          />
        </Reveal>

        <Reveal delay={0.08} className="pb-12 lg:py-16">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 text-display-lg">{title}</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-content-muted">{description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-6">
            <Button asChild>
              <Link to={actionTo}>
                {actionLabel}
                <Icon name="arrow-right" className="size-3.5" />
              </Link>
            </Button>

            {options?.map((option) => (
              <div key={option.title} className="flex flex-col items-center gap-1.5 text-center">
                <Icon name={option.icon} className="size-5 text-brand" />
                <span className="max-w-24 text-[11px] font-medium leading-tight text-content">
                  {option.title}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
