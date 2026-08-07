import { useEffect, useState, type RefObject } from 'react'

/**
 * Fraction (0–1) of `target` that has been scrolled past.
 *
 * Measured against the element rather than the whole document so the article
 * progress bar ignores the header, footer and comment thread — it reports
 * progress through the *reading*, which is what a reader actually cares about.
 */
export function useScrollProgress(target: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = target.current
    if (!element) return

    let frame = 0
    const measure = () => {
      frame = 0
      const { top, height } = element.getBoundingClientRect()
      // Distance scrolled into the element, over its scrollable length.
      const scrolled = -top
      const scrollable = height - window.innerHeight
      if (scrollable <= 0) {
        setProgress(top <= 0 ? 1 : 0)
        return
      }
      setProgress(Math.min(1, Math.max(0, scrolled / scrollable)))
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [target])

  return progress
}

/** True once the page has been scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      setPast(window.scrollY > threshold)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return past
}
