import type { Category, CategorySlug } from '~/types/content'

export const categories: Array<Category> = [
  { slug: 'fitness', name: 'Fitness', description: 'Train smarter, get stronger', icon: 'dumbbell', articleCount: 182 },
  { slug: 'style', name: 'Style', description: 'Look sharp, feel confident', icon: 'shirt', articleCount: 156 },
  { slug: 'success', name: 'Success', description: 'Build your wealth & mindset', icon: 'star', articleCount: 210 },
  { slug: 'growth', name: 'Growth', description: 'Elevate your daily routine', icon: 'leaf', articleCount: 178 },
  { slug: 'relationships', name: 'Relationships', description: 'Build stronger connections', icon: 'heart', articleCount: 146 },
  { slug: 'gear', name: 'Gear', description: 'Tools worth carrying', icon: 'shopping-bag', articleCount: 134 },
  { slug: 'ai-for-business', name: 'AI for Business', description: 'Practical AI, no hype', icon: 'sparkles', articleCount: 88 },
  { slug: 'wellness', name: 'Wellness', description: 'Mind, body & soul care', icon: 'heart-pulse', articleCount: 121 },
  { slug: 'grooming', name: 'Grooming', description: 'Skin, hair and daily rituals', icon: 'sparkles', articleCount: 94 },
  { slug: 'mindset', name: 'Mindset', description: 'Think like a high performer', icon: 'brain', articleCount: 112 },
  { slug: 'productivity', name: 'Productivity', description: 'Protect your focus', icon: 'timer', articleCount: 103 },
  { slug: 'leadership', name: 'Leadership', description: 'Lead with clarity', icon: 'users', articleCount: 87 },
]

/** The seven shown in the blog's “Browse Categories” row. */
export const browseCategories = categories.slice(0, 7)

/** The six shown on the home page's “Top Categories” row. */
export const topCategories: Array<Category> = [
  categories[0]!,
  categories[1]!,
  categories[2]!,
  categories[3]!,
  categories[4]!,
  categories[7]!,
]

const categoryMap = new Map<CategorySlug, Category>(categories.map((c) => [c.slug, c]))

export function getCategory(slug: CategorySlug) {
  return categoryMap.get(slug)
}

export function getCategoryName(slug: CategorySlug) {
  return categoryMap.get(slug)?.name ?? slug
}
