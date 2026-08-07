import { Link, createFileRoute } from '@tanstack/react-router'
import {
  CaseStudyCard,
  ExpertiseCard,
  StatCard,
  TopicImageCard,
} from '~/components/cards'
import { Carousel, CarouselSlide } from '~/components/common/carousel'
import { Accent, Container, Section, SectionHeader } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem, scaleIn } from '~/components/motion/reveal'
import { FaqSplit } from '~/components/sections/faq-section'
import { NewsletterBand } from '~/components/sections/newsletter-band'
import { PageHero, HeroFloatingCard } from '~/components/sections/page-hero'
import { TestimonialCarousel } from '~/components/sections/testimonial-carousel'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { Avatar } from '~/components/ui/misc'
import {
  caseStudies,
  expertiseAreas,
  expertiseStats,
  featuredTopics,
  industries,
  processSteps,
} from '~/data/expertise'
import { expertiseFaqs } from '~/data/faqs'
import { expertiseTestimonials, featuredTestimonial } from '~/data/testimonials'
import { breadcrumbSchema, faqSchema, jsonLd, seo } from '~/lib/seo'

export const Route = createFileRoute('/expertise')({
  head: () => ({
    ...seo({
      title: 'Expertise',
      description:
        'Strategy, systems and technology that help women and organizations achieve extraordinary results — AI, leadership, marketing, growth, productivity and personal branding.',
      path: '/expertise',
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Expertise', path: '/expertise' },
        ]),
      ),
      jsonLd(faqSchema(expertiseFaqs)),
    ],
  }),
  component: ExpertisePage,
})

function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="My Expertise"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Expertise' }]}
        title={
          <>
            Strategy. Systems.
            <br />
            <Accent>Results</Accent> That Last.
          </>
        }
        description="I help women and organizations leverage strategy, systems, and technology to achieve extraordinary results and build a life and business with freedom, impact, and purpose."
        image="hero/expertise"
        imageAlt="Brian Hanson working at a desk"
        aside={
          <HeroFloatingCard className="lg:w-52">
            <ul className="grid gap-4">
              {expertiseStats.map((stat) => (
                <li key={stat.label}>
                  <StatCard stat={stat} variant="inline" />
                </li>
              ))}
            </ul>
          </HeroFloatingCard>
        }
      >
        <Button asChild size="lg" className="mt-7">
          <Link to="/contact">
            Work With Me
            <Icon name="arrow-right" className="size-3.5" />
          </Link>
        </Button>
      </PageHero>

      <ExpertiseGrid />
      <FeaturedTopics />
      <ProcessSection />
      <CaseStudiesSection />
      <IndustriesSection />
      <ImpactSection />
      <FaqCtaSection />
      <NewsletterBand
        title="Get Weekly Insights"
        description="Join 100,000+ women getting weekly strategies, insights, and tools to grow and lead."
      />
    </>
  )
}

/* --------------------------------------------------------- Expertise grid */

