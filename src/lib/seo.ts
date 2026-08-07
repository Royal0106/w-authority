import { siteConfig } from '~/config/site'

export type SeoInput = {
  title: string
  description: string
  /** Path only, e.g. `/blog/my-post`. Combined with the site URL. */
  path?: string
  /** Absolute or root-relative image path used for OG + Twitter cards. */
  image?: string
  type?: 'website' | 'article' | 'profile'
  /** ISO date — emitted as `article:published_time`. */
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: Array<string>
  noIndex?: boolean
}

function absolute(path?: string) {
  if (!path) return siteConfig.url
  if (path.startsWith('http')) return path
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Build the `meta` + `link` arrays for a route's `head()`.
 *
 * Every page funnels through here so titles, canonicals, OpenGraph and
 * Twitter cards stay consistent and nothing is forgotten per-page.
 */
export function seo(input: SeoInput) {
  const title =
    input.title === siteConfig.name
      ? `${siteConfig.name} — ${siteConfig.tagline}`
      : `${input.title} | ${siteConfig.name}`
  const url = absolute(input.path)
  const image = absolute(input.image ?? siteConfig.ogImage)

  const meta: Array<Record<string, string>> = [
    { title },
    { name: 'description', content: input.description },
    { name: 'author', content: input.author ?? siteConfig.author.name },

    { property: 'og:type', content: input.type ?? 'website' },
    { property: 'og:site_name', content: siteConfig.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: input.description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'en_US' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: siteConfig.social.twitterHandle },
    { name: 'twitter:creator', content: siteConfig.social.twitterHandle },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: input.description },
    { name: 'twitter:image', content: image },
  ]

  if (input.publishedTime) {
    meta.push({ property: 'article:published_time', content: input.publishedTime })
  }
  if (input.modifiedTime) {
    meta.push({ property: 'article:modified_time', content: input.modifiedTime })
  }
  if (input.section) {
    meta.push({ property: 'article:section', content: input.section })
  }
  for (const tag of input.tags ?? []) {
    meta.push({ property: 'article:tag', content: tag })
  }
  if (input.noIndex) {
    meta.push({ name: 'robots', content: 'noindex, nofollow' })
  }

  return {
    meta,
    links: [{ rel: 'canonical', href: url }],
  }
}

/** Serialise a JSON-LD object for a `<script type="application/ld+json">`. */
export function jsonLd(data: Record<string, unknown>) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(data),
  }
}

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absolute('/logo.svg'),
  description: siteConfig.description,
  sameAs: siteConfig.social.profiles.map((p) => p.href),
})

export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.author.name,
  url: absolute('/about'),
  jobTitle: siteConfig.author.role,
  description: siteConfig.author.bio,
  worksFor: { '@type': 'Organization', name: siteConfig.name },
  sameAs: siteConfig.social.profiles.map((p) => p.href),
})

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absolute(item.path),
  })),
})

export const articleSchema = (input: {
  title: string
  description: string
  path: string
  image?: string
  publishedTime: string
  author: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: input.title,
  description: input.description,
  image: absolute(input.image ?? siteConfig.ogImage),
  datePublished: input.publishedTime,
  mainEntityOfPage: absolute(input.path),
  author: { '@type': 'Person', name: input.author },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: { '@type': 'ImageObject', url: absolute('/logo.svg') },
  },
})

export const faqSchema = (items: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})
