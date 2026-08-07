import { Link } from '@tanstack/react-router'
import { Logo } from '~/components/common/logo'
import { SocialLinks } from '~/components/common/social-links'
import { NewsletterForm, NewsletterPromises } from '~/components/forms/newsletter-form'
import { footerNav } from '~/config/navigation'
import { siteConfig } from '~/config/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-surface-soft">
      <div className="container-site grid gap-10 py-12 md:py-14 lg:grid-cols-[1.3fr_repeat(3,minmax(0,0.7fr))_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-56 text-sm leading-relaxed text-content-muted">
            Helping women become unstoppable in life, business, and beyond.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        {footerNav.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
              {column.title}
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    search={link.search as never}
                    className="text-sm text-content-muted transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            Join the Movement
          </h2>
          <p className="mt-4 max-w-64 text-sm leading-relaxed text-content-muted">
            Get the best tips and updates straight to your inbox.
          </p>
          <NewsletterForm variant="compact" className="mt-4 max-w-72" buttonLabel="Subscribe" />
          <NewsletterPromises
            items={['No spam', 'Unsubscribe anytime']}
            className="mt-3"
          />
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-content-muted sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All Rights Reserved.
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/privacy" className="transition-colors hover:text-brand">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-brand">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
