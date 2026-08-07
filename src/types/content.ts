import type { ImageKey } from '~/data/images.generated'

/**
 * Content data models.
 *
 * These describe the shape the UI consumes. Swapping the static fixtures in
 * `src/data` for a CMS or API only requires returning these same shapes.
 */

export type CategorySlug =
  | 'fitness'
  | 'style'
  | 'success'
  | 'growth'
  | 'relationships'
  | 'wellness'
  | 'gear'
  | 'grooming'
  | 'mindset'
  | 'productivity'
  | 'leadership'
  | 'ai-for-business'

export type Category = {
  slug: CategorySlug
  name: string
  description: string
  icon: IconName
  articleCount: number
}

export type Author = {
  id: string
  name: string
  role: string
  bio: string
  avatar: ImageKey
  socials: Array<{ label: string; href: string; icon: IconName }>
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; id: string; text: string }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'image'; image: ImageKey; alt: string; caption?: string }
  | { type: 'list'; items: Array<string> }

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: CategorySlug
  author: Author
  publishedAt: string
  readMinutes: number
  image: ImageKey
  tags: Array<string>
  featured?: boolean
  editorsPick?: boolean
  popularity?: number
  commentCount?: number
  body: Array<ArticleBlock>
}

export type Testimonial = {
  id: string
  quote: string
  name: string
  title: string
  avatar?: ImageKey
  rating?: 1 | 2 | 3 | 4 | 5
}

export type Statistic = {
  value: string
  label: string
  icon?: IconName
}

export type Expertise = {
  slug: string
  title: string
  description: string
  icon: IconName
}

export type TopicCard = {
  slug: string
  title: string
  description: string
  image: ImageKey
}

export type ProcessStep = {
  step: string
  title: string
  description: string
  icon: IconName
}

export type CaseStudy = {
  slug: string
  client: string
  result: string
  detail: string
  image: ImageKey
  tags: Array<string>
}

export type FaqItem = {
  question: string
  answer: string
}

export type TimelineEntry = {
  year: string
  title: string
  description: string
}

export type Value = {
  title: string
  description: string
  icon: IconName
}

export type Product = {
  slug: string
  name: string
  price: number
  rating: number
  reviewCount: number
  image: ImageKey
}

export type SpeakingTopic = {
  slug: string
  title: string
  description: string
  icon: IconName
  image: ImageKey
}

export type Keynote = {
  slug: string
  title: string
  description: string
  image: ImageKey
}

export type SpeakingFormat = {
  title: string
  description: string
  icon: IconName
}

export type PastEvent = {
  name: string
  location: string
  date: string
  audience: string
}

export type SessionType = {
  slug: string
  name: string
  duration: string
  price: string
  description: string
  includes: Array<string>
  icon: IconName
  popular?: boolean
}

export type LegalSection = {
  number: string
  title: string
  icon: IconName
  paragraphs: Array<string>
  bullets?: Array<string>
  contact?: boolean
}

/**
 * Icon names understood by `<Icon />`. Keeping this a union means a typo in a
 * data file is a type error rather than a missing glyph at runtime.
 */
export type IconName =
  | 'apple'
  | 'arrow-right'
  | 'award'
  | 'bar-chart'
  | 'bookmark'
  | 'brain'
  | 'briefcase'
  | 'building'
  | 'calendar'
  | 'check'
  | 'clock'
  | 'copyright'
  | 'cpu'
  | 'diamond'
  | 'dumbbell'
  | 'ellipsis'
  | 'facebook'
  | 'file-check'
  | 'flower'
  | 'gauge'
  | 'globe'
  | 'graduation-cap'
  | 'headset'
  | 'heart'
  | 'heart-handshake'
  | 'heart-pulse'
  | 'home'
  | 'info'
  | 'instagram'
  | 'lamp'
  | 'laptop'
  | 'leaf'
  | 'lightbulb'
  | 'linkedin'
  | 'mail'
  | 'map-pin'
  | 'megaphone'
  | 'message-circle'
  | 'mic'
  | 'monitor'
  | 'moon'
  | 'octagon-x'
  | 'open-book'
  | 'phone'
  | 'pinterest'
  | 'presentation'
  | 'repeat'
  | 'rocket'
  | 'scale'
  | 'search'
  | 'settings'
  | 'shield'
  | 'shield-alert'
  | 'shield-check'
  | 'shirt'
  | 'shopping-bag'
  | 'shopping-cart'
  | 'sparkles'
  | 'star'
  | 'store'
  | 'target'
  | 'timer'
  | 'trending-up'
  | 'trophy'
  | 'user-check'
  | 'users'
  | 'watch'
  | 'wrench'
  | 'x'
  | 'youtube'
