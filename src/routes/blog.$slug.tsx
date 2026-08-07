import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useRef } from 'react'
import { ArticleCard, ArticleRow } from '~/components/cards/article-card'
import { ArticleBody } from '~/components/article/article-body'
import { Comments } from '~/components/article/comments'
import { ShareBar } from '~/components/article/share-bar'
import { TableOfContents } from '~/components/article/table-of-contents'
import { Breadcrumb } from '~/components/common/breadcrumb'
import { NotFound } from '~/components/common/not-found'
import { ReadingProgress } from '~/components/common/reading-progress'
import { Container, Section } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem, scaleIn } from '~/components/motion/reveal'
import { NewsletterBand } from '~/components/sections/newsletter-band'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Img, imageSrc } from '~/components/ui/image'
import { Avatar } from '~/components/ui/misc'
import { getCategoryName } from '~/data/categories'
import {
  getArticle,
  getRecommendedArticles,
  getRelatedArticles,
  getTableOfContents,
} from '~/data/queries'
import { formatDate, formatReadTime } from '~/lib/format'
import { articleSchema, breadcrumbSchema, jsonLd, seo } from '~/lib/seo'
import type { Article } from '~/types/content'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const article = getArticle(params.slug)
    if (!article) throw notFound()
    return { article }
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article
    if (!article) return {}
    const path = `/blog/${article.slug}`
    return {
      ...seo({
        title: article.title,
        description: article.excerpt,
        path,
        image: imageSrc(article.image),
        type: 'article',
        publishedTime: article.publishedAt,
        author: article.author.name,
        section: getCategoryName(article.category),
        tags: article.tags,
      }),
      scripts: [
        jsonLd(
          articleSchema({
            title: article.title,
            description: article.excerpt,
            path,
            image: imageSrc(article.image),
            publishedTime: article.publishedAt,
            author: article.author.name,
          }),
        ),
        jsonLd(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: article.title, path },
          ]),
        ),
      ],
    }
  },
  notFoundComponent: NotFound,
  component: ArticlePage,
})

