import type {
  Expertise,
  Keynote,
  PastEvent,
  SpeakingFormat,
  SpeakingTopic,
  Statistic,
} from '~/types/content'
import type { ImageKey } from '~/data/images.generated'

export const speakingStats: Array<Statistic> = [
  { value: '20+', label: 'Years Speaking', icon: 'mic' },
  { value: '500+', label: 'Events Worldwide', icon: 'globe' },
  { value: '50,000+', label: 'Women Impacted', icon: 'users' },
  { value: '30+', label: 'Countries', icon: 'target' },
]

export const whyHireMe: Array<Expertise> = [
  {
    slug: 'real-world-experience',
    title: 'Real-World Experience',
    description: '20+ years building businesses and leading teams across industries.',
    icon: 'shield-check',
  },
  {
    slug: 'actionable-insights',
    title: 'Actionable Insights',
    description: 'Practical strategies your audience can implement immediately.',
    icon: 'trending-up',
  },
  {
    slug: 'engaging-relatable',
    title: 'Engaging & Relatable',
    description: 'Stories and examples that connect, inspire, and drive action.',
    icon: 'users',
  },
  {
    slug: 'proven-impact',
    title: 'Proven Impact',
    description: 'Trusted by global brands and organizations to deliver results.',
    icon: 'trophy',
  },
]

export const speakingTopics: Array<SpeakingTopic> = [
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    description: 'Leverage AI and automation to scale, innovate, and stay ahead of the competition.',
    icon: 'cpu',
    image: 'speaking/ai-automation',
  },
  {
    slug: 'leadership',
    title: 'Leadership',
    description: 'Build strong leaders and high-performance teams that get results.',
    icon: 'users',
    image: 'speaking/leadership',
  },
  {
    slug: 'business-growth',
    title: 'Business Growth',
    description: 'Proven strategies to grow revenue, increase profit, and scale sustainably.',
    icon: 'trending-up',
    image: 'speaking/business-growth',
  },
  {
    slug: 'marketing-branding',
    title: 'Marketing & Branding',
    description: 'Build a personal or company brand that attracts attention and drives opportunities.',
    icon: 'megaphone',
    image: 'speaking/marketing-branding',
  },
  {
    slug: 'mindset-performance',
    title: 'Mindset & Performance',
    description: 'Develop the mindset and discipline needed for long-term success.',
    icon: 'brain',
    image: 'speaking/mindset-performance',
  },
]

export const keynotes: Array<Keynote> = [
  {
    slug: 'the-ai-advantage',
    title: 'The AI Advantage',
    description: 'How AI is transforming businesses and creating unprecedented opportunities.',
    image: 'speaking/keynote-ai-advantage',
  },
  {
    slug: 'build-a-future-proof-business',
    title: 'Build a Future-Proof Business',
    description: 'Systems, strategies, and models to create a business that thrives in any economy.',
    image: 'speaking/keynote-future-proof',
  },
  {
    slug: 'leaders-create-leaders',
    title: 'Leaders Create Leaders',
    description: 'How to build a culture of ownership, accountability, and high performance.',
    image: 'speaking/keynote-leaders',
  },
  {
    slug: 'personal-brand-real-impact',
    title: 'Personal Brand, Real Impact',
    description: 'Build influence, trust, and opportunities through your personal brand.',
    image: 'speaking/keynote-personal-brand',
  },
  {
    slug: 'the-high-performance-mindset',
    title: 'The High-Performance Mindset',
    description: 'Master your mindset and daily habits to perform at your highest level.',
    image: 'speaking/keynote-high-performance',
  },
]

export const speakingFormats: Array<SpeakingFormat> = [
  { title: 'Keynotes', description: 'High-energy, impactful presentations.', icon: 'mic' },
  { title: 'Half-Day Workshops', description: 'Deep dives into strategy and execution.', icon: 'users' },
  { title: 'Full-Day Workshops', description: 'Comprehensive training and interactive sessions.', icon: 'presentation' },
  { title: 'Executive Offsites', description: 'Custom sessions for leadership teams.', icon: 'briefcase' },
  { title: 'Virtual Sessions', description: 'Live online sessions that engage and inspire.', icon: 'monitor' },
]

export const audienceTypes = [
  'Corporate Teams',
  'Leadership Summits',
  "Women's Conferences",
  'Entrepreneur Events',
]

export const pastEvents: Array<PastEvent> = [
  { name: 'Global Women in Business Summit', location: 'Austin, TX', date: '2024-04-18', audience: '2,400 attendees' },
  { name: 'ScaleUp Leadership Forum', location: 'London, UK', date: '2024-03-07', audience: '900 attendees' },
  { name: 'AI & Enterprise Conference', location: 'Singapore', date: '2024-02-21', audience: '1,600 attendees' },
  { name: 'Founders Retreat', location: 'Lisbon, PT', date: '2023-11-09', audience: '120 founders' },
  { name: 'Fortune 500 Executive Offsite', location: 'New York, NY', date: '2023-09-14', audience: 'Leadership team' },
  { name: 'WomenLead Collective Annual', location: 'Toronto, CA', date: '2023-06-02', audience: '3,100 attendees' },
]

export const speakingVideos: Array<{
  id: string
  title: string
  description: string
  thumbnail: ImageKey
  duration: string
}> = [
  {
    id: 'reel',
    title: 'Speaking Reel 2024',
    description: 'Highlights from keynotes and workshops around the world.',
    thumbnail: 'speaking/reel',
    duration: '2:48',
  },
  {
    id: 'ai-keynote',
    title: 'The AI Advantage — Keynote Excerpt',
    description: 'A 6-minute excerpt from the AI Advantage keynote.',
    thumbnail: 'speaking/keynote-ai-advantage',
    duration: '6:12',
  },
  {
    id: 'leadership-workshop',
    title: 'Leaders Create Leaders — Workshop',
    description: 'How to build accountability into a team culture.',
    thumbnail: 'speaking/keynote-leaders',
    duration: '9:30',
  },
]

export const eventTypes = [
  'Keynote',
  'Half-Day Workshop',
  'Full-Day Workshop',
  'Executive Offsite',
  'Virtual Session',
  'Panel or Fireside Chat',
]
