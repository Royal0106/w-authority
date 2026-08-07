import type { FileRoutesByTo } from '~/routeTree.gen'
import type { ImageKey } from '~/data/images.generated'

/** Any path the router knows about. Keeps nav links honest at compile time. */
export type AppPath = keyof FileRoutesByTo

export type NavChild = {
  label: string
  description: string
  to: AppPath
  /** Optional search params, e.g. filtering the blog by category. */
  search?: Record<string, string>
  icon: string
}

export type NavItem = {
  label: string
  to: AppPath
  search?: Record<string, string>
  /** When present the item renders as a mega menu trigger on desktop. */
  children?: Array<NavChild>
  featured?: {
    eyebrow: string
    title: string
    description: string
    to: AppPath
    image: ImageKey
  }
}

export const primaryNav: Array<NavItem> = [
  { label: 'Home', to: '/' },
  {
    label: 'Fitness',
    to: '/blog',
    search: { category: 'fitness' },
    children: [
      { label: 'Strength Training', description: 'Build real, lasting strength.', to: '/blog', search: { category: 'fitness' }, icon: 'dumbbell' },
      { label: 'Nutrition', description: 'Fuel performance, not fads.', to: '/blog', search: { category: 'fitness' }, icon: 'apple' },
      { label: 'Recovery', description: 'Sleep, mobility and rest.', to: '/blog', search: { category: 'fitness' }, icon: 'moon' },
      { label: 'Wellness', description: 'Mind, body and soul care.', to: '/blog', search: { category: 'wellness' }, icon: 'heart-pulse' },
    ],
    featured: {
      eyebrow: 'Most read',
      title: '7 Strength Training Mistakes That Are Holding You Back',
      description: 'Avoid common gym mistakes and start seeing real results.',
      to: '/blog',
      image: 'editorial/fitness-featured',
    },
  },
  {
    label: 'Style',
    to: '/blog',
    search: { category: 'style' },
    children: [
      { label: 'Capsule Wardrobe', description: 'Fewer pieces, more outfits.', to: '/blog', search: { category: 'style' }, icon: 'shirt' },
      { label: 'Grooming', description: 'Skin, hair and daily rituals.', to: '/blog', search: { category: 'grooming' }, icon: 'sparkles' },
      { label: 'Accessories', description: 'The details that finish a look.', to: '/blog', search: { category: 'gear' }, icon: 'watch' },
      { label: 'Shop Edit', description: 'Pieces we actually use.', to: '/blog', search: { category: 'gear' }, icon: 'shopping-bag' },
    ],
  },
  {
    label: 'Success',
    to: '/blog',
    search: { category: 'success' },
    children: [
      { label: 'Career Growth', description: 'Get seen, get paid, get promoted.', to: '/blog', search: { category: 'success' }, icon: 'trending-up' },
      { label: 'Productivity', description: 'Systems that protect your focus.', to: '/blog', search: { category: 'productivity' }, icon: 'timer' },
      { label: 'Leadership', description: 'Lead with clarity and conviction.', to: '/blog', search: { category: 'leadership' }, icon: 'users' },
      { label: 'AI for Business', description: 'Practical AI, no hype.', to: '/ai-for-business', icon: 'cpu' },
    ],
    featured: {
      eyebrow: 'Free framework',
      title: 'The AI Advantage Playbook',
      description: 'A 5-step framework for putting AI to work in your business.',
      to: '/ai-for-business',
      image: 'editorial/success-featured',
    },
  },
  {
    label: 'Relationships',
    to: '/blog',
    search: { category: 'relationships' },
    children: [
      { label: 'Communication', description: 'Say the hard things well.', to: '/blog', search: { category: 'relationships' }, icon: 'message-circle' },
      { label: 'Boundaries', description: 'Protect your time and energy.', to: '/blog', search: { category: 'relationships' }, icon: 'shield' },
      { label: 'Community', description: 'Build a circle that lifts you.', to: '/blog', search: { category: 'relationships' }, icon: 'heart' },
    ],
  },
  {
    label: 'Growth',
    to: '/blog',
    search: { category: 'growth' },
    children: [
      { label: 'Mindset', description: 'Think like a high performer.', to: '/blog', search: { category: 'mindset' }, icon: 'brain' },
      { label: 'Habits', description: 'Small wins, compounded.', to: '/blog', search: { category: 'growth' }, icon: 'repeat' },
      { label: 'Speaking', description: 'Book Brian for your next event.', to: '/speaking', icon: 'mic' },
      { label: 'Coaching', description: '1:1 strategy sessions.', to: '/booking', icon: 'calendar' },
    ],
  },
  { label: 'Shop', to: '/expertise' },
]

export const utilityNav: Array<{ label: string; to: AppPath }> = [
  { label: 'About', to: '/about' },
  { label: 'Write For Us', to: '/contact' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav: Array<{ title: string; links: Array<{ label: string; to: AppPath; search?: Record<string, string> }> }> = [
  {
    title: 'Explore',
    links: [
      { label: 'Fitness', to: '/blog', search: { category: 'fitness' } },
      { label: 'Style', to: '/blog', search: { category: 'style' } },
      { label: 'Success', to: '/blog', search: { category: 'success' } },
      { label: 'Relationships', to: '/blog', search: { category: 'relationships' } },
      { label: 'Growth', to: '/blog', search: { category: 'growth' } },
      { label: 'Shop', to: '/expertise' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Articles', to: '/blog' },
      { label: 'Guides', to: '/blog' },
      { label: 'Newsletter', to: '/newsletter' },
      { label: 'Podcast', to: '/speaking' },
      { label: 'Free Tools', to: '/ai-for-business' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Write For Us', to: '/contact' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
]
