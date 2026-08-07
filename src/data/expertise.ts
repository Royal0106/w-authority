import type {
  CaseStudy,
  Expertise,
  ProcessStep,
  Statistic,
  TopicCard,
} from '~/types/content'

/** Home page — “Real Solutions for Real Results”. */
export const solutions: Array<Expertise> = [
  {
    slug: 'strategy-planning',
    title: 'Strategy & Planning',
    description: 'Create smart strategies that drive growth and long-term success.',
    icon: 'target',
  },
  {
    slug: 'brand-personal-growth',
    title: 'Brand & Personal Growth',
    description: 'Build your brand, boost confidence, and stand out with authenticity.',
    icon: 'diamond',
  },
  {
    slug: 'sales-conversion',
    title: 'Sales & Conversion',
    description: 'Optimize your offers and systems to attract and convert more clients.',
    icon: 'trending-up',
  },
  {
    slug: 'systems-automation',
    title: 'Systems & Automation',
    description: 'Build efficient systems that save time and increase profits.',
    icon: 'settings',
  },
  {
    slug: 'mindset-leadership',
    title: 'Mindset & Leadership',
    description: 'Strengthen your mindset and lead with purpose and confidence.',
    icon: 'users',
  },
  {
    slug: 'private-coaching',
    title: '1:1 Private Coaching',
    description: 'Personalized guidance to help you break through and scale faster.',
    icon: 'user-check',
  },
]

/** Expertise page — “Where Strategy Meets Real-World Impact”. */
export const expertiseAreas: Array<Expertise> = [
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    description: 'Implement AI tools and automate workflows for maximum efficiency.',
    icon: 'cpu',
  },
  {
    slug: 'leadership',
    title: 'Leadership',
    description: 'Develop leadership skills and confidence that inspire teams and drive growth.',
    icon: 'user-check',
  },
  {
    slug: 'marketing',
    title: 'Marketing',
    description: 'Create marketing strategies that attract, engage, and convert.',
    icon: 'megaphone',
  },
  {
    slug: 'business-growth',
    title: 'Business Growth',
    description: 'Design growth strategies that increase profit, impact, and value.',
    icon: 'bar-chart',
  },
  {
    slug: 'productivity',
    title: 'Productivity',
    description: 'Master productivity systems to achieve more with focus and clarity.',
    icon: 'gauge',
  },
  {
    slug: 'personal-branding',
    title: 'Personal Branding',
    description: 'Build a personal brand that opens doors and creates opportunities.',
    icon: 'star',
  },
]

export const featuredTopics: Array<TopicCard> = [
  {
    slug: 'ai-strategy',
    title: 'AI Strategy',
    description: 'Leverage AI to create competitive advantage.',
    image: 'topics/ai-strategy',
  },
  {
    slug: 'business-systems',
    title: 'Business Systems',
    description: 'Build systems that create freedom and scalability.',
    image: 'topics/business-systems',
  },
  {
    slug: 'high-performance-teams',
    title: 'High-Performance Teams',
    description: 'Build, lead, and scale elite teams.',
    image: 'topics/high-performance-teams',
  },
  {
    slug: 'content-personal-brand',
    title: 'Content & Personal Brand',
    description: 'Build authority and influence in your market.',
    image: 'topics/content-personal-brand',
  },
  {
    slug: 'mindset-habits',
    title: 'Mindset & Habits',
    description: 'Master your mind. Transform your life.',
    image: 'topics/mindset-habits',
  },
  {
    slug: 'financial-freedom',
    title: 'Financial Freedom',
    description: 'Strategies to build wealth and financial independence.',
    image: 'topics/financial-freedom',
  },
]

export const processSteps: Array<ProcessStep> = [
  {
    step: '01',
    title: 'Discover',
    description: 'We dive deep into your goals, challenges, and current situation.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Strategize',
    description: 'We create a customized strategy tailored to your goals and resources.',
    icon: 'target',
  },
  {
    step: '03',
    title: 'Implement',
    description: 'We put the plan into action with precision and accountability.',
    icon: 'file-check',
  },
  {
    step: '04',
    title: 'Optimize',
    description: 'We refine and optimize systems for maximum efficiency and impact.',
    icon: 'settings',
  },
  {
    step: '05',
    title: 'Scale',
    description: 'We scale what works and create long-term sustainable growth.',
    icon: 'bar-chart',
  },
]

export const caseStudies: Array<CaseStudy> = [
  {
    slug: 'ecommerce-brand',
    client: 'E-Commerce Brand',
    result: 'Increased revenue by 345% in 12 months.',
    detail:
      'Rebuilt the acquisition funnel around a single hero offer, then automated fulfilment and post-purchase follow-up end to end.',
    image: 'case-studies/ecommerce-brand',
    tags: ['Strategy', 'Automation'],
  },
  {
    slug: 'coaching-business',
    client: 'Coaching Business',
    result: 'Scaled from 6 to 7 figures in 16 months.',
    detail:
      'Productised the delivery model so revenue stopped depending on the founder being in every call.',
    image: 'case-studies/coaching-business',
    tags: ['Marketing', 'Systems'],
  },
  {
    slug: 'saas-company',
    client: 'SaaS Company',
    result: 'Reduced customer acquisition cost by 62%.',
    detail:
      'Replaced broad paid spend with an AI-assisted content engine and a tighter ICP definition.',
    image: 'case-studies/saas-company',
    tags: ['Growth', 'AI Strategy'],
  },
  {
    slug: 'personal-brand',
    client: 'Personal Brand',
    result: 'Grew audience to 300K+ and increased product sales 4x.',
    detail:
      'Built a repeatable publishing system and a launch calendar the team could actually sustain.',
    image: 'case-studies/personal-brand',
    tags: ['Branding', 'Content'],
  },
]

export const industries: Array<{ name: string; icon: import('~/types/content').IconName }> = [
  { name: 'Technology', icon: 'cpu' },
  { name: 'E-Commerce', icon: 'shopping-cart' },
  { name: 'Finance', icon: 'bar-chart' },
  { name: 'SaaS', icon: 'laptop' },
  { name: 'Healthcare', icon: 'heart-pulse' },
  { name: 'Education', icon: 'graduation-cap' },
  { name: 'Coaching', icon: 'users' },
  { name: 'Real Estate', icon: 'building' },
]

export const expertiseStats: Array<Statistic> = [
  { value: '20+', label: 'Years of Experience', icon: 'award' },
  { value: '500+', label: 'Women Helped', icon: 'heart' },
  { value: '1000+', label: 'Resources & Guides', icon: 'open-book' },
]

export const aboutStats: Array<Statistic> = [
  { value: '20+', label: 'Years of Experience', icon: 'award' },
  { value: '500K+', label: 'Women Inspired', icon: 'users' },
  { value: '1000+', label: 'Articles & Resources', icon: 'open-book' },
  { value: '1', label: 'Mission', icon: 'target' },
]

export const impactStats: Array<Statistic> = [
  { value: '20+', label: 'Years of Experience' },
  { value: '500K+', label: 'Women Inspired' },
  { value: '1000+', label: 'Articles & Resources' },
  { value: '1M+', label: 'Lives Impacted' },
]

export const heroTrustSignals: Array<{ title: string; subtitle: string; icon: import('~/types/content').IconName }> = [
  { title: '100% Trusted', subtitle: 'Expert Advice', icon: 'shield-check' },
  { title: 'Practical', subtitle: 'Real Results', icon: 'check' },
  { title: 'Built for Women', subtitle: 'By Women', icon: 'heart' },
  { title: 'Join 100K+', subtitle: 'Women Worldwide', icon: 'users' },
]
