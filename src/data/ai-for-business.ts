import type { Expertise, ProcessStep, Statistic } from '~/types/content'

/**
 * Content for the AI for Business page.
 *
 * No design was supplied for this page, so it is composed from the same
 * primitives as the designed pages — see README for the full list.
 */

export const businessProblems: Array<Expertise> = [
  {
    slug: 'manual-work',
    title: 'Too much manual work',
    description: 'Your team spends its best hours on tasks a system should already be handling.',
    icon: 'timer',
  },
  {
    slug: 'slow-content',
    title: 'Content that cannot keep up',
    description: 'Marketing output is capped by how fast one or two people can write.',
    icon: 'megaphone',
  },
  {
    slug: 'scattered-data',
    title: 'Answers buried in data',
    description: 'The numbers exist, but nobody can get to them quickly enough to act.',
    icon: 'bar-chart',
  },
  {
    slug: 'inconsistent-service',
    title: 'Inconsistent customer experience',
    description: 'Response quality depends on who happens to pick up the ticket.',
    icon: 'headset',
  },
  {
    slug: 'no-clear-strategy',
    title: 'No clear AI strategy',
    description: 'Plenty of pilots, no roadmap, and nothing that made it into production.',
    icon: 'target',
  },
  {
    slug: 'adoption-resistance',
    title: 'A team that is not on board',
    description: 'The tools were bought. Nobody uses them. Adoption was never designed.',
    icon: 'users',
  },
]

export const aiSolutions: Array<Expertise> = [
  {
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    description: 'Map the repetitive work, then remove it — end to end, with human checkpoints.',
    icon: 'settings',
  },
  {
    slug: 'content-engine',
    title: 'AI Content Engine',
    description: 'A publishing system that keeps your voice and multiplies your output.',
    icon: 'open-book',
  },
  {
    slug: 'decision-support',
    title: 'Decision Support',
    description: 'Turn scattered data into answers your team can pull in seconds.',
    icon: 'lightbulb',
  },
  {
    slug: 'customer-operations',
    title: 'Customer Operations',
    description: 'Consistent, fast, on-brand support at any volume.',
    icon: 'heart-handshake',
  },
  {
    slug: 'enablement',
    title: 'Team Enablement',
    description: 'Training and playbooks so the change survives after we finish.',
    icon: 'graduation-cap',
  },
  {
    slug: 'governance',
    title: 'Governance & Safety',
    description: 'Clear policy on data, review and accountability from day one.',
    icon: 'shield-check',
  },
]

export const aiIndustries = [
  { name: 'E-Commerce', detail: 'Merchandising, support and lifecycle marketing.' },
  { name: 'Professional Services', detail: 'Proposals, research and delivery documentation.' },
  { name: 'SaaS', detail: 'Onboarding, in-product help and churn signals.' },
  { name: 'Healthcare', detail: 'Administrative load, scheduling and intake.' },
  { name: 'Education', detail: 'Course production, assessment and student support.' },
  { name: 'Coaching', detail: 'Programme delivery, follow-up and community.' },
]

export const aiFramework: Array<ProcessStep> = [
  {
    step: '01',
    title: 'Audit',
    description: 'We map every workflow and score it by hours spent and error cost.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Prioritise',
    description: 'We pick the two or three projects with the shortest path to real return.',
    icon: 'target',
  },
  {
    step: '03',
    title: 'Pilot',
    description: 'We build the smallest working version and measure it against the baseline.',
    icon: 'rocket',
  },
  {
    step: '04',
    title: 'Roll Out',
    description: 'We embed it in the team’s daily tools, with training and clear ownership.',
    icon: 'users',
  },
  {
    step: '05',
    title: 'Compound',
    description: 'We reinvest the hours returned into the next project on the roadmap.',
    icon: 'trending-up',
  },
]

export const roiMetrics: Array<Statistic> = [
  { value: '10+ hrs', label: 'Returned per person, per week', icon: 'timer' },
  { value: '62%', label: 'Lower cost per acquired customer', icon: 'bar-chart' },
  { value: '4x', label: 'Content output at the same headcount', icon: 'trending-up' },
  { value: '90 days', label: 'Typical time to measurable return', icon: 'calendar' },
]
