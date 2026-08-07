import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ElementType, ReactNode } from 'react'
import { cn } from '~/lib/cn'

/**
 * Shared motion vocabulary.
 *
 * All page-level animation goes through these tokens so the site reads as one
 * system: short durations, a single premium easing curve, small distances.
 */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_PREMIUM } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE_PREMIUM } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

type RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Seconds to wait before the animation starts. */
  delay?: number
  variants?: Variants
  /** Play once when scrolled into view (default) or every time. */
  once?: boolean
  /** Negative margin shrinks the trigger area so reveals fire mid-viewport. */
  amount?: number
}

/**
 * Scroll-triggered entrance. Falls back to a plain element when the user has
 * asked for reduced motion, so nothing ever animates against their setting.
 */
export function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
  variants = fadeUp,
  once = true,
  amount = 0.2,
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div'] ?? motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Container that reveals its children one after another. Pair with
 * `<RevealItem>` for each child.
 */
export function RevealGroup({
  children,
  className,
  as = 'div',
  staggerChildren = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.15,
}: Omit<RevealProps, 'variants' | 'delay'> & {
  staggerChildren?: number
  delayChildren?: number
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div'] ?? motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={stagger(staggerChildren, delayChildren)}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({
  children,
  className,
  as = 'div',
  variants = fadeUp,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
  variants?: Variants
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div'] ?? motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  )
}

/** Subtle lift used on cards and tiles that link somewhere. */
export function HoverLift({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  )
}
