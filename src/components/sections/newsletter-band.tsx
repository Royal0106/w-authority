import { Container } from '~/components/layout/section'
import { NewsletterForm, NewsletterPromises } from '~/components/forms/newsletter-form'
import { Reveal } from '~/components/motion/reveal'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { siteConfig } from '~/config/site'
import { cn } from '~/lib/cn'

/**
 * The blush newsletter strip that closes most pages.
 *
 * `layout="wide"` is the compact single-row band; `layout="feature"` is the
 * taller home-page version with supporting copy and an image.
 */
export function NewsletterBand({
  title = 'Get Weekly Insights That Drive Results',
  description,
  layout = 'wide',
  className,
}: {
  title?: string
  description?: string
  layout?: 'wide' | 'feature'
  className?: string
}) {
  const copy =
    description ??
    `Join ${siteConfig.newsletter.subscribers} women getting actionable strategies, insights, and tools every week.`

  if (layout === 'feature') {
    return (
      <section className={cn('relative overflow-hidden bg-surface-tint', className)}>
        <Container className="grid items-center gap-8 py-12 md:py-14 lg:grid-cols-[1fr_1.1fr_0.7fr]">
          <Reveal>
            <p className="eyebrow">Join the Community</p>
            <h2 className="mt-3 text-display-md">Become Your Best Self</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-content-muted">
              Join {siteConfig.newsletter.subscribers} women who get weekly tips on fitness, style,
              success and more — straight to their inbox.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <NewsletterForm
              placeholder="Enter your email address"
              buttonLabel="Get Free Tips"
              tone="onTint"
            />
            <NewsletterPromises
              items={['No spam', 'Unsubscribe anytime', 'Deals & free resources']}
              className="mt-4"
            />
          </Reveal>

          <Reveal delay={0.16} className="hidden lg:block">
            <Img
              image="misc/newsletter-mug"
              alt=""
              sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
              wrapperClassName="aspect-4/3 w-full rounded-[var(--radius-card)]"
            />
          </Reveal>
        </Container>
      </section>
    )
  }

  return (
    <section className={cn('bg-surface-tint', className)}>
      <Container className="grid items-center gap-6 py-10 md:py-12 lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="hidden size-12 shrink-0 place-items-center rounded-[var(--radius-card)] text-brand sm:grid"
          >
            <Icon name="mail" className="size-8" strokeWidth={1.2} />
          </span>
          <span>
            <h2 className="text-display-md">{title}</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-content-muted">{copy}</p>
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <NewsletterForm tone="onTint" />
          <NewsletterPromises items={siteConfig.newsletter.promises} className="mt-3" />
        </Reveal>
      </Container>
    </section>
  )
}
