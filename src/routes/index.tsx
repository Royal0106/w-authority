import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArticleCard,
  CategoryCard,
  ExpertiseTile,
  ProductCard,
  TestimonialCard,
} from '~/components/cards'
import { Accent, Container, Section, SectionHeader } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem, scaleIn } from '~/components/motion/reveal'
import { NewsletterBand } from '~/components/sections/newsletter-band'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { siteConfig } from '~/config/site'
import { heroTrustSignals, solutions } from '~/data/expertise'
import { topCategories } from '~/data/categories'
import { bestSellers } from '~/data/products'
import { getFeaturedArticles } from '~/data/queries'
import { homeTestimonials } from '~/data/testimonials'
import { jsonLd, personSchema, seo } from '~/lib/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    ...seo({
      title: siteConfig.name,
      description: siteConfig.description,
      path: '/',
    }),
    scripts: [jsonLd(personSchema())],
  }),
  component: HomePage,
})

function HomePage() {
  const featured = getFeaturedArticles(4)

  return (
    <>
      <HomeHero />
      <TopCategoriesSection />
      <FeaturedArticlesSection articles={featured} />
      <NewsletterBand layout="feature" />
      <ShopSection />
      <FounderSection />
      <SolutionsSection />
      <TestimonialsSection />
    </>
  )
}

/* ------------------------------------------------------------------ Hero */

