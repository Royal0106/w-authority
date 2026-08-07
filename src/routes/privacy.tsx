import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '~/components/sections/legal-page'
import { siteConfig } from '~/config/site'
import { privacySections } from '~/data/legal'
import { breadcrumbSchema, jsonLd, seo } from '~/lib/seo'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    ...seo({
      title: 'Privacy Policy',
      description: `How ${siteConfig.name} collects, uses and protects your personal information.`,
      path: '/privacy',
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ]),
      ),
    ],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`This policy explains what ${siteConfig.name} collects, why we collect it, and the control you have over your information.`}
      sections={privacySections}
      ctaTitle="Questions About Your Privacy?"
      ctaDescription="Ask us anything about how your data is handled."
    />
  )
}
