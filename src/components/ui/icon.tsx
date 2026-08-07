import {
  Apple,
  ArrowRight,
  Award,
  BarChart3,
  Bookmark,
  Brain,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  Clock,
  Copyright,
  Cpu,
  Dumbbell,
  Gauge,
  Gem,
  Globe,
  GraduationCap,
  Headset,
  Heart,
  HeartHandshake,
  HeartPulse,
  Home,
  Info,
  Lamp,
  Laptop,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Mic,
  Monitor,
  Moon,
  MoreVertical,
  Phone,
  Presentation,
  Repeat,
  Rocket,
  Scale,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  SquareCheckBig,
  Star,
  Store,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  UserRoundCheck,
  Users,
  Watch,
  Wrench,
  X,
  XOctagon,
  BookOpen,
  Flower2,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import type { IconName } from '~/types/content'
import { cn } from '~/lib/cn'

type BrandIconProps = SVGProps<SVGSVGElement>

/* Brand marks are not part of the Lucide set, so they are drawn here to keep
   the icon API uniform for consumers. */

function InstagramIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15.5 3h-2.2A4.3 4.3 0 0 0 9 7.3V10H6.6v3.4H9V21h3.4v-7.6h2.5l.5-3.4h-3V7.6c0-.7.4-1.2 1.2-1.2h1.9V3Z" />
    </svg>
  )
}

function PinterestIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M9.6 20.2c-.5-1.4-.2-3 .1-4.3l1-4.2" />
      <path d="M8.8 11.2c-.6-2.4 1-4.8 3.7-4.8 2.2 0 3.7 1.4 3.7 3.5 0 2.6-1.4 4.6-3.4 4.6-1 0-1.8-.9-1.5-1.9" />
    </svg>
  )
}

function YoutubeIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2.4" y="5.4" width="19.2" height="13.2" rx="4" />
      <path d="M10.4 9.4 15 12l-4.6 2.6V9.4Z" />
    </svg>
  )
}

function LinkedinIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="3.4" />
      <path d="M7.2 10.4V17" />
      <circle cx="7.2" cy="7.3" r="1" fill="currentColor" stroke="none" />
      <path d="M11.4 17v-3.7a2.5 2.5 0 0 1 5 0V17M11.4 10.4V17" />
    </svg>
  )
}

const ICONS = {
  apple: Apple,
  'arrow-right': ArrowRight,
  award: Award,
  'bar-chart': BarChart3,
  bookmark: Bookmark,
  brain: Brain,
  briefcase: Briefcase,
  building: Building2,
  calendar: CalendarDays,
  check: Check,
  clock: Clock,
  copyright: Copyright,
  cpu: Cpu,
  diamond: Gem,
  dumbbell: Dumbbell,
  ellipsis: MoreVertical,
  facebook: FacebookIcon,
  'file-check': SquareCheckBig,
  flower: Flower2,
  gauge: Gauge,
  globe: Globe,
  'graduation-cap': GraduationCap,
  headset: Headset,
  heart: Heart,
  'heart-handshake': HeartHandshake,
  'heart-pulse': HeartPulse,
  home: Home,
  info: Info,
  instagram: InstagramIcon,
  lamp: Lamp,
  laptop: Laptop,
  leaf: Leaf,
  lightbulb: Lightbulb,
  linkedin: LinkedinIcon,
  mail: Mail,
  'map-pin': MapPin,
  megaphone: Megaphone,
  'message-circle': MessageCircle,
  mic: Mic,
  monitor: Monitor,
  moon: Moon,
  'octagon-x': XOctagon,
  'open-book': BookOpen,
  phone: Phone,
  pinterest: PinterestIcon,
  presentation: Presentation,
  repeat: Repeat,
  rocket: Rocket,
  scale: Scale,
  search: Search,
  settings: Settings,
  shield: Shield,
  'shield-alert': ShieldAlert,
  'shield-check': ShieldCheck,
  shirt: Shirt,
  'shopping-bag': ShoppingBag,
  'shopping-cart': ShoppingCart,
  sparkles: Sparkles,
  star: Star,
  store: Store,
  target: Target,
  timer: Timer,
  'trending-up': TrendingUp,
  trophy: Trophy,
  'user-check': UserRoundCheck,
  users: Users,
  watch: Watch,
  wrench: Wrench,
  x: X,
  youtube: YoutubeIcon,
} satisfies Record<IconName, ComponentType<BrandIconProps>>

export type IconProps = {
  name: IconName
  className?: string
  /** Icons are decorative by default; pass a label to expose one to AT. */
  label?: string
  strokeWidth?: number
}

export function Icon({ name, className, label, strokeWidth = 1.5 }: IconProps) {
  const Component = ICONS[name]
  return (
    <Component
      className={cn('size-5 shrink-0', className)}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
    />
  )
}

export const iconNames = Object.keys(ICONS) as Array<IconName>
