import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ExpertiseCard, StatCard } from '~/components/cards'
import { Carousel, CarouselSlide } from '~/components/common/carousel'
import { Accent, Container, Section, SectionHeader } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem, scaleIn } from '~/components/motion/reveal'
import { SpeakingForm } from '~/components/forms/speaking-form'
import { FaqSplit } from '~/components/sections/faq-section'
import { NewsletterBand } from '~/components/sections/newsletter-band'
import { PageHero, HeroFloatingCard } from '~/components/sections/page-hero'
import { TestimonialCarousel } from '~/components/sections/testimonial-carousel'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { Table, TableBody, TableHead } from '~/components/ui/misc'
import { siteConfig } from '~/config/site'
import {
  audienceTypes,
  keynotes,
  pastEvents,
  speakingFormats,
  speakingStats,
  speakingTopics,
  speakingVideos,
  whyHireMe,
} from '~/data/speaking'
import { speakingFaqs } from '~/data/faqs'
import { speakingTestimonials } from '~/data/testimonials'
import { formatDate } from '~/lib/format'
import { breadcrumbSchema, faqSchema, jsonLd, seo } from '~/lib/seo'

export const Route = createFileRoute('/speaking')({
  head: () => ({
    ...seo({
      title: 'Speaking',
      description:
        'Keynotes and workshops that empower women and organizations to lead with clarity, leverage technology, and achieve extraordinary results.',
      path: '/speaking',
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Speaking', path: '/speaking' },
        ]),
      ),
      jsonLd(faqSchema(speakingFaqs)),
    ],
  }),
  component: SpeakingPage,
})

function SpeakingPage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Speaking' }]}
        title={
          <>
            Inspire. Educate.
            <br />
            Drive <Accent>Real Change.</Accent>
          </>
        }
        description="Keynotes and workshops that empower women and organizations to lead with clarity, leverage technology, and achieve extraordinary results."
        image="hero/speaking"
        imageAlt="Brian Hanson speaking on stage"
        aside={
          <HeroFloatingCard className="lg:w-56">
            <ul className="grid gap-4">
              {speakingStats.map((stat) => (
                <li key={stat.label}>
                  <StatCard stat={stat} variant="inline" />
                </li>
              ))}
            </ul>
          </HeroFloatingCard>
        }
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#booking">
              Book {siteConfig.author.name.split(' ')[0]} to Speak
              <Icon name="arrow-right" className="size-3.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#videos">
              Watch Reel
              <Icon name="presentation" className="size-3.5" />
            </a>
          </Button>
        </div>
      </PageHero>

      <WhyHireSection />
      <TopicsSection />
      <KeynotesSection />
      <FormatsBand />
      <VideosSection />
      <PastEventsSection />
      <TestimonialsSection />
      <FaqBookingSection />
      <NewsletterBand
        title="Get Weekly Insights That Inspire"
        description="Join 100,000+ women getting strategies, insights, and tools every week."
      />
    </>
  )
}

/* -------------------------------------------------------------- Why hire */