function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blush-100 via-blush-50 to-blush-200 dark:from-surface-soft dark:via-canvas dark:to-surface-tint">
      <Container className="relative">
        <div className="grid items-center gap-8 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:py-0">
          <div className="lg:py-16">
            <Reveal>
              <p className="eyebrow">Live Your Best Life</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-4 text-display-2xl">
                Build Confidence.
                <br />
                Live Purposefully.
                <br />
                Lead <Accent>Powerfully.</Accent>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-content-muted md:text-[15px]">
                Expert advice and real-world insights on fitness, style, success and mindset for
                the modern woman.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link to="/blog">
                    Explore Articles
                    <Icon name="arrow-right" className="size-3.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/expertise">
                    Shop Resources
                    <Icon name="shopping-cart" className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <RevealGroup
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
              delayChildren={0.24}
            >
              {heroTrustSignals.map((signal) => (
                <RevealItem key={signal.title} className="flex items-start gap-2.5">
                  <Icon name={signal.icon} className="mt-0.5 size-4 text-brand" />
                  <span>
                    <span className="block text-xs font-semibold text-content">{signal.title}</span>
                    <span className="block text-xs text-content-muted">{signal.subtitle}</span>
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="relative bleed-right">
            <Reveal variants={scaleIn} className="block">
              <Img
                image="hero/home"
                alt="Brian Hanson, founder of Woman Authority"
                priority
                overlay="blend"
                sizes="(min-width: 1024px) 55vw, 100vw"
                wrapperClassName="aspect-4/3 w-full rounded-[var(--radius-card)] lg:aspect-auto lg:h-[clamp(29rem,46vw,38rem)] lg:rounded-none"
                objectPosition="center 20%"
              />
            </Reveal>

            <Reveal delay={0.3} variants={scaleIn}>
              <div className="mt-6 inline-flex flex-col items-center rounded-[var(--radius-card)] border border-hairline bg-surface px-7 py-5 shadow-float lg:absolute lg:bottom-10 lg:right-8 lg:z-10 lg:mt-0">
                <span className="font-display text-3xl text-brand">20+</span>
                <span className="mt-1 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-content-muted">
                  Years
                  <br />
                  of Experience
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ Categories */

function TopCategoriesSection() {
  return (
    <Section spacing="md">
      <SectionHeader
        eyebrow="Explore What Matters"
        title="Top Categories"
        action={
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-content-muted transition-colors hover:text-brand"
          >
            View all categories
            <Icon name="arrow-right" className="size-3" />
          </Link>
        }
      />
      <RevealGroup
        className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        staggerChildren={0.06}
      >
        {topCategories.map((category) => (
          <RevealItem key={category.slug}>
            <CategoryCard category={category} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/* ------------------------------------------------------ Featured articles */

function FeaturedArticlesSection({
  articles,
}: {
  articles: ReturnType<typeof getFeaturedArticles>
}) {
  return (
    <Section spacing="md">
      <div className="grid gap-8 lg:grid-cols-[0.62fr_2.38fr] lg:gap-10">
        <Reveal>
          <p className="eyebrow">Latest Insights</p>
          <h2 className="mt-3 text-display-lg">Featured Articles</h2>
          <p className="mt-4 text-sm leading-relaxed text-content-muted">
            Actionable tips and strategies to help you level up in every area of life.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-content transition-colors hover:text-brand"
          >
            View All Articles
            <Icon name="arrow-right" className="size-3" />
          </Link>
        </Reveal>

        <RevealGroup
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          staggerChildren={0.07}
        >
          {articles.map((article) => (
            <RevealItem key={article.slug} className="h-full">
              <ArticleCard article={article} showExcerpt className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ Shop */

function ShopSection() {
  return (
    <Section spacing="md">
      <SectionHeader
        eyebrow="Top Picks"
        title="Shop Best Sellers"
        action={
          <Link
            to="/expertise"
            className="inline-flex items-center gap-1.5 text-xs text-content-muted transition-colors hover:text-brand"
          >
            View all products
            <Icon name="arrow-right" className="size-3" />
          </Link>
        }
      />
      <RevealGroup
        className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        staggerChildren={0.06}
      >
        {bestSellers.map((product) => (
          <RevealItem key={product.slug} className="h-full">
            <ProductCard product={product} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/* --------------------------------------------------------------- Founder */

function FounderSection() {
  return (
    <Section spacing="md">
      <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal variants={scaleIn} className="relative block">
          <Img
            image="misc/founder"
            alt={`${siteConfig.author.name} at work`}
            sizes="(min-width: 1024px) 380px, 90vw"
            wrapperClassName="aspect-4/5 w-full rounded-[var(--radius-card)]"
          />
          <span className="absolute bottom-6 right-0 flex translate-x-3 flex-col items-center rounded-[var(--radius-card)] bg-brand px-5 py-4 text-on-brand shadow-float">
            <span className="font-display text-2xl leading-none">4x</span>
            <span className="mt-1 text-[9px] font-semibold uppercase leading-tight tracking-[0.12em]">
              Businesses
              <br />
              Scaled
            </span>
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-content-muted">
            About the Founder
          </p>
          <h2 className="mt-3 text-display-lg">
            Hi, I&rsquo;m <Accent>{siteConfig.author.name}</Accent>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-content-muted">
            I&rsquo;m a 20+ year business strategist and AI consultant passionate about helping
            women build smarter systems, stronger habits, and scalable businesses.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-content-muted">
            I believe every woman has the power to create a life and business she loves — with
            clarity, systems, and confidence.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/about">My Story</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/expertise">Client Success</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/about">Press &amp; Media</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/speaking">Speaking Engagements</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------- Solutions */

function SolutionsSection() {
  return (
    <Section spacing="md">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-content-muted">
          How I Can Help
        </p>
        <h2 className="mt-3 text-display-lg">
          Real Solutions for Real <em className="not-italic text-brand">Results</em>
        </h2>
      </Reveal>

      <RevealGroup
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-6"
        staggerChildren={0.06}
      >
        {solutions.map((solution) => (
          <RevealItem key={solution.slug}>
            <ExpertiseTile expertise={solution} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/* ---------------------------------------------------------- Testimonials */

function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-surface-soft py-16 md:py-20">
      <Container>
        <Reveal className="text-center">
          <p className="eyebrow">What Others Say</p>
          <h2 className="mt-3 text-display-lg">
            Loved by Thousands of <em className="not-italic text-brand">Women</em>
          </h2>
        </Reveal>

        <RevealGroup
          className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          staggerChildren={0.07}
        >
          {homeTestimonials.map((testimonial) => (
            <RevealItem key={testimonial.id} className="h-full">
              <TestimonialCard testimonial={testimonial} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
