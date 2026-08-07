import { createFileRoute } from '@tanstack/react-router'
import { Accent, Section, SectionHeader } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem } from '~/components/motion/reveal'
import { BookingForm } from '~/components/forms/booking-form'
import { FaqSplit } from '~/components/sections/faq-section'
import { PageHero, HeroFloatingCard } from '~/components/sections/page-hero'
import { TestimonialCarousel } from '~/components/sections/testimonial-carousel'
import { Badge } from '~/components/ui/badge'
import { Icon } from '~/components/ui/icon'
import { sessionTypes, whoItsFor } from '~/data/booking'
import { bookingFaqs } from '~/data/faqs'
import { bookingTestimonials } from '~/data/testimonials'
import { breadcrumbSchema, faqSchema, jsonLd, seo } from '~/lib/seo'
import { cn } from '~/lib/cn'

export const Route = createFileRoute('/booking')({
  head: () => ({
    ...seo({
      title: 'Book a Session',
      description:
        'Book a clarity call, strategy session or team workshop. Real preparation, a written plan, and follow-up you can act on.',
      path: '/booking',
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Book a Session', path: '/booking' },
        ]),
      ),
      jsonLd(faqSchema(bookingFaqs)),
    ],
  }),
  component: BookingPage,
})

function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Session"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Book a Session' }]}
        title={
          <>
            Bring a Problem.
            <br />
            Leave With a <Accent>Plan.</Accent>
          </>
        }
        description="Every session starts before we meet. You send context, I do the reading, and we spend the whole time on the work rather than the background."
        image="hero/booking"
        imageAlt="A one-to-one strategy session in progress"
        aside={
          <HeroFloatingCard className="lg:w-52">
            <p className="eyebrow">This Month</p>
            <p className="mt-3 font-display text-3xl text-brand">9</p>
            <p className="mt-1 text-xs leading-relaxed text-content-muted">
              session slots remaining in June.
            </p>
          </HeroFloatingCard>
        }
      />

      <SessionTypesSection />
      <WhoItsForSection />
      <CalendarSection />
      <TestimonialsSection />
      <Section spacing="lg">
        <FaqSplit
          title="Before You Book"
          description="The practical details, up front."
          items={bookingFaqs}
        />
      </Section>
    </>
  )
}

function SessionTypesSection() {
  return (
    <Section spacing="lg">
      <SectionHeader
        eyebrow="Session Types"
        title="Three Ways to Work Together"
        description="Pick the shape that matches the size of the problem. If you are unsure, start with the Clarity Call."
      />

      <RevealGroup className="mt-8 grid gap-5 lg:grid-cols-3" staggerChildren={0.08}>
        {sessionTypes.map((session) => (
          <RevealItem key={session.slug} className="h-full">
            <article
              className={cn(
                'flex h-full flex-col rounded-[var(--radius-card)] border p-6 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-lift',
                session.popular
                  ? 'border-brand bg-surface-tint'
                  : 'border-hairline bg-surface hover:border-brand/40',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <Icon name={session.icon} className="size-7 text-brand" strokeWidth={1.3} />
                {session.popular ? <Badge variant="brand">Most booked</Badge> : null}
              </div>

              <h3 className="mt-4 font-display text-xl">{session.name}</h3>
              <p className="mt-1 text-xs text-content-subtle">{session.duration}</p>
              <p className="mt-3 text-sm leading-relaxed text-content-muted">
                {session.description}
              </p>

              <ul className="mt-5 grid gap-2">
                {session.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon name="check" className="mt-0.5 size-3.5 shrink-0 text-brand" strokeWidth={2.4} />
                    <span className="text-xs leading-relaxed text-content-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-6 font-display text-2xl text-content">{session.price}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function WhoItsForSection() {
  return (
    <Section tone="soft" spacing="md">
      <SectionHeader eyebrow="Who It's For" title="You'll Get the Most From This If…" />
      <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2" staggerChildren={0.07}>
        {whoItsFor.map((item) => (
          <RevealItem key={item.title} className="flex items-start gap-3">
            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.4} />
            <div>
              <h3 className="text-sm font-semibold text-content">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-content-muted">
                {item.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function CalendarSection() {
  return (
    <Section spacing="lg" id="calendar">
      <SectionHeader
        eyebrow="Pick a Time"
        title="Choose a Date That Works"
        description="Times shown are Central. Everything is confirmed by email within one business day."
      />
      <Reveal className="mt-8 block">
        <BookingForm />
      </Reveal>
    </Section>
  )
}

function TestimonialsSection() {
  return (
    <Section tone="soft" spacing="md">
      <SectionHeader eyebrow="After the Session" title="What People Take Away" />
      <TestimonialCarousel
        testimonials={bookingTestimonials}
        className="mt-8"
        ariaLabel="Session testimonials"
      />
    </Section>
  )
}
