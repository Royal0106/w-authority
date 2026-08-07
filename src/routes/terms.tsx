import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '~/components/sections/legal-page'
import { siteConfig } from '~/config/site'
import { termsSections } from '~/data/legal'
import { breadcrumbSchema, jsonLd, seo } from '~/lib/seo'

export const Route = createFileRoute('/terms')({
  head: () => ({
    ...seo({
      title: 'Terms of Service',
      description: `The terms that govern your use of the ${siteConfig.name} website, content, products and services.`,
      path: '/terms',
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms' },
        ]),
      ),
    ],
  }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro={`Please read these Terms of Service (“Terms”) carefully before using the ${siteConfig.name} website and services.`}
      sections={termsSections}
      ctaTitle="Questions About These Terms?"
      ctaDescription="We're here to help. Reach out anytime."
    />
  )
}
