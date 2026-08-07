import { Link, createFileRoute } from '@tanstack/react-router'
import { ExpertiseTile, StatCard, TestimonialCard } from '~/components/cards'
import { Accent, Container, Section, SectionHeader } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem, scaleIn } from '~/components/motion/reveal'
import { CtaFeature } from '~/components/sections/cta-band'
import { FaqSplit } from '~/components/sections/faq-section'
import { TestimonialCarousel } from '~/components/sections/testimonial-carousel'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { Avatar } from '~/components/ui/misc'
import { siteConfig } from '~/config/site'
import {
  achievements,
  featuredIn,
  missionPillars,
  timeline,
  values,
  workTogetherOptions,
} from '~/data/about'
import { aboutStats, impactStats } from '~/data/expertise'
import { aboutFaqs } from '~/data/faqs'
import { aboutFeaturedTestimonial, aboutTestimonials } from '~/data/testimonials'
import { breadcrumbSchema, faqSchema, jsonLd, personSchema, seo } from '~/lib/seo'

export const Route = createFileRoute('/about')({
  head: () => ({
    ...seo({
      title: 'About',
      description:
        'Woman Authority is more than a brand — it is a movement dedicated to helping women build confidence, create success, and live with purpose and fulfillment.',
      path: '/about',
      type: 'profile',
    }),
    scripts: [
      jsonLd(personSchema()),
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
      ),
      jsonLd(faqSchema(aboutFaqs)),
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <AboutHero />
      <IntroductionSection />
      <StorySection />
      <MissionSection />
      <ValuesSection />
      <ImpactBand />
      <CredibilitySection />
      <TestimonialsSection />
      <FaqSection />
      <CtaFeature
        eyebrow="Ready to Grow?"
        title="Let&rsquo;s Work Together"
        description="Whether you need strategic guidance, AI implementation, or content collaboration, I'm here to help."
        actionLabel="Work With Me"
        actionTo="/contact"
        image="about/cta"
        options={workTogetherOptions.map((option) => ({
          title: option.title,
          icon: option.icon,
        }))}
      />
    </>
  )
}

/* ------------------------------------------------------------------ Hero */

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blush-100 via-blush-50 to-blush-200 dark:from-surface-soft dark:via-canvas dark:to-surface-tint">
      <Container className="relative">
        <div className="grid items-center gap-8 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:py-0">
          <div className="lg:py-14">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-6 text-xs">
                <ol className="flex items-center gap-2">
                  <li>
                    <Link to="/" className="text-content-muted transition-colors hover:text-brand">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-content-subtle">
                    ›
                  </li>
                  <li aria-current="page" className="text-content">
                    About
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="eyebrow">About Woman Authority</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 text-display-2xl">
                Empowering Women to Become Their <Accent>Best</Accent> Selves in Every Area of
                Life.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-content-muted md:text-[15px]">
                Woman Authority is more than a brand—it&rsquo;s a movement dedicated to helping
                women build confidence, create success, and live with purpose and fulfillment.
              </p>
            </Reveal>

            <RevealGroup
              className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
              delayChildren={0.22}
            >
              {aboutStats.map((stat) => (
                <RevealItem key={stat.label}>
                  <StatCard stat={stat} variant="inline" />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="relative bleed-right">
            <Reveal variants={scaleIn} className="block">
              <Img
                image="hero/about"
                alt={`${siteConfig.author.name}, founder of ${siteConfig.name}`}
                priority
                overlay="blend"
                sizes="(min-width: 1024px) 55vw, 100vw"
                wrapperClassName="aspect-4/3 w-full rounded-[var(--radius-card)] lg:aspect-auto lg:h-[clamp(26rem,44vw,34rem)] lg:rounded-none"
                objectPosition="center 18%"
              />
            </Reveal>

            <Reveal delay={0.3} variants={scaleIn}>
              <div className="mt-6 inline-flex flex-col items-center rounded-[var(--radius-card)] border border-hairline bg-surface px-6 py-4 shadow-float lg:absolute lg:bottom-10 lg:right-8 lg:z-10 lg:mt-0">
                <span className="font-display text-2xl text-brand">20+</span>
                <span className="mt-1 text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-content-muted">
                  Years of
                  <br />
                  Experience
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------- Introduction */

function IntroductionSection() {
  return (
    <Section spacing="lg">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <Reveal variants={scaleIn} className="relative block">
          <Img
            image="about/portrait"
            alt={siteConfig.author.name}
            sizes="(min-width: 1024px) 380px, 90vw"
            wrapperClassName="aspect-4/5 w-full rounded-[var(--radius-card)]"
          />
          <span className="absolute bottom-6 right-6 font-script text-2xl text-brand-strong">
            {siteConfig.author.signature}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow">Personal Introduction</p>
          <h2 className="mt-3 text-display-lg">
            Hey, I&rsquo;m <Accent>{siteConfig.author.name}</Accent>.
          </h2>
          <p className="mt-4 text-sm font-semibold text-content">{siteConfig.author.role}</p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-content-muted">
            For over two decades, I&rsquo;ve helped women entrepreneurs, leaders, and high
            performers build systems, master their mindset, and leverage technology to create more
            freedom, impact, and success.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-content-muted">
            Through Woman Authority, I share the lessons, frameworks, and strategies that have
            helped me — and thousands of women around the world — level up in life and business.
          </p>
          <Button asChild className="mt-7">
            <Link to="/contact">
              Work With Me
              <Icon name="arrow-right" className="size-3.5" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}

/* ----------------------------------------------------------------- Story */

function StorySection() {
  return (
    <Section spacing="md">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <p className="eyebrow">My Story</p>
          <h2 className="mt-3 text-display-lg">
            From Challenges to <Accent>Purpose</Accent>
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-content-muted">
            I didn&rsquo;t start out as a strategist. I started as a young woman with big dreams
            and no roadmap.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-content-muted">
            After years of trial, error, and relentless learning, I discovered the power of
            mindset, systems, focus, and personal growth.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-content-muted">
            Now, my mission is to help women skip the unnecessary struggle and build extraordinary
            lives with clarity and confidence.
          </p>
        </Reveal>

        <Reveal delay={0.08} variants={scaleIn} className="block">
          <Img
            image="about/story"
            alt=""
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
            wrapperClassName="aspect-4/3 w-full rounded-[var(--radius-card)]"
          />
        </Reveal>
      </div>

      <Timeline />
    </Section>
  )
}

function Timeline() {
  return (
    <div className="mt-16">
      <Reveal>
        <h3 className="text-display-md">The road here, in order</h3>
      </Reveal>

      <RevealGroup className="mt-8" staggerChildren={0.07}>
        <ol className="relative grid gap-8 border-l border-hairline pl-6 md:grid-cols-2 md:gap-x-12 md:border-l-0 md:pl-0">
          {timeline.map((entry) => (
            <RevealItem key={entry.year} as="li" className="relative md:pl-6">
              <span
                aria-hidden="true"
                className="absolute -left-[1.6rem] top-1.5 size-2.5 rounded-full bg-brand ring-4 ring-canvas md:left-0"
              />
              <span className="hidden md:absolute md:inset-y-0 md:left-[0.3rem] md:block md:w-px md:bg-hairline" />
              <p className="font-display text-lg text-brand">{entry.year}</p>
              <h4 className="mt-1.5 text-sm font-semibold text-content">{entry.title}</h4>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-content-muted">
                {entry.description}
              </p>
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>
    </div>
  )
}

/* --------------------------------------------------------------- Mission */

function MissionSection() {
  return (
    <Section tone="soft" spacing="lg">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <Reveal>
          <p className="eyebrow">Our Mission</p>
          <h2 className="mt-3 text-display-md">
            To Empower Women to Live with Confidence and Impact
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-content-muted">
            We believe every woman has the potential to lead a powerful, purpose-driven
            life—personally, professionally, and spiritually. Our content, programs, and community
            are designed to inspire action and deliver real results.
          </p>
        </Reveal>

        <RevealGroup
          className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
          staggerChildren={0.07}
        >
          {missionPillars.map((pillar) => (
            <RevealItem key={pillar.slug}>
              <ExpertiseTile expertise={pillar} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------------- Values */

function ValuesSection() {
  return (
    <Section spacing="lg">
      <Reveal>
        <p className="eyebrow">Our Values</p>
      </Reveal>

      <RevealGroup
        className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-5"
        staggerChildren={0.06}
      >
        {values.map((value) => (
          <RevealItem
            key={value.title}
            className="border-hairline lg:border-r lg:last:border-r-0"
          >
            <ExpertiseTile
              expertise={{
                slug: value.title,
                title: value.title,
                description: value.description,
                icon: value.icon,
              }}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/* ------------------------------------------------------------ Impact band */

function ImpactBand() {
  return (
    <section className="relative overflow-hidden bg-surface-tint py-12 md:py-14">
      <Container>
        <RevealGroup
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          staggerChildren={0.08}
        >
          {impactStats.map((stat) => (
            <RevealItem key={stat.label}>
              <StatCard stat={stat} variant="plain" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}

/* ----------------------------------------------------------- Credibility */

function CredibilitySection() {
  return (
    <Section spacing="lg">
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
        <Reveal>
          <p className="eyebrow">Achievements</p>
          <ul className="mt-5 grid gap-3">
            {achievements.map((achievement) => (
              <li key={achievement} className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 size-4 text-brand" strokeWidth={2.4} />
                <span className="text-sm leading-relaxed text-content-muted">{achievement}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="lg:border-x lg:border-hairline lg:px-10">
          <p className="eyebrow">As Featured In</p>
          <ul className="mt-6 grid grid-cols-2 items-center gap-x-6 gap-y-7 sm:grid-cols-4 lg:grid-cols-2">
            {featuredIn.map((brand) => (
              <li
                key={brand}
                className="font-display text-lg text-content-muted transition-colors hover:text-content"
              >
                {brand}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="eyebrow">What Others Say</p>
          <figure className="mt-5">
            <blockquote className="text-sm leading-relaxed text-content-muted">
              “{aboutFeaturedTestimonial.quote}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5">
              <Avatar
                image={aboutFeaturedTestimonial.avatar}
                alt={aboutFeaturedTestimonial.name}
                className="size-9"
              />
              <span>
                <span className="block text-xs font-semibold text-content">
                  {aboutFeaturedTestimonial.name}
                </span>
                <span className="block text-xs text-content-subtle">
                  {aboutFeaturedTestimonial.title}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------- Testimonials */

function TestimonialsSection() {
  return (
    <Section tone="soft" spacing="md">
      <SectionHeader
        eyebrow="Community Voices"
        title="Real women. Real change."
        align="center"
        className="sr-only"
      />
      <div className="hidden md:grid md:grid-cols-3 md:gap-5">
        {aboutTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} className="h-full" />
        ))}
      </div>
      <TestimonialCarousel
        testimonials={aboutTestimonials}
        className="md:hidden"
        ariaLabel="What readers say"
      />
    </Section>
  )
}

/* ------------------------------------------------------------------- FAQ */

function FaqSection() {
  return (
    <Section spacing="lg">
      <FaqSplit
        title="Common Questions"
        description="Answers to the questions women ask most."
        items={aboutFaqs}
        aside={
          <Img
            image="misc/faq-flowers"
            alt=""
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
            wrapperClassName="hidden aspect-4/3 w-full max-w-64 rounded-[var(--radius-card)] lg:block"
          />
        }
      />
    </Section>
  )
}
