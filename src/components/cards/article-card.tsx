import { Link } from '@tanstack/react-router'
import { Badge } from '~/components/ui/badge'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { Avatar } from '~/components/ui/misc'
import { getCategoryName } from '~/data/categories'
import { formatDate, formatReadTime, padIndex } from '~/lib/format'
import type { Article } from '~/types/content'
import { cn } from '~/lib/cn'

/* -------------------------------------------------------- Vertical card */

export function ArticleCard({
  article,
  className,
  showAuthor = true,
  showExcerpt = false,
  priority = false,
  aspect = 'aspect-4/3',
}: {
  article: Article
  className?: string
  showAuthor?: boolean
  showExcerpt?: boolean
  priority?: boolean
  aspect?: string
}) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface',
        'transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)]',
        'hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift',
        className,
      )}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: article.slug }}
        className="block focus-visible:outline-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Img
          image={article.image}
          alt=""
          priority={priority}
          wrapperClassName={cn('w-full', aspect)}
          className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <Badge variant="ghost" size="sm" className="px-0">
          {getCategoryName(article.category)}
        </Badge>

        <h3 className="font-display text-base leading-snug">
          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            className="transition-colors after:absolute group-hover:text-brand"
          >
            {article.title}
          </Link>
        </h3>

        {showExcerpt ? (
          <p className="text-sm leading-relaxed text-content-muted">{article.excerpt}</p>
        ) : null}

        <div className="mt-auto pt-3">
          {showAuthor ? (
            <div className="flex items-center gap-2">
              <Avatar
                image={article.author.avatar}
                alt={article.author.name}
                className="size-7"
              />
              <p className="text-xs text-content-muted">
                By {article.author.name}
              </p>
            </div>
          ) : null}
          <p className={cn('text-xs text-content-subtle', showAuthor && 'mt-1.5')}>
            {formatDate(article.publishedAt)}
            <span aria-hidden="true"> • </span>
            {formatReadTime(article.readMinutes)}
          </p>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------ Horizontal card */

export function ArticleRow({
  article,
  className,
  showCategory = true,
}: {
  article: Article
  className?: string
  showCategory?: boolean
}) {
  return (
    <article className={cn('group flex items-start gap-3.5', className)}>
      <Link
        to="/blog/$slug"
        params={{ slug: article.slug }}
        tabIndex={-1}
        aria-hidden="true"
        className="shrink-0"
      >
        <Img
          image={article.image}
          alt=""
          sizes="72px"
          wrapperClassName="size-16 rounded-[var(--radius-card)] sm:size-[4.25rem]"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="min-w-0 flex-1">
        {showCategory ? (
          <Badge variant="ghost" size="sm" className="px-0">
            {getCategoryName(article.category)}
          </Badge>
        ) : null}
        <h3 className="mt-1 font-sans text-sm font-semibold leading-snug">
          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            className="transition-colors group-hover:text-brand"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-xs text-content-subtle">
          {formatDate(article.publishedAt)}
          <span aria-hidden="true"> • </span>
          {formatReadTime(article.readMinutes)}
        </p>
      </div>
    </article>
  )
}

/* ------------------------------------------------- Numbered popular row */

export function ArticleRankRow({
  article,
  rank,
  className,
}: {
  article: Article
  rank: number
  className?: string
}) {
  return (
    <article className={cn('group flex items-start gap-3.5', className)}>
      <span
        aria-hidden="true"
        className="mt-1 w-6 shrink-0 font-display text-sm text-content-subtle"
      >
        {padIndex(rank)}
      </span>
      <Link
        to="/blog/$slug"
        params={{ slug: article.slug }}
        tabIndex={-1}
        aria-hidden="true"
        className="shrink-0"
      >
        <Img
          image={article.image}
          alt=""
          sizes="64px"
          wrapperClassName="size-14 rounded-[var(--radius-card)]"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold leading-snug">
          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            className="transition-colors group-hover:text-brand"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-content-subtle">
          {formatDate(article.publishedAt)}
          <span aria-hidden="true"> • </span>
          {formatReadTime(article.readMinutes)}
        </p>
      </div>
    </article>
  )
}

/* ------------------------------------------------- Editor's pick card */

export function EditorsPickCard({ article }: { article: Article }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift">
      <div className="relative">
        <Img
          image={article.image}
          alt=""
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
          wrapperClassName="aspect-16/10 w-full"
          className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-[1.04]"
        />
        <span
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-[var(--radius-card)] bg-brand text-on-brand"
          aria-hidden="true"
        >
          <Icon name="bookmark" className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Badge variant="ghost" size="sm" className="px-0">
          {getCategoryName(article.category)}
        </Badge>
        <h3 className="font-display text-base leading-snug">
          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            className="transition-colors group-hover:text-brand"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-auto pt-2 text-xs text-content-subtle">
          {formatReadTime(article.readMinutes)}
        </p>
      </div>
    </article>
  )
}
