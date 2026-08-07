import type { Author } from '~/types/content'
import { siteConfig } from '~/config/site'

export const authors = {
  brian: {
    id: 'brian-hanson',
    name: siteConfig.author.name,
    role: siteConfig.author.role,
    bio: 'Business Strategist, AI Consultant, and Content Creator. I help women and organizations leverage strategy, systems, and technology to achieve extraordinary results.',
    avatar: 'people/author',
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/womanauthority', icon: 'instagram' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/womanauthority', icon: 'linkedin' },
      { label: 'YouTube', href: 'https://youtube.com/@womanauthority', icon: 'youtube' },
      { label: 'X', href: 'https://x.com/womanauthority', icon: 'x' },
    ],
  },
  mia: {
    id: 'mia-anderson',
    name: 'Mia Anderson',
    role: 'Strength & Conditioning Coach',
    bio: 'Strength coach helping women train with intention and build lifelong confidence in the gym.',
    avatar: 'people/mia-anderson',
    socials: [{ label: 'Instagram', href: 'https://instagram.com/womanauthority', icon: 'instagram' }],
  },
  jenna: {
    id: 'jenna-stone',
    name: 'Jenna Stone',
    role: 'Wealth & Finance Writer',
    bio: 'Writes about income, investing and building financial independence on your own terms.',
    avatar: 'people/jenna-stone',
    socials: [{ label: 'LinkedIn', href: 'https://linkedin.com/company/womanauthority', icon: 'linkedin' }],
  },
  alex: {
    id: 'alex-thomas',
    name: 'Alex Thomas',
    role: 'Style Editor',
    bio: 'Style editor focused on timeless pieces, capsule wardrobes and dressing with intent.',
    avatar: 'people/alex-thomas',
    socials: [{ label: 'Pinterest', href: 'https://pinterest.com/womanauthority', icon: 'pinterest' }],
  },
  daniel: {
    id: 'daniel-k',
    name: 'Daniel K.',
    role: 'Gear & Wellness Editor',
    bio: 'Tests the tools, gear and routines worth your money and your time.',
    avatar: 'people/daniel-k',
    socials: [{ label: 'YouTube', href: 'https://youtube.com/@womanauthority', icon: 'youtube' }],
  },
  jason: {
    id: 'jason-stone',
    name: 'Jason Stone',
    role: 'Productivity Writer',
    bio: 'Obsessed with focus, deep work and systems that survive a busy week.',
    avatar: 'people/jason-stone',
    socials: [{ label: 'LinkedIn', href: 'https://linkedin.com/company/womanauthority', icon: 'linkedin' }],
  },
  mark: {
    id: 'mark-mitchell',
    name: 'Mark Mitchell',
    role: 'Relationships Contributor',
    bio: 'Writes about communication, boundaries and the conversations that change relationships.',
    avatar: 'people/mark-mitchell',
    socials: [{ label: 'Instagram', href: 'https://instagram.com/womanauthority', icon: 'instagram' }],
  },
} satisfies Record<string, Author>

export type AuthorKey = keyof typeof authors
