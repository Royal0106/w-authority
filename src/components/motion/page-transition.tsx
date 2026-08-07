import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_PREMIUM } from './reveal'

/**
 * Wraps route content in a short cross-fade so navigation feels continuous
 * rather than a hard swap. Keyed by pathname from the caller.
 */
export function PageTransition({
  children,
  routeKey,
}: {
  children: ReactNode
  routeKey: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <>{children}</>

  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  )
}
