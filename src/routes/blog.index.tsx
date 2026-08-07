import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'
import { z } from 'zod'
import {
  ArticleCard,
  ArticleRankRow,
  ArticleRow,
  EditorsPickCard,
} from '~/components/cards/article-card'
import { CategoryCountCard as CategoryTile } from '~/components/cards'
import { Pagination } from '~/components/common/pagination'
import { EmptyState } from '~/components/common/states'
import { Accent, Container, Section, SectionHeader } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem, scaleIn } from '~/components/motion/reveal'
import { NewsletterBand } from '~/components/sections/newsletter-band'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { Input } from '~/components/ui/input'
import { Avatar } from '~/components/ui/misc'
import { browseCategories } from '~/data/categories'
import { popularTags } from '~/data/articles'
import {
  filterArticles,
  getEditorsPicks,
  getHeroArticle,
  getPopularArticles,
  paginate,
} from '~/data/queries'
import { formatDate, formatReadTime } from '~/lib/format'
import { breadcrumbSchema, jsonLd, seo } from '~/lib/seo'

const PER_PAGE = 8

/** Search params are validated so a hand-edited URL can never crash the page. */
const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  page: z.coerce.number().int().min(1).optional(),
})

export const Route = createFileRoute('/blog/')({
  validateSearch: searchSchema,
  head: () => ({
    ...seo({
      title: 'Blog',
      description:
        'Actionable advice on fitness, style, success, and everything in between — insights, strategies and real results.',
      path: '/blog',
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]),
      ),
    ],
  }),
  component: BlogPage,
})

function BlogPage() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const isFiltered = Boolean(search.q || search.category || search.tag)

  const filtered = useMemo(
    () =>
      filterArticles({
        query: search.q,
        category: search.category as never,
        tag: search.tag,
      }),
    [search.q, search.category, search.tag],
  )

  const { items, page, totalPages, total } = paginate(filtered, search.page ?? 1, PER_PAGE)

  const setSearch = (next: Partial<typeof search>) => {
    void navigate({
      search: (prev) => ({ ...prev, ...next, page: next.page ?? 1 }),
      resetScroll: false,
    })
  }

  return (
    <>
      <BlogHero query={search.q ?? ''} onQueryChange={(q) => setSearch({ q: q || undefined })} />

      <CategoriesSection active={search.category} onSelect={(category) => setSearch({ category })} />

      {isFiltered ? (
        <ResultsSection
          articles={items}
          total={total}
          page={page}
          totalPages={totalPages}
          onPageChange={(nextPage) => setSearch({ page: nextPage })}
          onClear={() => void navigate({ search: {}, resetScroll: false })}
          search={search}
        />
      ) : (
        <>
          <FeaturedSection />
          <LatestAndPopularSection />
          <EditorsPicksSection />
        </>
      )}

      <NewsletterBand />
      <TagsAndPaginationSection
        page={page}
        totalPages={isFiltered ? totalPages : 20}
        onPageChange={(nextPage) => setSearch({ page: nextPage })}
        onTagSelect={(tag) => setSearch({ tag })}
        activeTag={search.tag}
      />
    </>
  )
}

/* ------------------------------------------------------------------ Hero */

