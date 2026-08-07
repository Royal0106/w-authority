import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Badge } from '~/components/ui/badge'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { Avatar, StarRating } from '~/components/ui/misc'
import { formatPrice } from '~/lib/format'
import type {
  CaseStudy,
  Category,
  Expertise,
  Product,
  Statistic,
  Testimonial,
  TopicCard,
} from '~/types/content'
import { cn } from '~/lib/cn'

export {
  ArticleCard,
  ArticleRankRow,
  ArticleRow,
  EditorsPickCard,
} from './article-card'

/* ------------------------------------------------------------ Category */

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/blog"
      search={{ category: category.slug }}
      className="group flex flex-col items-center gap-2.5 rounded-[var(--radius-card)] border border-hairline bg-surface-soft px-4 py-6 text-center transition-[border-color,background-color,transform] duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-brand/40 hover:bg-surface"
    >
      <span className="grid size-11 place-items-center rounded-full bg-surface text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand">
        <Icon name={category.icon} />
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-content">
        {category.name}
      </span>
      <span className="text-xs leading-relaxed text-content-muted">{category.description}</span>
    </Link>
  )
}

/** Blog page variant — shows the article count instead of a description. */
export function CategoryCountCard({ category }: { category: Category }) {
  return (
    <Link
      to="/blog"
      search={{ category: category.slug }}
      className="group flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-hairline bg-surface px-3 py-6 text-center transition-[border-color,transform] duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-brand/40"
    >
      <span className="grid size-11 place-items-center rounded-full text-brand transition-transform duration-300 group-hover:scale-110">
        <Icon name={category.icon} className="size-6" />
      </span>
      <span className="text-sm font-semibold text-content">{category.name}</span>
      <span className="text-xs text-content-subtle">{category.articleCount} Articles</span>
    </Link>
  )
}

/* ----------------------------------------------------------- Expertise */

export function ExpertiseCard({
  expertise,
  className,
  align = 'center',
}: {
  expertise: Expertise
  className?: string
  align?: 'center' | 'left'
}) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col gap-2.5 rounded-[var(--radius-card)] border border-hairline bg-surface p-5',
        'transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)]',
        'hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      <span className="text-brand transition-transform duration-300 group-hover:scale-110">
        <Icon name={expertise.icon} className="size-7" strokeWidth={1.4} />
      </span>
      <h3 className="text-sm font-semibold leading-snug text-content">{expertise.title}</h3>
      <p className="text-xs leading-relaxed text-content-muted">{expertise.description}</p>
    </article>
  )
}

/** Borderless variant used in “Real Solutions for Real Results” rows. */
export function ExpertiseTile({ expertise }: { expertise: Expertise }) {
  return (
    <div className="group flex flex-col items-center gap-2.5 px-3 text-center">
      <span className="text-brand transition-transform duration-300 group-hover:scale-110">
        <Icon name={expertise.icon} className="size-8" strokeWidth={1.3} />
      </span>
      <h3 className="text-[11px] font-semibold uppercase leading-snug tracking-[0.08em] text-content">
        {expertise.title}
      </h3>
      <p className="text-xs leading-relaxed text-content-muted">{expertise.description}</p>
    </div>
  )
}

/* --------------------------------------------------------------- Topic */

export function TopicImageCard({ topic }: { topic: TopicCard }) {
  return (
    <article className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift">
      <Img
        image={topic.image}
        alt=""
        sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
        wrapperClassName="aspect-16/10 w-full"
        className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-[1.05]"
      />
      <div className="grid gap-1.5 p-4">
        <h3 className="text-sm font-semibold text-content group-hover:text-brand">{topic.title}</h3>
        <p className="text-xs leading-relaxed text-content-muted">{topic.description}</p>
      </div>
    </article>
  )
}

/* ---------------------------------------------------------- Case study */

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift">
      <Img
        image={caseStudy.image}
        alt=""
        sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
        wrapperClassName="aspect-16/10 w-full"
        className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-[1.05]"
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-content">{caseStudy.client}</h3>
        <p className="text-xs leading-relaxed text-content-muted">{caseStudy.result}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {caseStudy.tags.map((tag) => (
            <Badge key={tag} variant="neutral" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  )
}

/* --------------------------------------------------------- Testimonial */

export function TestimonialCard({
  testimonial,
  className,
  variant = 'default',
}: {
  testimonial: Testimonial
  className?: string
  variant?: 'default' | 'tint' | 'quote'
}) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col gap-3 rounded-[var(--radius-card)] p-5',
        variant === 'tint'
          ? 'bg-surface-tint'
          : variant === 'quote'
            ? 'bg-transparent'
            : 'border border-hairline bg-surface',
        className,
      )}
    >
      {testimonial.rating ? (
        <StarRating value={testimonial.rating} />
      ) : (
        <Icon name="message-circle" className="size-5 text-brand" />
      )}
      <blockquote className="flex-1 text-sm leading-relaxed text-content-muted">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-2.5">
        {testimonial.avatar ? (
          <Avatar image={testimonial.avatar} alt={testimonial.name} className="size-8" />
        ) : null}
        <span>
          <span className="block text-xs font-semibold text-content">{testimonial.name}</span>
          <span className="block text-xs text-content-subtle">{testimonial.title}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------ Statistic */

export function StatCard({
  stat,
  className,
  variant = 'stacked',
}: {
  stat: Statistic
  className?: string
  variant?: 'stacked' | 'inline' | 'plain'
}) {
  if (variant === 'plain') {
    return (
      <div className={cn('text-center', className)}>
        <p className="font-display text-3xl text-brand md:text-4xl">{stat.value}</p>
        <p className="mt-1.5 text-xs text-content-muted">{stat.label}</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        variant === 'inline'
          ? 'flex items-center gap-3'
          : 'flex flex-col items-start gap-2',
        className,
      )}
    >
      {stat.icon ? (
        <span className="grid size-9 shrink-0 place-items-center rounded-full text-brand">
          <Icon name={stat.icon} className="size-5" />
        </span>
      ) : null}
      <span>
        <span className="block font-display text-xl leading-none text-content">{stat.value}</span>
        <span className="mt-1 block text-[11px] leading-tight text-content-muted">{stat.label}</span>
      </span>
    </div>
  )
}

/* -------------------------------------------------------------- Product */

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift">
      {/* Product photography arrives on all sorts of backdrops; the blush
          plate and inset keep a row of them looking like one set. */}
      <div className="bg-surface-soft p-3">
        <Img
          image={product.image}
          alt={product.name}
          sizes="(min-width: 1024px) 200px, 45vw"
          wrapperClassName="aspect-square w-full rounded-[calc(var(--radius-card)-1px)]"
          className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-sm font-medium text-content group-hover:text-brand">{product.name}</h3>
        <StarRating value={product.rating} count={product.reviewCount} />
        <p className="mt-auto pt-2 text-sm font-semibold text-content">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  )
}

/* ---------------------------------------------------------- Icon tile */

export function IconTile({
  icon,
  title,
  subtitle,
  className,
}: {
  icon: import('~/types/content').IconName
  title: string
  subtitle?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center gap-1.5 text-center', className)}>
      <Icon name={icon} className="size-5 text-brand" />
      <p className="text-xs font-semibold text-content">{title}</p>
      {subtitle ? <p className="text-[11px] text-content-muted">{subtitle}</p> : null}
    </div>
  )
}
