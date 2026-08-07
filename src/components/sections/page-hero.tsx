import type { ReactNode } from 'react'
import { Breadcrumb, type Crumb } from '~/components/common/breadcrumb'
import { Container } from '~/components/layout/section'
import { Img, type ImageKey } from '~/components/ui/image'
import { Reveal, fadeUp, scaleIn } from '~/components/motion/reveal'
import { cn } from '~/lib/cn'

/**
 * The split hero used at the top of every page: breadcrumb, eyebrow, display
 * heading and supporting content on the left; a portrait image bleeding to the
 * right edge, with an optional floating card layered over it.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  imageAlt = '',
  children,
  aside,
  className,
  contentClassName,
  align = 'center',
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  breadcrumbs?: Array<Crumb>
  image: ImageKey
  imageAlt?: string
  /** Rendered under the description — buttons, trust signals, a search field. */
  children?: ReactNode
  /** Floating card layered over the image (stats, a pull quote). */
  aside?: ReactNode
  className?: string
  contentClassName?: string
  align?: 'start' | 'center'
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-linear-to-br from-blush-100 via-blush-50 to-blush-200 dark:from-surface-soft dark:via-canvas dark:to-surface-tint',
        className,
      )}
    >
      <Container className="relative">
        <div
          className={cn(
            'grid gap-8 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:py-0',
            align === 'center' ? 'lg:items-center' : 'lg:items-start',
          )}
        >
          <div className={cn('lg:py-16', contentClassName)}>
            {breadcrumbs ? (
              <Reveal>
                <Breadcrumb items={breadcrumbs} className="mb-6" />
              </Reveal>
            ) : null}
            <Reveal delay={0.05}>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 text-display-2xl">{title}</h1>
            </Reveal>
            {description ? (
              <Reveal delay={0.16}>
                <div className="mt-5 max-w-lg text-sm leading-relaxed text-content-muted md:text-[15px]">
                  {description}
                </div>
              </Reveal>
            ) : null}
            {children ? (
              <Reveal delay={0.22} variants={fadeUp}>
                {children}
              </Reveal>
            ) : null}
          </div>

          <div className="relative bleed-right">
            <Reveal variants={scaleIn} className="block">
              <Img
                image={image}
                alt={imageAlt}
                priority
                overlay="blend"
                sizes="(min-width: 1024px) 55vw, 100vw"
                wrapperClassName="aspect-4/3 w-full rounded-[var(--radius-card)] lg:aspect-auto lg:h-[clamp(26rem,44vw,34rem)] lg:rounded-none"
                objectPosition="center 22%"
              />
            </Reveal>
            {aside ? (
              <Reveal delay={0.3} variants={scaleIn} className="hidden lg:block">
                {aside}
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>

      {aside ? <div className="lg:hidden">{aside}</div> : null}
    </section>
  )
}

/** White card that floats over the hero image (stats, quotes). */
export function HeroFloatingCard({
  children,
  className,
  position = 'right',
}: {
  children: ReactNode
  className?: string
  position?: 'right' | 'bottom-right'
}) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] border border-hairline bg-surface p-5 shadow-float',
        'lg:absolute lg:z-10',
        position === 'right'
          ? 'lg:right-6 lg:top-1/2 lg:w-56 lg:-translate-y-1/2'
          : 'lg:bottom-8 lg:right-6 lg:w-48',
        'mx-5 mb-8 lg:mx-0 lg:mb-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
