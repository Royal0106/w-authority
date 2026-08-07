import type { SessionType } from '~/types/content'

export const sessionTypes: Array<SessionType> = [
  {
    slug: 'clarity-call',
    name: 'Clarity Call',
    duration: '45 minutes',
    price: '$250',
    description: 'One problem, examined properly. Best when you already know the question.',
    includes: ['Pre-session intake review', 'Live working session', 'Written summary within 48h'],
    icon: 'message-circle',
  },
  {
    slug: 'strategy-session',
    name: 'Strategy Session',
    duration: '90 minutes',
    price: '$650',
    description: 'A full working session on growth, systems or an AI roadmap.',
    includes: [
      'Deep pre-work on your business',
      'Live strategy build',
      'Prioritised 90-day roadmap',
      'Two weeks of follow-up email',
    ],
    icon: 'target',
    popular: true,
  },
  {
    slug: 'team-workshop',
    name: 'Team Workshop',
    duration: 'Half or full day',
    price: 'From $4,500',
    description: 'Bring the whole team. Leave with a plan everyone helped build.',
    includes: [
      'Stakeholder interviews beforehand',
      'Facilitated working sessions',
      'Documented decisions and owners',
      '30-day check-in',
    ],
    icon: 'users',
  },
]

export const whoItsFor = [
  {
    title: 'Founders scaling past themselves',
    description:
      'You have proven the model. Now the constraint is you being in every decision.',
  },
  {
    title: 'Leaders inheriting a mess',
    description:
      'New role, unclear systems, and a team waiting to see what you prioritise first.',
  },
  {
    title: 'Operators with an AI mandate',
    description:
      'Someone above you has asked for an AI plan and you want it to be a real one.',
  },
  {
    title: 'Consultants building a practice',
    description: 'You are excellent at the work and want the business around it to match.',
  },
]

/** Availability shown by the calendar UI. Wire to a real scheduler in production. */
export const availableSlots: Record<string, Array<string>> = {
  '2024-06-04': ['09:00', '11:30', '14:00'],
  '2024-06-05': ['10:00', '15:30'],
  '2024-06-06': ['09:30', '13:00', '16:00'],
  '2024-06-11': ['09:00', '11:00', '14:30'],
  '2024-06-12': ['10:30', '13:30'],
  '2024-06-13': ['09:00', '15:00', '16:30'],
  '2024-06-18': ['11:00', '14:00'],
  '2024-06-19': ['09:30', '13:00', '15:30'],
  '2024-06-20': ['10:00', '12:30', '16:00'],
}
