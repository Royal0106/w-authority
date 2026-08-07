import type { Expertise, TimelineEntry, Value } from '~/types/content'

export const missionPillars: Array<Expertise> = [
  {
    slug: 'educate',
    title: 'Educate',
    description: 'Deliver practical, actionable knowledge that works.',
    icon: 'open-book',
  },
  {
    slug: 'inspire',
    title: 'Inspire',
    description: 'Motivate women to take ownership of their lives.',
    icon: 'star',
  },
  {
    slug: 'equip',
    title: 'Equip',
    description: 'Provide tools and frameworks for success.',
    icon: 'shopping-bag',
  },
  {
    slug: 'empower',
    title: 'Empower',
    description: 'Help women create a lasting impact.',
    icon: 'heart',
  },
]

export const values: Array<Value> = [
  {
    title: 'Integrity',
    description: "We do what's right, even when no one is watching.",
    icon: 'shield',
  },
  {
    title: 'Excellence',
    description: 'We strive for the highest standards in everything we do.',
    icon: 'diamond',
  },
  {
    title: 'Growth',
    description: 'We are committed to continuous learning and improvement.',
    icon: 'leaf',
  },
  {
    title: 'Impact',
    description: 'We focus on making a meaningful difference in the lives of others.',
    icon: 'heart',
  },
  {
    title: 'Authenticity',
    description: 'We stay real, transparent, and true to who we are.',
    icon: 'user-check',
  },
]

export const achievements = [
  '20+ Years in Business Strategy & Marketing',
  'Built Multiple 7-Figure Online Businesses',
  'Featured in Top Business & Tech Publications',
  'Certified in AI Strategy & Automation',
  'Mentored Thousands of Women Leaders',
]

export const featuredIn = [
  'Forbes',
  'Entrepreneur',
  'Inc.',
  'TIME',
  'Adobe',
  'Google',
  'Microsoft',
  'Shopify',
]

export const timeline: Array<TimelineEntry> = [
  {
    year: '2004',
    title: 'The first hard lesson',
    description:
      'Started out with big ambitions, no roadmap, and a business that taught more by failing than succeeding.',
  },
  {
    year: '2009',
    title: 'Systems over hustle',
    description:
      'Rebuilt everything around repeatable systems and discovered that structure, not effort, was the missing piece.',
  },
  {
    year: '2014',
    title: 'First seven figures',
    description:
      'Scaled a business past seven figures and started documenting the frameworks that made it possible.',
  },
  {
    year: '2018',
    title: 'Woman Authority begins',
    description:
      'Launched the platform to put those frameworks in the hands of women who were being handed motivation instead of method.',
  },
  {
    year: '2021',
    title: 'Enter AI',
    description:
      'Started advising organisations on AI strategy and automation, long before it was on every agenda.',
  },
  {
    year: '2024',
    title: 'A global community',
    description:
      'Over half a million women reached, 500+ events delivered, and a mission that has not changed once.',
  },
]

export const workTogetherOptions: Array<Expertise> = [
  {
    slug: 'strategy-sessions',
    title: '1-on-1 Strategy Sessions',
    description: 'Focused sessions to unlock the next stage of growth.',
    icon: 'target',
  },
  {
    slug: 'ai-business-consulting',
    title: 'AI & Business Consulting',
    description: 'Implementation support from strategy through rollout.',
    icon: 'cpu',
  },
  {
    slug: 'speaking-events',
    title: 'Speaking & Events',
    description: 'Keynotes and workshops for teams and conferences.',
    icon: 'mic',
  },
  {
    slug: 'content-collaboration',
    title: 'Content Collaboration',
    description: 'Partnerships, features and co-created resources.',
    icon: 'heart-handshake',
  },
]

export const contactReasons: Array<{
  title: string
  description: string
  email: string
  icon: import('~/types/content').IconName
}> = [
  {
    title: 'General Inquiries',
    description: 'Questions about content, collaborations, or partnerships.',
    email: 'hello@womanauthority.com',
    icon: 'mail',
  },
  {
    title: 'Work With Me',
    description: 'Interested in consulting, speaking, or creating together?',
    email: 'work@womanauthority.com',
    icon: 'briefcase',
  },
  {
    title: 'Speaking Requests',
    description: 'Book me for your next event or conference.',
    email: 'speaking@womanauthority.com',
    icon: 'mic',
  },
  {
    title: 'Partnerships',
    description: 'Explore brand partnerships and collaborations.',
    email: 'partnerships@womanauthority.com',
    icon: 'users',
  },
  {
    title: 'Support',
    description: "Need help with something? We're here for you.",
    email: 'support@womanauthority.com',
    icon: 'headset',
  },
]

export const contactPromises: Array<{ title: string; subtitle: string; icon: import('~/types/content').IconName }> = [
  { title: 'Quick Response', subtitle: 'We reply within 24 hours', icon: 'message-circle' },
  { title: 'Real People', subtitle: 'Talk to our team', icon: 'heart' },
  { title: 'Confidential', subtitle: 'Your info is always safe', icon: 'shield-check' },
  { title: 'Genuine Support', subtitle: "We're here to help", icon: 'heart-handshake' },
]
