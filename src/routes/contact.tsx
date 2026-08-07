import { createFileRoute } from '@tanstack/react-router'
import { Accent, Container, Section } from '~/components/layout/section'
import { Reveal, RevealGroup, RevealItem, scaleIn } from '~/components/motion/reveal'
import { ContactForm } from '~/components/forms/contact-form'
import { FaqAccordion } from '~/components/sections/faq-section'
import { NewsletterBand } from '~/components/sections/newsletter-band'
import { PageHero, HeroFloatingCard } from '~/components/sections/page-hero'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Img } from '~/components/ui/image'
import { siteConfig } from '~/config/site'
import { contactPromises, contactReasons } from '~/data/about'
import { contactFaqs } from '~/data/faqs'
import { breadcrumbSchema, faqSchema, jsonLd, organizationSchema, seo } from '~/lib/seo'

export const Route = createFileRoute('/contact')({
  head: () => ({
    ...seo({
      title: 'Contact',
      description:
        'Have a question, want to work together, or just want to say hello? Reach the Woman Authority team — we reply within 24 hours.',
      path: '/contact',
    }),
    scripts: [
      jsonLd(organizationSchema()),
      jsonLd(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]),
      ),
      jsonLd(faqSchema(contactFaqs)),
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title={
          <>
            Let&rsquo;s Connect.
            <br />
            <Accent>Let&rsquo;s Make an Impact.</Accent>
          </>
        }
        description="Have a question, want to work together, or just want to say hello? I'd love to hear from you."
        image="hero/contact"
        imageAlt="The Woman Authority team at work"
        aside={
          <HeroFloatingCard className="lg:w-56">
            <Icon name="message-circle" className="size-5 text-brand" />
            <blockquote className="mt-3 font-display text-lg leading-snug text-content">
              Great things happen when we connect with purpose.
            </blockquote>
            <p className="mt-3 font-script text-base text-brand-strong">
              – {siteConfig.author.name}
            </p>
          </HeroFloatingCard>
        }
      >
        <Button asChild size="lg" className="mt-7">
          <a href="#contact-form">
            Send a Message
            <Icon name="arrow-right" className="size-3.5" />
          </a>
        </Button>

        <RevealGroup
          className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
          staggerChildren={0.06}
        >
          {contactPromises.map((promise) => (
            <RevealItem key={promise.title} className="flex flex-col gap-1.5">
              <Icon name={promise.icon} className="size-5 text-brand" />
              <span className="text-xs font-semibold text-content">{promise.title}</span>
              <span className="text-[11px] leading-tight text-content-muted">
                {promise.subtitle}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageHero>

      <ReasonsSection />
      <FormSection />
      <FaqSection />
      <SocialBand />
      <NewsletterBand />
    </>
  )
}

/* --------------------------------------------------------------- Reasons */

function ReasonsSection() {
  return (
    <Section spacing="md">
      <Reveal>
        <p className="eyebrow">Get In Touch</p>
        <h2 className="mt-3 text-display-md">How Can We Help You?</h2>
      </Reveal>

      <RevealGroup
        className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        staggerChildren={0.06}
      >
        {contactReasons.map((reason) => (
          <RevealItem key={reason.title} className="h-full">
            <article className="flex h-full flex-col items-center gap-2.5 rounded-[var(--radius-card)] border border-hairline bg-surface-soft p-5 text-center transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand/40">
              <Icon name={reason.icon} className="size-7 text-brand" strokeWidth={1.3} />
              <h3 className="text-sm font-semibold text-content">{reason.title}</h3>
              <p className="text-xs leading-relaxed text-content-muted">{reason.description}</p>
              <a
                href={`mailto:${reason.email}`}
                className="mt-auto pt-2 text-xs font-medium text-brand transition-colors hover:text-brand-strong"
              >
                {reason.email}
              </a>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/* ------------------------------------------------------------------ Form */

function FormSection() {
  const { contact } = siteConfig

  return (
    <Section spacing="md" id="contact-form">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
        <Reveal className="rounded-[var(--radius-card)] bg-surface-tint p-6 md:p-8">
          <p className="eyebrow">Send Us a Message</p>
          <h2 className="mt-3 text-display-md">We&rsquo;d Love to Hear From You</h2>
          <ContactForm className="mt-6" />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow">Office Information</p>
          <ul className="mt-5 grid gap-5">
            <InfoItem icon="map-pin" title="Headquarters">
              <p>{contact.addressCity}</p>
              {contact.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </InfoItem>
            <InfoItem icon="phone" title="Call Us">
              <p>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="hover:text-brand">
                  {contact.phone}
                </a>
              </p>
              <p>{contact.phoneHours}</p>
            </InfoItem>
            <InfoItem icon="mail" title="Email Us">
              <p>
                <a href={`mailto:${contact.generalEmail}`} className="hover:text-brand">
                  {contact.generalEmail}
                </a>
              </p>
            </InfoItem>
            <InfoItem icon="clock" title="Business Hours">
              {contact.businessHours.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </InfoItem>
          </ul>
        </Reveal>

        <Reveal delay={0.16} variants={scaleIn} className="block">
          <Img
            image="misc/office"
            alt="The Woman Authority office reception"
            sizes="(min-width: 1024px) 380px, 90vw"
            wrapperClassName="aspect-4/5 size-full rounded-[var(--radius-card)]"
          />
        </Reveal>
      </div>
    </Section>
  )
}

function InfoItem({
  icon,
  title,
  children,
}: {
  icon: import('~/types/content').IconName
  title: string
  children: React.ReactNode
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-brand">
        <Icon name={icon} className="size-4" />
      </span>
      <div>
        <p className="text-xs font-semibold text-content">{title}</p>
        <div className="mt-1 grid gap-0.5 text-xs leading-relaxed text-content-muted">
          {children}
        </div>
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------- FAQ */

function FaqSection() {
  return (
    <Section spacing="md">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-display-md">Frequently Asked Questions</h2>
          <FaqAccordion items={contactFaqs} className="mt-6" />
        </Reveal>

        <Reveal delay={0.08} className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface-tint">
          <div className="grid h-full items-center gap-6 p-8 md:grid-cols-[1fr_0.8fr]">
            <div>
              <span className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-brand">
                  <Icon name="message-circle" className="size-5" />
                </span>
                <h2 className="font-display text-xl">Still have questions?</h2>
              </span>
              <p className="mt-4 text-sm leading-relaxed text-content-muted">
                You can&rsquo;t find the answer you&rsquo;re looking for, feel free to reach out.
                We&rsquo;re happy to help!
              </p>
              <Button asChild className="mt-6">
                <a href="#contact-form">
                  Get In Touch
                  <Icon name="arrow-right" className="size-3.5" />
                </a>
              </Button>
            </div>
            <Img
              image="misc/faq-flowers"
              alt=""
              sizes="(min-width: 1024px) 200px, 45vw"
              wrapperClassName="hidden aspect-square w-full rounded-[var(--radius-card)] md:block"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ----------------------------------------------------------- Social band */

function SocialBand() {
  return (
    <section className="bg-surface-soft py-12">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_2.1fr] lg:gap-12">
          <Reveal>
            <h2 className="font-display text-2xl">Let&rsquo;s Stay Connected</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-content-muted">
              Follow for daily insights, strategies, and inspiration to help you become your best
              self.
            </p>
          </Reveal>

          <RevealGroup
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5"
            staggerChildren={0.06}
          >
            {siteConfig.social.profiles.map((profile) => (
              <RevealItem key={profile.name}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-col items-center gap-2 text-center"
                >
                  <Icon
                    name={profile.icon as import('~/types/content').IconName}
                    className="size-6 text-brand transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-xs font-semibold text-content">{profile.name}</span>
                  <span className="text-[11px] text-content-muted">{profile.handle}</span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  )
}