function BlogHero({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (value: string) => void
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blush-100 via-blush-50 to-blush-200 dark:from-surface-soft dark:via-canvas dark:to-surface-tint">
      <Container>
        <div className="grid items-center gap-8 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:py-0">
          <div className="lg:py-16">
            <Reveal>
              <p className="eyebrow">Blog</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-4 text-display-2xl">
                Insights. Strategies.
                <br />
                <Accent>Real Results.</Accent>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-content-muted">
                Actionable advice on fitness, style, success, and everything in between.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <form
                role="search"
                onSubmit={(event) => event.preventDefault()}
                className="mt-7 flex max-w-sm items-stretch gap-0"
              >
                <label htmlFor="blog-search" className="sr-only">
                  Search articles
                </label>
                <Input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(event) => onQueryChange(event.target.value)}
                  placeholder="Search articles..."
                  className="rounded-r-none border-r-0 bg-surface"
                />
                <Button type="submit" size="icon" aria-label="Search" className="h-11 w-11 rounded-l-none">
                  <Icon name="search" className="size-4" />
                </Button>
              </form>
            </Reveal>
          </div>

          <div className="relative bleed-right">
            <Reveal variants={scaleIn} className="block">
              <Img
                image="hero/blog"
                alt=""
                priority
                overlay="blend"
                sizes="(min-width: 1024px) 55vw, 100vw"
                wrapperClassName="aspect-4/3 w-full rounded-[var(--radius-card)] lg:aspect-auto lg:h-[clamp(24rem,40vw,30rem)] lg:rounded-none"
                objectPosition="center 20%"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ Categories */

function CategoriesSection({
  active,
  onSelect,
}: {
  active?: string
  onSelect: (category: string | undefined) => void
}) {
  return (
    <Section spacing="md">
      <div className="flex items-center justify-between gap-4">
        <Reveal>
          <p className="eyebrow">Browse Categories</p>
        </Reveal>
        {active ? (
          <button
            type="button"
            onClick={() => onSelect(undefined)}
            className="text-xs text-content-muted transition-colors hover:text-brand"
          >
            Clear category
          </button>
        ) : (
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-content-muted transition-colors hover:text-brand"
          >
            View all categories
            <Icon name="arrow-right" className="size-3" />
          </Link>
        )}
      </div>

      <RevealGroup
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
        staggerChildren={0.05}
      >
        {browseCategories.map((category) => (
          <RevealItem
            key={category.slug}
            className={active === category.slug ? 'rounded-[var(--radius-card)] ring-2 ring-brand' : ''}
          >
            <CategoryTile category={category} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/* -------------------------------------------------------- Featured block */

function FeaturedSection() {
  const hero = getHeroArticle()
  const side = getPopularArticles(4).filter((a) => a.slug !== hero.slug).slice(0, 3)

  return (
    <Section spacing="md">
      <Reveal>
        <p className="eyebrow">Featured Article</p>
      </Reveal>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr_0.75fr] lg:gap-8">
        <Reveal variants={scaleIn} className="block">
          <Link to="/blog/$slug" params={{ slug: hero.slug }} className="group block">
            <Img
              image={hero.image}
              alt=""
              sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
              wrapperClassName="aspect-4/3 w-full rounded-[var(--radius-card)]"
              className="transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col justify-center">
          <Badge variant="ghost" size="sm" className="px-0">
            {hero.category.replace(/-/g, ' ')}
          </Badge>
          <h2 className="mt-2 font-display text-2xl leading-snug">
            <Link
              to="/blog/$slug"
              params={{ slug: hero.slug }}
              className="transition-colors hover:text-brand"
            >
              {hero.title}
            </Link>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-content-muted">{hero.excerpt}</p>
          <div className="mt-5 flex items-center gap-2.5">
            <Avatar image={hero.author.avatar} alt={hero.author.name} className="size-8" />
            <span>
              <span className="block text-xs text-content">By {hero.author.name}</span>
              <span className="block text-xs text-content-subtle">
                {formatDate(hero.publishedAt)} • {formatReadTime(hero.readMinutes)}
              </span>
            </span>
          </div>
          <Button asChild className="mt-6 self-start">
            <Link to="/blog/$slug" params={{ slug: hero.slug }}>
              Read Article
              <Icon name="arrow-right" className="size-3.5" />
            </Link>
          </Button>
        </Reveal>

        <RevealGroup className="grid gap-5" staggerChildren={0.07}>
          {side.map((article) => (
            <RevealItem key={article.slug}>
              <ArticleRow article={article} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------ Latest + popular */

function LatestAndPopularSection() {
  const latest = filterArticles({}).slice(0, 4)
  const popular = getPopularArticles(5)

  return (
    <Section spacing="md">
      <div className="grid gap-10 lg:grid-cols-[2.1fr_1fr] lg:gap-10">
        <div>
          <div className="flex items-center justify-between gap-4">
            <Reveal>
              <p className="eyebrow">Latest Articles</p>
            </Reveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-content-muted transition-colors hover:text-brand"
            >
              View all latest
              <Icon name="arrow-right" className="size-3" />
            </Link>
          </div>

          <RevealGroup
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            staggerChildren={0.06}
          >
            {latest.map((article) => (
              <RevealItem key={article.slug} className="h-full">
                <ArticleCard article={article} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <Reveal>
              <p className="eyebrow">Popular Articles</p>
            </Reveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-content-muted transition-colors hover:text-brand"
            >
              View all popular
              <Icon name="arrow-right" className="size-3" />
            </Link>
          </div>

          <RevealGroup className="mt-6 grid gap-4" staggerChildren={0.06}>
            {popular.map((article, index) => (
              <RevealItem key={article.slug}>
                <ArticleRankRow article={article} rank={index + 1} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}

/* --------------------------------------------------------- Editor's picks */

function EditorsPicksSection() {
  const picks = getEditorsPicks(4)

  return (
    <Section spacing="md">
      <Reveal>
        <p className="eyebrow">Editor&rsquo;s Picks</p>
      </Reveal>
      <RevealGroup
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        staggerChildren={0.07}
      >
        {picks.map((article) => (
          <RevealItem key={article.slug} className="h-full">
            <EditorsPickCard article={article} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/* -------------------------------------------------------- Filtered results */

function ResultsSection({
  articles,
  total,
  page,
  totalPages,
  onPageChange,
  onClear,
  search,
}: {
  articles: ReturnType<typeof filterArticles>
  total: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onClear: () => void
  search: { q?: string; category?: string; tag?: string }
}) {
  const label = [
    search.q ? `“${search.q}”` : null,
    search.category ? `in ${search.category.replace(/-/g, ' ')}` : null,
    search.tag ? `tagged ${search.tag}` : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Section spacing="md">
      <SectionHeader
        eyebrow="Results"
        title={`${total} ${total === 1 ? 'article' : 'articles'} ${label}`}
        action={
          <Button variant="outline" size="sm" onClick={onClear}>
            Clear filters
          </Button>
        }
      />

      {articles.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="Nothing matched that search"
          description="Try a broader term, or browse by category instead."
          action={
            <Button variant="outline" size="sm" onClick={onClear}>
              Reset
            </Button>
          }
        />
      ) : (
        <>
          <RevealGroup
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            staggerChildren={0.05}
          >
            {articles.map((article) => (
              <RevealItem key={article.slug} className="h-full">
                <ArticleCard article={article} showExcerpt className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className="mt-10 justify-center"
          />
        </>
      )}
    </Section>
  )
}

/* ------------------------------------------------------ Tags + pagination */

function TagsAndPaginationSection({
  page,
  totalPages,
  onPageChange,
  onTagSelect,
  activeTag,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onTagSelect: (tag: string | undefined) => void
  activeTag?: string
}) {
  return (
    <Section spacing="md">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        <div>
          <Reveal>
            <p className="eyebrow">Popular Tags</p>
          </Reveal>
          <div className="mt-5 flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onTagSelect(activeTag === tag ? undefined : tag)}
                aria-pressed={activeTag === tag}
                className={
                  activeTag === tag
                    ? 'rounded-[var(--radius-card)] border border-brand bg-brand px-3 py-1.5 text-xs font-medium text-on-brand'
                    : 'rounded-[var(--radius-card)] border border-hairline px-3 py-1.5 text-xs text-content-muted transition-colors hover:border-brand hover:text-brand'
                }
              >
                {tag}
              </button>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-5 inline-flex items-center gap-1.5 text-xs text-content-muted transition-colors hover:text-brand"
          >
            View all tags
            <Icon name="arrow-right" className="size-3" />
          </Link>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Page Navigation</p>
          </Reveal>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className="mt-5 flex-wrap"
          />
        </div>
      </div>
    </Section>
  )
}
