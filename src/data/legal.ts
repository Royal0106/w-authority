import { siteConfig } from '~/config/site'
import type { LegalSection } from '~/types/content'

export const termsSections: Array<LegalSection> = [
  {
    number: '01',
    title: 'Introduction',
    icon: 'info',
    paragraphs: [
      `Welcome to ${siteConfig.name}. By accessing or using our website, content, products, or services, you agree to be bound by these Terms of Service and all applicable laws and regulations.`,
      'If you do not agree with any part of these Terms, you must not use our website or services.',
    ],
  },
  {
    number: '02',
    title: 'Website Usage',
    icon: 'monitor',
    paragraphs: [
      'Our website is provided for informational and educational purposes only. We reserve the right to modify, suspend, or discontinue any part of the website or services at any time without prior notice.',
      'We do not guarantee that the website will be error-free, secure, or available at all times.',
    ],
  },
  {
    number: '03',
    title: 'User Responsibilities',
    icon: 'user-check',
    paragraphs: [
      "You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the website. You must not use the site to:",
    ],
    bullets: [
      'Post or transmit any harmful, unlawful, or misleading content',
      'Attempt to gain unauthorized access to any part of the website or systems',
      "Interfere with the website's functionality or security",
    ],
  },
  {
    number: '04',
    title: 'Intellectual Property',
    icon: 'copyright',
    paragraphs: [
      `All content on this website, including text, graphics, logos, images, videos, and software, is the property of ${siteConfig.name} or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without our prior written consent.`,
    ],
  },
  {
    number: '05',
    title: 'Liability',
    icon: 'shield-alert',
    paragraphs: [
      `${siteConfig.name} and its team are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use our website or services.`,
      'All information is provided "as is" without warranty of any kind.',
    ],
  },
  {
    number: '06',
    title: 'Termination',
    icon: 'octagon-x',
    paragraphs: [
      'We reserve the right to terminate or restrict your access to our website or services at our sole discretion, without notice or liability, for any reason—including if we believe you have violated these Terms.',
    ],
  },
  {
    number: '07',
    title: 'Governing Law',
    icon: 'scale',
    paragraphs: [
      `These Terms shall be governed by and construed in accordance with the laws of the State of ${siteConfig.legal.governingState}, United States, without regard to its conflict of law principles. Any disputes arising from these Terms shall be resolved in the state or federal courts located in ${siteConfig.legal.governingCourts}.`,
    ],
  },
  {
    number: '08',
    title: 'Contact',
    icon: 'mail',
    paragraphs: ['If you have any questions about these Terms of Service, please contact us:'],
    contact: true,
  },
]

export const privacySections: Array<LegalSection> = [
  {
    number: '01',
    title: 'Introduction',
    icon: 'info',
    paragraphs: [
      `This Privacy Policy explains how ${siteConfig.name} collects, uses, and protects your personal information when you use our website, newsletter, and services.`,
      'By using our website, you consent to the practices described in this policy.',
    ],
  },
  {
    number: '02',
    title: 'Information We Collect',
    icon: 'file-check',
    paragraphs: ['We collect only what we need to run the site and deliver what you asked for:'],
    bullets: [
      'Information you give us — name, email address, and anything you include in a form',
      'Usage data — pages visited, referring source, and general device information',
      'Cookies and similar technologies used to remember your preferences',
    ],
  },
  {
    number: '03',
    title: 'How We Use Your Information',
    icon: 'settings',
    paragraphs: [
      'Your information is used to deliver the newsletter you subscribed to, respond to your inquiries, improve our content, and keep the website secure.',
      'We do not sell, rent, or trade your personal information to third parties.',
    ],
  },
  {
    number: '04',
    title: 'Cookies',
    icon: 'monitor',
    paragraphs: [
      'Cookies help us remember your theme preference, keep you signed in where relevant, and understand which content is useful. You can disable cookies in your browser settings, though some parts of the site may not work as intended.',
    ],
  },
  {
    number: '05',
    title: 'Third-Party Services',
    icon: 'globe',
    paragraphs: [
      'We use a small number of trusted providers for analytics, email delivery, and payment processing. Each processes data only on our instructions and under its own published privacy terms.',
    ],
  },
  {
    number: '06',
    title: 'Data Security',
    icon: 'shield-check',
    paragraphs: [
      'We use industry-standard safeguards to protect your data in transit and at rest. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    number: '07',
    title: 'Your Rights',
    icon: 'scale',
    paragraphs: ['Depending on where you live, you may have the right to:'],
    bullets: [
      'Access the personal information we hold about you',
      'Request correction or deletion of that information',
      'Withdraw consent and unsubscribe at any time',
      'Object to or restrict certain kinds of processing',
    ],
  },
  {
    number: '08',
    title: 'Contact',
    icon: 'mail',
    paragraphs: ['If you have any questions about this Privacy Policy, please contact us:'],
    contact: true,
  },
]
