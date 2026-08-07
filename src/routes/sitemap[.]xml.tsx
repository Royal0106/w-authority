import { createFileRoute } from '@tanstack/react-router'
import { siteConfig } from '~/config/site'
import { getAllArticles } from '~/data/queries'

/** Static routes, with the change frequency hint search engines expect. */
const staticRoutes: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/expertise', priority: '0.9', changefreq: 'monthly' },
  { path: '/speaking', priority: '0.8', changefreq: 'monthly' },
  { path: '/ai-for-business', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
  { path: '/booking', priority: '0.7', changefreq: 'monthly' },
  { path: '/newsletter', priority: '0.7', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
]

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)

  const entries = [
    ...staticRoutes.map(
      (route) => `  <url>
    <loc>${siteConfig.url}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    ),
    ...getAllArticles().map(
      (article) => `  <url>
    <loc>${siteConfig.url}/blog/${article.slug}</loc>
    <lastmod>${article.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    ),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        }),
    },
  },
})
