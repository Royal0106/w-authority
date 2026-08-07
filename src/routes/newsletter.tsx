import { createFileRoute } from '@tanstack/react-router'
import { Accent, Container, Section, SectionHeader } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem } from '~/components/motion/reveal'
import { NewsletterForm, NewsletterPromises } from '~/components/forms/newsletter-form'
import { FaqSplit } from '~/components/sections/faq-section'
import { PageHero, HeroFloatingCard } from '~/components/sections/page-hero'
import { TestimonialCarousel } from '~/components/sections/testimonial-carousel'
import { Badge } from '~/components/ui/badge'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { siteConfig } from '~/config/site'
import { newsletterFaqs } from '~/data/faqs'
import { newsletterTestimonials } from '~/data/testimonials'
import { formatDate } from '~/lib/format'
import { breadcrumbSchema, faqSchema, jsonLd, seo } from '~/lib/seo'
import type { IconName } from '~/types/content'

const benefits: Array<{ title: string; description: string; icon: IconName }> = [
  {
    title: 'One idea, explained properly',
    description: 'Not ten links. One thing worth understanding, with the reasoning attached.',
    icon: 'lightbulb',
  },
  {
    title: 'Something to try this week',
    description: 'Every issue ends with a specific action, sized for a normal working week.',
    icon: 'target',
  },
  {
    title: 'Four minutes, once a week',
    description: 'Tuesday morning. Short enough to read, useful enough to keep.',
    icon: 'clock',
  },
  {
    title: 'Written, not generated',
    description: 'Real examples from real engagements, including the ones that went sideways.',
    icon: 'open-book',
  },
]

const sampleIssues = [
  {
    number: '#148',
    date: '2024-05-14',
    title: 'The two-list method for a week that keeps changing',
    excerpt:
      'Most planning systems assume a stable week. This one assumes yours will fall apart by Wednesday — and still gets the important work done.',
  },
  {
    number: '#147',
    date: '2024-05-07',
    title: 'What I got wrong about delegation for eleven years',
    excerpt:
      'Handing over the task is the easy part. Handing over the judgement is what actually buys back your time.',
  },
  {
    number: '#146',
    date: '2024-04-30',
    title: 'The AI project worth doing first',
    excerpt:
      'Not the flashiest one. The one where you already know exactly how many hours it costs you today.',
  },
]

export const Route = createFileRoute('/newsletter')({
  head: () => ({
    ...seo({
      title: 'Newsletter',
      description: `Join ${siteConfig.newsletter.subscribers} women getting one useful idea, one action to try, and nothing else — every Tuesday.`,
      path: '/newsletter',
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Newsletter', path: '/newsletter' },
        ]),
      ),
      jsonLd(faqSchema(newsletterFaqs)),
    ],
  }),
  component: NewsletterPage,
})

function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Newsletter"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Newsletter' }]}
        title={
          <>
            One Useful Idea.
            <br />
            Every <Accent>Tuesday.</Accent>
          </>
        }
        description={`Join ${siteConfig.newsletter.subscribers} women who get one idea worth thinking about and one thing worth trying — in about four minutes.`}
        image="hero/newsletter"
        imageAlt="Reading the Woman Authority newsletter"
        aside={
          <HeroFloatingCard className="lg:w-52">
            <p className="eyebrow">Readers</p>
            <p className="mt-3 font-display text-3xl text-brand">
              {siteConfig.newsletter.subscribers}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-content-muted">
              and a 61% average open rate.
            </p>
          </HeroFloatingCard>
        }
      >
        <div className="mt-7 max-w-md">
          <NewsletterForm buttonLabel="Subscribe Free" />
          <NewsletterPromises items={siteConfig.newsletter.promises} className="mt-3" />
        </div>
      </PageHero>

      <BenefitsSection />
      <SampleIssuesSection />
      <TestimonialsSection />
      <SubscribeSection />
      <Section spacing="lg">
        <FaqSplit
          title="Before You Subscribe"
          description="Everything you might reasonably want to know first."
          items={newsletterFaqs}
        />
      </Section>
    </>
  )
}

function BenefitsSection() {
  return (
    <Section spacing="lg">
      <SectionHeader
        eyebrow="What You Get"
        title="Short, Specific, and Worth the Inbox Space"
      />
      <RevealGroup
        className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        staggerChildren={0.07}
      >
        {benefits.map((benefit) => (
          <RevealItem key={benefit.title}>
            <Icon name={benefit.icon} className="size-7 text-brand" strokeWidth={1.3} />
            <h3 className="mt-3 text-sm font-semibold text-content">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-content-muted">
              {benefit.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function SampleIssuesSection() {
  return (
    <Section tone="soft" spacing="lg">
      <SectionHeader
        eyebrow="Sample Issues"
        title="Read Three Before You Commit"
        description="A representative sample — this is genuinely what lands."
      />
      <RevealGroup className="mt-8 grid gap-5 lg:grid-cols-3" staggerChildren={0.08}>
        {sampleIssues.map((issue) => (
          <RevealItem key={issue.number} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand/40">
              <Img
                image="misc/sample-issue"
                alt=""
                sizes="(min-width: 1024px) 640px, 100vw"
                wrapperClassName="aspect-16/9 w-full"
              />
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <div className="flex items-center gap-2">
                  <Badge variant="soft">{issue.number}</Badge>
                  <span className="text-xs text-content-subtle">{formatDate(issue.date)}</span>
                </div>
                <h3 className="font-display text-base leading-snug">{issue.title}</h3>
                <p className="text-sm leading-relaxed text-content-muted">{issue.excerpt}</p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function TestimonialsSection() {
  return (
    <Section spacing="md">
      <SectionHeader eyebrow="Reader Feedback" title="What Subscribers Say" />
      <TestimonialCarousel
        testimonials={newsletterTestimonials}
        className="mt-8"
        ariaLabel="Newsletter subscriber testimonials"
      />
    </Section>
  )
}

function SubscribeSection() {
  return (
    <section className="bg-surface-tint py-14 md:py-16">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Icon name="mail" className="mx-auto size-8 text-brand" strokeWidth={1.2} />
          <h2 className="mt-4 text-display-md">Start With This Tuesday</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-content-muted">
            No welcome sequence, no upsell ladder. You subscribe, and the next issue arrives.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mx-auto mt-7 block max-w-md">
          <NewsletterForm buttonLabel="Subscribe Free" tone="onTint" />
          <NewsletterPromises
            items={siteConfig.newsletter.promises}
            className="mt-3 justify-center"
          />
        </Reveal>
      </Container>
    </section>
  )
}