function ExpertiseGrid() {
  return (
    <Section spacing="lg">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_2.15fr] lg:gap-12">
        <Reveal>
          <p className="eyebrow">Areas of Expertise</p>
          <h2 className="mt-3 text-display-md">
            Where Strategy Meets{' '}
            <em className="not-italic text-brand">Real-World</em> Impact
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-content-muted">
            I combine strategic thinking with practical systems and emerging technology to help you
            grow, lead, and win in every area of life.
          </p>
        </Reveal>

        <RevealGroup
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          staggerChildren={0.06}
        >
          {expertiseAreas.map((area) => (
            <RevealItem key={area.slug} className="h-full">
              <ExpertiseCard expertise={area} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

/* --------------------------------------------------------- Featured topics */

function FeaturedTopics() {
  return (
    <Section spacing="md">
      <SectionHeader
        eyebrow="Featured Topics"
        title={
          <>
            Topics I Help Clients <em className="not-italic text-brand">Master</em>
          </>
        }
        action={
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-content transition-colors hover:text-brand"
          >
            View All Topics
            <Icon name="arrow-right" className="size-3" />
          </Link>
        }
      />

      <RevealGroup
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        staggerChildren={0.06}
      >
        {featuredTopics.map((topic) => (
          <RevealItem key={topic.slug} className="h-full">
            <TopicImageCard topic={topic} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/* --------------------------------------------------------------- Process */

function ProcessSection() {
  return (
    <Section spacing="md" bordered>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr] lg:gap-12">
        <Reveal>
          <p className="eyebrow">My Process</p>
          <h2 className="mt-3 text-display-md">
            A Proven Process.
            <br />
            <em className="not-italic text-brand">Real Results.</em>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-content-muted">
            A clear, step-by-step approach designed to unlock clarity, build systems, and create
            measurable success.
          </p>
          <Button asChild className="mt-6">
            <Link to="/contact">
              Work With Me
              <Icon name="arrow-right" className="size-3.5" />
            </Link>
          </Button>
        </Reveal>

        <RevealGroup
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
          staggerChildren={0.08}
        >
          {processSteps.map((step, index) => (
            <RevealItem key={step.step} className="relative text-center">
              {index < processSteps.length - 1 ? (
                <Icon
                  name="arrow-right"
                  className="absolute -right-4 top-6 hidden size-4 text-blush-500 lg:block"
                />
              ) : null}
              <span className="mx-auto grid size-14 place-items-center rounded-full border border-hairline text-brand">
                <Icon name={step.icon} className="size-6" strokeWidth={1.3} />
              </span>
              <p className="mt-4 font-display text-sm text-brand">{step.step}</p>
              <h3 className="mt-1 text-sm font-semibold text-content">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-content-muted">{step.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

/* ----------------------------------------------------------- Case studies */

function CaseStudiesSection() {
  return (
    <Section spacing="md">
      <SectionHeader
        eyebrow="Results &amp; Case Studies"
        title={
          <>
            Real Women. <em>Real Results.</em>
          </>
        }
        action={
          <Link
            to="/expertise"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-content transition-colors hover:text-brand"
          >
            View All Case Studies
            <Icon name="arrow-right" className="size-3" />
          </Link>
        }
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-[2.4fr_1fr]">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" staggerChildren={0.07}>
          {caseStudies.map((study) => (
            <RevealItem key={study.slug} className="h-full">
              <CaseStudyCard caseStudy={study} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.12}>
          <figure className="flex h-full flex-col justify-center gap-4 rounded-[var(--radius-card)] bg-surface-tint p-6">
            <Icon name="message-circle" className="size-6 text-brand" />
            <blockquote className="text-sm leading-relaxed text-content">
              “{featuredTestimonial.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-2.5">
              <Avatar
                image={featuredTestimonial.avatar}
                alt={featuredTestimonial.name}
                className="size-8"
              />
              <span>
                <span className="block text-xs font-semibold text-content">
                  {featuredTestimonial.name}
                </span>
                <span className="block text-xs text-content-subtle">
                  {featuredTestimonial.title}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ Industries */

function IndustriesSection() {
  return (
    <Section spacing="sm" bordered>
      <Reveal>
        <p className="eyebrow">Industries I Serve</p>
      </Reveal>

      <RevealGroup
        className="mt-7 grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:grid-cols-8"
        staggerChildren={0.05}
      >
        {industries.map((industry) => (
          <RevealItem key={industry.name} className="flex flex-col items-center gap-2 text-center">
            <Icon name={industry.icon} className="size-6 text-brand" strokeWidth={1.3} />
            <span className="text-xs text-content-muted">{industry.name}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/* ---------------------------------------------------------------- Impact */

function ImpactSection() {
  return (
    <section className="relative overflow-hidden bg-surface-soft py-14 md:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.7fr_2.3fr] lg:items-center lg:gap-12">
          <Reveal>
            <p className="eyebrow">The Impact</p>
            <h2 className="mt-3 text-display-md">Numbers That Speak</h2>
            <p className="mt-3 text-sm leading-relaxed text-content-muted">
              Real feedback from real women who achieved real transformation.
            </p>
          </Reveal>

          <TestimonialCarousel
            testimonials={expertiseTestimonials}
            ariaLabel="Client results"
            variant="default"
          />
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------- FAQ + CTA */

function FaqCtaSection() {
  return (
    <Section spacing="lg">
      <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr_1fr] lg:gap-10">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-display-md">Common Questions</h2>
          <p className="mt-3 text-sm leading-relaxed text-content-muted">
            Answers to the questions women ask most.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-content transition-colors hover:text-brand"
          >
            View All FAQs
            <Icon name="arrow-right" className="size-3" />
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <FaqSplit
            title=""
            items={expertiseFaqs}
            className="lg:grid-cols-1"
            eyebrow=""
          />
        </Reveal>

        <Reveal delay={0.16} variants={scaleIn} className="relative block overflow-hidden rounded-[var(--radius-card)]">
          <Img
            image="about/cta"
            alt=""
            sizes="(min-width: 1024px) 22vw, 100vw"
            wrapperClassName="absolute inset-0 size-full"
            objectPosition="center 20%"
          />
          {/* Scrim carries the text contrast, so the photo can be any crop. */}
          <div className="relative flex h-full min-h-64 flex-col justify-end bg-linear-to-t from-ink-950/85 via-ink-950/45 to-ink-950/5 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
              Ready to Get Started?
            </p>
            <h3 className="mt-2 font-display text-xl leading-snug text-white">
              Let&rsquo;s Build Something Extraordinary Together
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/80">
              Whether you need strategic guidance, AI implementation, or expert support, I&rsquo;m
              here to help you win.
            </p>
            <Button asChild variant="inverse" size="sm" className="mt-4 self-start">
              <Link to="/booking">
                Book a Strategy Call
                <Icon name="arrow-right" className="size-3" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
