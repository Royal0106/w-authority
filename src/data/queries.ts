import { articles } from './articles'
import type { Article, CategorySlug } from '~/types/content'

/**
 * Read helpers over the article index.
 *
 * Everything here is pure and synchronous today. Making the site CMS-backed
 * means replacing these bodies (or wrapping them in server functions) without
 * touching a single component.
 */

const bySlug = new Map(articles.map((article) => [article.slug, article]))

export function getArticle(slug: string) {
  return bySlug.get(slug)
}

export function getAllArticles() {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getFeaturedArticles(limit = 4) {
  return articles.filter((article) => article.featured).slice(0, limit)
}

/** The single hero article on the blog index. */
export function getHeroArticle() {
  return articles.find((article) => article.featured) ?? articles[0]!
}

export function getLatestArticles(limit = 4) {
  return getAllArticles().slice(0, limit)
}

export function getPopularArticles(limit = 5) {
  return [...articles]
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, limit)
}

export function getEditorsPicks(limit = 4) {
  return articles.filter((article) => article.editorsPick).slice(0, limit)
}

export function getArticlesByCategory(category: CategorySlug) {
  return getAllArticles().filter((article) => article.category === category)
}

/** Same category first, then anything else recent, excluding the current post. */
export function getRelatedArticles(slug: string, limit = 4) {
  const current = bySlug.get(slug)
  if (!current) return getLatestArticles(limit)

  const sameCategory = getAllArticles().filter(
    (article) => article.slug !== slug && article.category === current.category,
  )
  const others = getAllArticles().filter(
    (article) => article.slug !== slug && article.category !== current.category,
  )
  return [...sameCategory, ...others].slice(0, limit)
}

export function getRecommendedArticles(slug: string, limit = 4) {
  return getPopularArticles(limit + 1)
    .filter((article) => article.slug !== slug)
    .slice(0, limit)
}

export type ArticleFilters = {
  query?: string
  category?: CategorySlug | 'all'
  tag?: string
}

export function filterArticles({ query, category, tag }: ArticleFilters) {
  const normalisedQuery = query?.trim().toLowerCase()

  return getAllArticles().filter((article) => {
    if (category && category !== 'all' && article.category !== category) return false
    if (tag && !article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) return false
    if (!normalisedQuery) return true

    const haystack = [
      article.title,
      article.excerpt,
      article.category,
      article.author.name,
      ...article.tags,
    ]
      .join(' ')
      .toLowerCase()

    return normalisedQuery
      .split(/\s+/)
      .every((term) => haystack.includes(term))
  })
}

export function searchArticles(query: string) {
  if (!query.trim()) return []
  return filterArticles({ query })
}

export function paginate<T>(items: Array<T>, page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * perPage
  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    totalPages,
    total: items.length,
  }
}

/** Headings in the article body, used to build the table of contents. */
export function getTableOfContents(article: Article) {
  return article.body
    .filter((block): block is Extract<typeof block, { type: 'heading' }> => block.type === 'heading')
    .map((block) => ({ id: block.id, text: block.text }))
}
