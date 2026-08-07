import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { SiteHeader } from '~/components/layout/site-header'
import { SiteFooter } from '~/components/layout/site-footer'
import { BackToTop } from '~/components/common/back-to-top'
import { NotFound } from '~/components/common/not-found'
import { RouteError } from '~/components/common/route-error'
import { PageTransition } from '~/components/motion/page-transition'
import { ThemeProvider, themeScript } from '~/components/theme/theme-provider'
import { TooltipProvider } from '~/components/ui/misc'
import { siteConfig } from '~/config/site'
import { jsonLd, organizationSchema, seo } from '~/lib/seo'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#f04e7b' },
      { name: 'format-detection', content: 'telephone=no' },
      ...seo({
        title: siteConfig.name,
        description: siteConfig.description,
        path: '/',
      }).meta,
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/logo.svg' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Dancing+Script:wght@500;600&display=swap',
      },
    ],
    scripts: [jsonLd(organizationSchema())],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: RouteError,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before first paint so the theme never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider delayDuration={200}>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-[var(--radius-card)] focus:bg-brand focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.1em] focus:text-on-brand"
            >
              Skip to main content
            </a>
            <div className="flex min-h-dvh flex-col">
              <SiteHeader />
              <main id="main-content" className="flex-1">
                <RouteBody>{children}</RouteBody>
              </main>
              <SiteFooter />
            </div>
            <BackToTop />
            <Toaster
              position="bottom-right"
              toastOptions={{
                classNames: {
                  toast:
                    'rounded-[var(--radius-card)] border border-hairline bg-surface text-content shadow-lift',
                  description: 'text-content-muted',
                  actionButton: 'bg-brand text-on-brand',
                },
              }}
            />
          </TooltipProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

/** Wraps the matched route so page changes cross-fade. */
function RouteBody({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  return <PageTransition routeKey={pathname}>{children}</PageTransition>
}