function ArticlePage() {
  const { article } = Route.useLoaderData()
  const bodyRef = useRef<HTMLElement>(null)
  const headings = getTableOfContents(article)
  const related = getRelatedArticles(article.slug, 4)
  const recommended = getRecommendedArticles(article.slug, 4)

  return (
    <>
      <ReadingProgress target={bodyRef} />
      <ArticleHero article={article} />

      <Container className="pb-6 pt-4">
        <ShareBar
          title={article.title}
          path={`/blog/${article.slug}`}
          className="ml-auto max-w-max"
        />
      </Container>

      <Container className="grid gap-8 pb-4 lg:grid-cols-[15rem_minmax(0,1fr)_16rem] lg:gap-8">
        {/* Left rail — contents + subscribe prompt */}
        <aside className="order-2 lg:order-1">
          <div className="lg:sticky lg:top-32 lg:grid lg:gap-5">
            <TableOfContents headings={headings} />
            <SubscribePrompt />
          </div>
        </aside>

        {/* Article */}
        <article ref={bodyRef} className="order-1 min-w-0 lg:order-2">
          <ArticleBody blocks={article.body} />
        </article>

        {/* Right rail — recommendations + lead magnet */}
        <aside className="order-3">
          <div className="lg:sticky lg:top-32 lg:grid lg:gap-6">
            <div>
              <p className="eyebrow">Recommended Articles</p>
              <div className="mt-4 grid gap-4">
                {recommended.map((item) => (
                  <ArticleRow key={item.slug} article={item} />
                ))}
              </div>
            </div>
            <DownloadCard />
          </div>
        </aside>
      </Container>

      <Section spacing="md">
        <Reveal>
          <p className="eyebrow">Related Articles</p>
        </Reveal>
        <RevealGroup
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerChildren={0.07}
        >
          {related.map((item) => (
            <RevealItem key={item.slug} className="h-full">
              <ArticleCard article={item} showAuthor={false} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <NewsletterBand />

      <Section spacing="md">
        <AuthorCard article={article} />
        <div className="mt-8">
          <Comments count={article.commentCount ?? 0} />
        </div>
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ Hero */

function ArticleHero({ article }: { article: Article }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blush-100 via-blush-50 to-blush-200 dark:from-surface-soft dark:via-canvas dark:to-surface-tint">
      <Container>
        <div className="grid items-center gap-8 py-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:py-0">
          <div className="lg:py-12">
            <Reveal>
              <Breadcrumb
                className="mb-6"
                items={[
                  { label: 'Home', to: '/' },
                  { label: 'Blog', to: '/blog' },
                  {
                    label: getCategoryName(article.category),
                    to: '/blog',
                    search: { category: article.category },
                  },
                  { label: article.title },
                ]}
              />
            </Reveal>

            <Reveal delay={0.05}>
              <Badge variant="ghost" size="sm" className="px-0">
                {getCategoryName(article.category)}
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-3 text-display-xl">{article.title}</h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-content-muted">
                {article.excerpt}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-6 flex items-center gap-3">
                <Avatar
                  image={article.author.avatar}
                  alt={article.author.name}
                  className="size-10"
                />
                <p className="text-xs text-content-muted">
                  <span className="font-medium text-content">By {article.author.name}</span>
                  <span aria-hidden="true"> &nbsp;•&nbsp; </span>
                  {formatDate(article.publishedAt)}
                  <span aria-hidden="true"> &nbsp;•&nbsp; </span>
                  {formatReadTime(article.readMinutes)}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="relative bleed-right">
            <Reveal variants={scaleIn} className="block">
              <Img
                image={article.image}
                alt=""
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                wrapperClassName="aspect-16/10 w-full rounded-[var(--radius-card)] lg:aspect-auto lg:h-[clamp(18rem,30vw,24rem)] lg:rounded-none"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------- Sidebar blocks */

function SubscribePrompt() {
  return (
    <div className="rounded-[var(--radius-card)] bg-surface-tint p-5 text-center">
      <Icon name="mail" className="mx-auto size-6 text-brand" strokeWidth={1.3} />
      <p className="mt-3 font-display text-base leading-snug">Want more insights like this?</p>
      <p className="mt-2 text-xs leading-relaxed text-content-muted">
        Join 100,000+ women getting strategies, insights, and tools every week.
      </p>
      <Button asChild size="sm" className="mt-4">
        <Link to="/newsletter">Subscribe</Link>
      </Button>
    </div>
  )
}

function DownloadCard() {
  return (
    <div className="rounded-[var(--radius-card)] bg-surface-tint p-5">
      <p className="eyebrow">Free Download</p>
      <p className="mt-3 font-display text-lg leading-snug">The Daily Systems Checklist</p>
      <p className="mt-2 text-xs leading-relaxed text-content-muted">
        A simple checklist of the 7 systems top performers use every day.
      </p>
      <Button asChild size="sm" className="mt-4">
        <Link to="/newsletter">Download Now</Link>
      </Button>
      <Img
        image="misc/download-preview"
        alt=""
        sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
        wrapperClassName="mt-5 aspect-4/3 w-full rounded-[var(--radius-card)]"
      />
    </div>
  )
}

/* ------------------------------------------------------------- Author box */

function AuthorCard({ article }: { article: Article }) {
  const { author } = article

  return (
    <Reveal className="flex flex-col items-start gap-5 rounded-[var(--radius-card)] border border-hairline p-6 sm:flex-row sm:items-center">
      <Avatar image={author.avatar} alt={author.name} className="size-20 shrink-0" />
      <div className="flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-content-subtle">
          Written by
        </p>
        <h2 className="mt-1.5 font-display text-lg">{author.name}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-content-muted">{author.bio}</p>
        <ul className="mt-4 flex items-center gap-4">
          {author.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="block text-content-muted transition-colors hover:text-brand"
              >
                <span className="sr-only">{`${author.name} on ${social.label}`}</span>
                <Icon name={social.icon} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