function WhyHireSection() {
  return (
    <Section spacing="lg">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_2.15fr] lg:gap-12">
        <Reveal>
          <p className="eyebrow">Why Hire Me</p>
          <h2 className="mt-3 text-display-md">
            More Than a Speaker.
            <br />A Partner in Transformation.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-content-muted">
            I combine real-world business experience, proven frameworks, and powerful storytelling
            to deliver actionable insights that create lasting impact.
          </p>
        </Reveal>

        <RevealGroup
          className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
          staggerChildren={0.07}
        >
          {whyHireMe.map((item, index) => (
            <RevealItem
              key={item.slug}
              className={index < whyHireMe.length - 1 ? 'lg:border-r lg:border-hairline lg:pr-6' : ''}
            >
              <div className="flex flex-col items-center gap-2.5 text-center">
                <Icon name={item.icon} className="size-7 text-brand" strokeWidth={1.3} />
                <h3 className="text-sm font-semibold text-content">{item.title}</h3>
                <p className="text-xs leading-relaxed text-content-muted">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------------- Topics */

function TopicsSection() {
  return (
    <Section spacing="md">
      <SectionHeader
        eyebrow="Speaking Topics"
        title={
          <>
            Topics That Move Minds
            <br />
            and Drive Results
          </>
        }
        action={
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-content transition-colors hover:text-brand"
          >
            View All Topics
            <Icon name="arrow-right" className="size-3" />
          </Link>
        }
      />

      <Reveal className="mt-8 block">
        <Carousel ariaLabel="Speaking topics" itemsPerPage={2}>
          {speakingTopics.map((topic) => (
            <CarouselSlide
              key={topic.slug}
              className="w-[min(80vw,17rem)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <article className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand/40">
                <Img
                  image={topic.image}
                  alt=""
                  sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
                  wrapperClassName="aspect-16/10 w-full"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="grid gap-2 p-4">
                  <span className="flex items-center gap-2">
                    <Icon name={topic.icon} className="size-4 text-brand" />
                    <h3 className="text-sm font-semibold text-content">{topic.title}</h3>
                  </span>
                  <p className="text-xs leading-relaxed text-content-muted">{topic.description}</p>
                </div>
              </article>
            </CarouselSlide>
          ))}
        </Carousel>
      </Reveal>
    </Section>
  )
}

/* -------------------------------------------------------------- Keynotes */

function KeynotesSection() {
  return (
    <Section spacing="md">
      <SectionHeader
        eyebrow="Signature Keynotes"
        title="Talks Audiences Remember"
        titleClassName="sr-only"
        action={
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-content transition-colors hover:text-brand"
          >
            View All Keynotes
            <Icon name="arrow-right" className="size-3" />
          </Link>
        }
      />

      <Reveal className="mt-6 block">
        <Carousel ariaLabel="Signature keynotes" showDots itemsPerPage={2}>
          {keynotes.map((keynote) => (
            <CarouselSlide
              key={keynote.slug}
              className="w-[min(80vw,17rem)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <article className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand/40">
                <Img
                  image={keynote.image}
                  alt=""
                  sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
                  wrapperClassName="aspect-16/10 w-full"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="grid gap-2 p-4">
                  <h3 className="font-display text-base leading-snug text-content">
                    {keynote.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-content-muted">
                    {keynote.description}
                  </p>
                </div>
              </article>
            </CarouselSlide>
          ))}
        </Carousel>
      </Reveal>
    </Section>
  )
}

/* --------------------------------------------------------------- Formats */

function FormatsBand() {
  return (
    <section className="bg-surface-tint py-12 md:py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_2.15fr] lg:items-center lg:gap-12">
          <Reveal>
            <p className="eyebrow">Formats</p>
            <h2 className="mt-3 text-display-md">Engaging. Practical. Transformative.</h2>
          </Reveal>

          <RevealGroup
            className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5"
            staggerChildren={0.06}
          >
            {speakingFormats.map((format) => (
              <RevealItem key={format.title} className="flex items-start gap-2.5">
                <Icon name={format.icon} className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>
                  <span className="block text-xs font-semibold text-content">{format.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-content-muted">
                    {format.description}
                  </span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------------- Videos */

function VideosSection() {
  const [active, setActive] = useState(0)
  const video = speakingVideos[active]!

  return (
    <Section spacing="lg" id="videos">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
        <Reveal>
          <p className="eyebrow">See {siteConfig.author.name.split(' ')[0]} in Action</p>
          <h2 className="mt-3 text-display-md">
            See {siteConfig.author.name.split(' ')[0]} in Action
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-content-muted">
            Watch highlights from keynotes and workshops that inspire audiences and deliver real
            results.
          </p>

          <ul className="mt-6 grid gap-2.5">
            {audienceTypes.map((audience) => (
              <li key={audience} className="flex items-center gap-2.5">
                <Icon name="check" className="size-4 text-brand" strokeWidth={2.4} />
                <span className="text-sm text-content-muted">{audience}</span>
              </li>
            ))}
          </ul>

          <Button asChild className="mt-7">
            <a href="#booking">
              Watch Speaking Reel
              <Icon name="arrow-right" className="size-3.5" />
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.08} variants={scaleIn}>
          <div className="relative overflow-hidden rounded-[var(--radius-card)]">
            <Img image={video.thumbnail} alt={video.title} wrapperClassName="aspect-16/9 w-full" />
            <button
              type="button"
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 grid place-items-center bg-ink-950/25 transition-colors hover:bg-ink-950/35"
            >
              <span className="grid size-14 place-items-center rounded-full bg-brand text-on-brand shadow-float transition-transform duration-300 hover:scale-110">
                <svg viewBox="0 0 24 24" className="size-6 translate-x-0.5" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              </span>
            </button>
            <span className="absolute bottom-3 right-3 rounded-[3px] bg-ink-950/70 px-2 py-1 text-[10px] font-medium text-white">
              {video.duration}
            </span>
          </div>

          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {speakingVideos.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={index === active ? 'true' : undefined}
                  className={
                    index === active
                      ? 'w-full rounded-[var(--radius-card)] border border-brand bg-brand-soft px-3 py-2 text-left text-xs font-medium text-brand-strong'
                      : 'w-full rounded-[var(--radius-card)] border border-hairline px-3 py-2 text-left text-xs text-content-muted transition-colors hover:border-brand/40 hover:text-brand'
                  }
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}

/* ----------------------------------------------------------- Past events */

function PastEventsSection() {
  return (
    <Section tone="soft" spacing="md">
      <SectionHeader
        eyebrow="Past Events"
        title="Where I&rsquo;ve Spoken"
        description="A selection of recent keynotes, summits and executive sessions."
      />
      <Reveal className="mt-8 block">
        <Table>
          <TableHead>
            <tr>
              <th scope="col">Event</th>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
              <th scope="col">Audience</th>
            </tr>
          </TableHead>
          <TableBody>
            {pastEvents.map((event) => (
              <tr key={event.name}>
                <td className="font-medium text-content">{event.name}</td>
                <td>{event.location}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.audience}</td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </Reveal>
    </Section>
  )
}

/* ---------------------------------------------------------- Testimonials */

function TestimonialsSection() {
  return (
    <Section spacing="md">
      <SectionHeader eyebrow="What Organizers Say" title="Booked once. Invited back." />
      <TestimonialCarousel
        testimonials={speakingTestimonials}
        className="mt-8"
        ariaLabel="Event organizer testimonials"
      />
    </Section>
  )
}

/* ----------------------------------------------------------- FAQ + booking */

function FaqBookingSection() {
  return (
    <Section spacing="lg" id="booking">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-display-md">Frequently Asked Questions</h2>
          <FaqSplit
            title=""
            eyebrow=""
            items={speakingFaqs}
            className="mt-6 lg:grid-cols-1"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface-tint p-6 md:p-8">
            <p className="eyebrow">Book {siteConfig.author.name.split(' ')[0]} to Speak</p>
            <h2 className="mt-3 text-display-md">Let&rsquo;s Make Your Event Unforgettable</h2>
            <p className="mt-3 text-sm leading-relaxed text-content-muted">
              Fill out the form below and my team will get back to you within 24 hours.
            </p>
            <SpeakingForm className="mt-6" />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
