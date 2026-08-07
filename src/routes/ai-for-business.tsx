import { Link, createFileRoute } from '@tanstack/react-router'
import { CaseStudyCard, ExpertiseCard, StatCard } from '~/components/cards'
import { Accent, Container, Section, SectionHeader } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem } from '~/components/motion/reveal'
import { FaqSplit } from '~/components/sections/faq-section'
import { NewsletterBand } from '~/components/sections/newsletter-band'
import { PageHero, HeroFloatingCard } from '~/components/sections/page-hero'
import { CtaCard } from '~/components/sections/cta-band'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import {
  aiFramework,
  aiIndustries,
  aiSolutions,
  businessProblems,
  roiMetrics,
} from '~/data/ai-for-business'
import { caseStudies } from '~/data/expertise'
import { aiForBusinessFaqs } from '~/data/faqs'
import { breadcrumbSchema, faqSchema, jsonLd, seo } from '~/lib/seo'

export const Route = createFileRoute('/ai-for-business')({
  head: () => ({
    ...seo({
      title: 'AI for Business',
      description:
        'A practical AI programme for real businesses — audit, prioritise, pilot, roll out and compound. No hype, measurable return.',
      path: '/ai-for-business',
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'AI for Business', path: '/ai-for-business' },
        ]),
      ),
      jsonLd(faqSchema(aiForBusinessFaqs)),
    ],
  }),
  component: AiForBusinessPage,
})

function AiForBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="AI for Business"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'AI for Business' }]}
        title={
          <>
            Practical AI.
            <br />
            <Accent>Measurable</Accent> Return.
          </>
        }
        description="Most AI projects stall because they start with the tool instead of the workflow. We start with the hours you are losing, and work backwards."
        image="hero/ai-for-business"
        imageAlt="A team reviewing an AI implementation plan"
        aside={
          <HeroFloatingCard className="lg:w-56">
            <p className="eyebrow">Typical Result</p>
            <p className="mt-3 font-display text-3xl text-brand">10+ hrs</p>
            <p className="mt-1 text-xs leading-relaxed text-content-muted">
              returned per person, per week, within the first 90 days.
            </p>
          </HeroFloatingCard>
        }
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/booking">
              Book an AI Audit
              <Icon name="arrow-right" className="size-3.5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/expertise">See Case Studies</Link>
          </Button>
        </div>
      </PageHero>

      <ProblemsSection />
      <SolutionsSection />
      <IndustriesSection />
      <FrameworkSection />
      <CaseStudiesSection />
      <RoiSection />
      <Section spacing="lg">
        <FaqSplit
          title="Questions Leaders Ask First"
          description="The four that come up in almost every first conversation."
          items={aiForBusinessFaqs}
        />
      </Section>
      <Container className="pb-16">
        <CtaCard
          icon="rocket"
          title="Start With the Audit"
          description="Ninety minutes, your actual workflows, and a prioritised roadmap you keep either way."
          actionLabel="Book a Session"
          actionTo="/booking"
        />
      </Container>
      <NewsletterBand />
    </>
  )
}

function ProblemsSection() {
  return (
    <Section spacing="lg">
      <SectionHeader
        eyebrow="Business Problems"
        title="The Six Problems We Hear Every Week"
        description="If two or more of these sound familiar, there is almost certainly a fast win available."
      />
      <RevealGroup
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        staggerChildren={0.06}
      >
        {businessProblems.map((problem) => (
          <RevealItem key={problem.slug} className="h-full">
            <ExpertiseCard expertise={problem} align="left" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function SolutionsSection() {
  return (
    <Section tone="soft" spacing="lg">
      <SectionHeader
        eyebrow="Solutions"
        title={
          <>
            What We Actually <Accent>Build</Accent>
          </>
        }
        description="Six repeatable programmes, scoped to your business rather than assembled from a template."
      />
      <RevealGroup
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        staggerChildren={0.06}
      >
        {aiSolutions.map((solution) => (
          <RevealItem key={solution.slug} className="h-full">
            <ExpertiseCard expertise={solution} align="left" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function IndustriesSection() {
  return (
    <Section spacing="md">
      <SectionHeader eyebrow="Industries" title="Where This Works Best" />
      <RevealGroup className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.05}>
        {aiIndustries.map((industry) => (
          <RevealItem
            key={industry.name}
            className="border-l-2 border-brand/30 pl-4"
          >
            <h3 className="text-sm font-semibold text-content">{industry.name}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-content-muted">{industry.detail}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function FrameworkSection() {
  return (
    <Section spacing="md" bordered>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr] lg:gap-12">
        <Reveal>
          <p className="eyebrow">The Framework</p>
          <h2 className="mt-3 text-display-md">
            Five Steps.
            <br />
            <Accent>No Pilot Purgatory.</Accent>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-content-muted">
            Each step has an exit criterion. If a project cannot clear it, we stop and move to the
            next one on the list.
          </p>
        </Reveal>

        <RevealGroup
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
          staggerChildren={0.08}
        >
          {aiFramework.map((step, index) => (
            <RevealItem key={step.step} className="relative text-center">
              {index < aiFramework.length - 1 ? (
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

function CaseStudiesSection() {
  return (
    <Section spacing="md">
      <SectionHeader
        eyebrow="Case Studies"
        title="What It Looked Like in Practice"
        action={
          <Link
            to="/expertise"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-content transition-colors hover:text-brand"
          >
            View All
            <Icon name="arrow-right" className="size-3" />
          </Link>
        }
      />
      <RevealGroup
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        staggerChildren={0.07}
      >
        {caseStudies.map((study) => (
          <RevealItem key={study.slug} className="h-full">
            <CaseStudyCard caseStudy={study} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function RoiSection() {
  return (
    <section className="bg-surface-tint py-12 md:py-14">
      <Container>
        <Reveal>
          <p className="eyebrow">Return on Investment</p>
          <h2 className="mt-3 text-display-md">The Numbers We Hold Ourselves To</h2>
        </Reveal>
        <RevealGroup
          className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4"
          staggerChildren={0.08}
        >
          {roiMetrics.map((metric) => (
            <RevealItem key={metric.label}>
              <StatCard stat={metric} variant="plain" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
