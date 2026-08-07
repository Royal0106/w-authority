/**
 * Site-wide configuration.
 *
 * Everything an editor is likely to change without touching a component —
 * brand copy, contact details, social profiles — lives here.
 */
export const siteConfig = {
  name: 'Woman Authority',
  tagline: 'Inspire. Empower. Lead.',
  shortMark: 'WA',
  description:
    'Woman Authority is a movement dedicated to helping women build confidence, create success, and live with purpose — expert advice on fitness, style, success, and mindset for the modern woman.',
  url: 'https://www.womanauthority.com',
  ogImage: '/images/hero/home-1600w.jpg',

  author: {
    name: 'Brian Hanson',
    role: 'Business Strategist. AI Consultant. Content Creator.',
    bio: 'Business Strategist, AI Consultant, and Content Creator. I help women and organizations leverage strategy, systems, and technology to achieve extraordinary results.',
    avatar: 'people/author',
    signature: 'Brian Hanson',
  },

  contact: {
    generalEmail: 'hello@womanauthority.com',
    workEmail: 'work@womanauthority.com',
    speakingEmail: 'speaking@womanauthority.com',
    partnershipsEmail: 'partnerships@womanauthority.com',
    supportEmail: 'support@womanauthority.com',
    phone: '+1 (512) 123-4567',
    phoneHours: 'Mon – Fri, 9AM – 6PM CST',
    addressLines: ['1230 Rosewood Blvd, Suite 200', 'Austin, TX 78701'],
    addressCity: 'Austin, Texas, USA',
    fullAddress: '12300 Rosewood Blvd, Suite 200, Austin, TX 78701, USA',
    businessHours: ['Monday – Friday: 9AM – 6PM CST', 'Saturday – Sunday: Closed'],
    website: 'www.womanauthority.com',
  },

  announcement: {
    label: 'NEW',
    text: 'The Ultimate Morning Routine Guide for High Performing Women',
    /** Slug of the article the strip links to. */
    articleSlug: 'the-morning-routine-of-highly-successful-women',
  },

  newsletter: {
    subscribers: '100,000+',
    promises: ['No spam', 'Unsubscribe anytime', '100% value, no fluff'],
  },

  social: {
    twitterHandle: '@womanauthority',
    profiles: [
      { name: 'Instagram', handle: '@womanauthority', href: 'https://instagram.com/womanauthority', icon: 'instagram' },
      { name: 'Facebook', handle: '@womanauthority', href: 'https://facebook.com/womanauthority', icon: 'facebook' },
      { name: 'Pinterest', handle: '@womanauthority', href: 'https://pinterest.com/womanauthority', icon: 'pinterest' },
      { name: 'YouTube', handle: '@womanauthority', href: 'https://youtube.com/@womanauthority', icon: 'youtube' },
      { name: 'LinkedIn', handle: '/womanauthority', href: 'https://linkedin.com/company/womanauthority', icon: 'linkedin' },
    ],
  },

  legal: {
    lastUpdated: '2024-05-16',
    entity: 'Woman Authority',
    governingState: 'Texas',
    governingCourts: 'Austin, Texas',
  },
} as const

export type SiteConfig = typeof siteConfig
