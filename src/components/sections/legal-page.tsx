import { Breadcrumb } from '~/components/common/breadcrumb'
import { Container, Section } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem, scaleIn } from '~/components/motion/reveal'
import { CtaCard } from '~/components/sections/cta-band'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { siteConfig } from '~/config/site'
import { formatLongDate } from '~/lib/format'
import type { LegalSection } from '~/types/content'

/**
 * Shared layout for Terms and Privacy: a split hero, numbered sections with
 * an icon plate, and a closing contact CTA.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  ctaTitle,
  ctaDescription,
}: {
  eyebrow: string
  title: string
  intro: string
  sections: Array<LegalSection>
  ctaTitle: string
  ctaDescription: string
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-blush-100 via-blush-50 to-blush-200 dark:from-surface-soft dark:via-canvas dark:to-surface-tint">
        <Container>
          <div className="grid items-center gap-8 py-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-0">
            <div className="lg:py-14">
              <Reveal>
                <Breadcrumb
                  className="mb-6"
                  items={[{ label: 'Home', to: '/' }, { label: 'Legal' }, { label: title }]}
                />
              </Reveal>
              <Reveal delay={0.05}>
                <p className="eyebrow">{eyebrow}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-4 text-display-xl">{title}</h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-content-muted">{intro}</p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-6 flex items-center gap-2 text-xs text-content-muted">
                  <span className="grid size-6 place-items-center rounded-full border border-brand/40 text-brand">
                    <Icon name="clock" className="size-3" />
                  </span>
                  Last Updated: {formatLongDate(siteConfig.legal.lastUpdated)}
                </p>
              </Reveal>
            </div>

            <div className="relative bleed-right">
              <Reveal variants={scaleIn} className="block">
                <Img
                  image="hero/legal"
                  alt=""
                  priority
                  overlay="blend"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  wrapperClassName="aspect-16/9 w-full rounded-[var(--radius-card)] lg:aspect-auto lg:h-[clamp(16rem,26vw,20rem)] lg:rounded-none"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <Section spacing="lg">
        <RevealGroup as="ol" className="grid" staggerChildren={0.05}>
          {sections.map((section) => (
            <RevealItem
              key={section.number}
              as="li"
              className="grid gap-5 border-b border-hairline py-8 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[5rem_1fr_2.2fr] md:items-start md:gap-8"
            >
              <span className="grid size-20 shrink-0 place-items-center rounded-[var(--radius-card)] border border-hairline text-brand">
                <Icon name={section.icon} className="size-7" strokeWidth={1.2} />
              </span>

              <h2 className="flex items-baseline gap-3 pt-1 md:pt-6">
                <span className="font-display text-sm text-brand">{section.number}.</span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-content">
                  {section.title}
                </span>
              </h2>

              <div className="grid gap-3 text-sm leading-relaxed text-content-muted md:pt-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.bullets ? (
                  <ul className="mt-1 grid gap-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.contact ? <ContactDetails /> : null}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Container className="pb-16">
        <CtaCard
          title={ctaTitle}
          description={ctaDescription}
          actionLabel="Contact Us"
          actionTo="/contact"
        />
      </Container>
    </>
  )
}

function ContactDetails() {
  const { contact } = siteConfig

  return (
    <ul className="mt-1 grid gap-2.5">
      <li className="flex items-start gap-2.5">
        <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-brand" />
        <span>
          <strong className="font-semibold text-content">Email:</strong>{' '}
          <a href={`mailto:${contact.generalEmail}`} className="hover:text-brand">
            {contact.generalEmail}
          </a>
        </span>
      </li>
      <li className="flex items-start gap-2.5">
        <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-brand" />
        <span>
          <strong className="font-semibold text-content">Address:</strong> {contact.fullAddress}
        </span>
      </li>
      <li className="flex items-start gap-2.5">
        <Icon name="globe" className="mt-0.5 size-4 shrink-0 text-brand" />
        <span>
          <strong className="font-semibold text-content">Website:</strong> {contact.website}
        </span>
      </li>
    </ul>
  )
}
