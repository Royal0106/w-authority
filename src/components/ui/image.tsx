import { useCallback, useEffect, useRef, useState } from 'react'
import { IMAGES, type ImageKey } from '~/data/images.generated'
import { cn } from '~/lib/cn'

export type { ImageKey }

/** Scrims that keep text readable when it sits over a photograph. */
const OVERLAYS = {
  none: null,
  /** Darkens the lower half — for captions and titles anchored to the bottom. */
  bottom: 'bg-linear-to-t from-ink-950/80 via-ink-950/25 to-transparent',
  /** Even wash — for full-bleed panels with centred text. */
  full: 'bg-ink-950/45',
  /** Barely-there lift, used to seat light UI on busy photography. */
  soft: 'bg-linear-to-t from-ink-950/30 to-transparent',
  /** Warms a photo into the blush page background along its left edge. */
  blend:
    'bg-linear-to-r from-blush-100 via-blush-100/25 to-transparent dark:from-canvas dark:via-canvas/30',
} as const

export type ImgProps = {
  /** Key into the generated photography manifest. */
  image: ImageKey
  /**
   * Overrides the manifest alt text. Pass `""` for decorative images whose
   * meaning is already carried by adjacent text — a card's own heading, say.
   */
  alt?: string
  className?: string
  /** Wrapper class — aspect ratio, rounding and positioning live here. */
  wrapperClassName?: string
  /** Above-the-fold images should opt out of lazy loading. */
  priority?: boolean
  /**
   * Responsive `sizes`. Defaults to the full viewport, which is safe but
   * over-fetches — pass a real value for images that render smaller.
   */
  sizes?: string
  objectPosition?: string
  overlay?: keyof typeof OVERLAYS
}

/**
 * Photograph with a blur-up placeholder.
 *
 * The wrapper reserves space so nothing shifts while the image decodes, and a
 * tiny inlined LQIP sits behind it in the meantime. A failed load leaves the
 * blur in place rather than showing a broken-image icon.
 */
export function Img({
  image,
  alt,
  className,
  wrapperClassName,
  priority = false,
  sizes = '100vw',
  objectPosition,
  overlay = 'none',
}: ImgProps) {
  const meta = IMAGES[image]
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // A server-rendered image is often already decoded by the time React
  // hydrates, so its `load` event has been and gone — check `complete` too, or
  // the fade-in never runs and the photo stays invisible.
  useEffect(() => {
    const element = ref.current
    if (element?.complete && element.naturalWidth > 0) setLoaded(true)
  }, [image])

  const onLoad = useCallback(() => setLoaded(true), [])

  return (
    <span
      className={cn('relative block overflow-hidden bg-surface-tint', wrapperClassName)}
      style={{
        backgroundImage: `url("${meta.blur}")`,
        backgroundSize: 'cover',
        backgroundPosition: objectPosition ?? 'center',
      }}
    >
      <img
        ref={ref}
        src={meta.src}
        srcSet={meta.srcSet}
        sizes={sizes}
        alt={alt ?? meta.alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={onLoad}
        style={objectPosition ? { objectPosition } : undefined}
        className={cn(
          'relative size-full object-cover',
          'transition-opacity duration-700 ease-[var(--ease-premium)]',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
      {overlay !== 'none' ? (
        <span aria-hidden="true" className={cn('absolute inset-0', OVERLAYS[overlay])} />
      ) : null}
    </span>
  )
}

/** Resolve a slot's largest source — used for OpenGraph and JSON-LD. */
export function imageSrc(image: ImageKey) {
  return IMAGES[image].src
}
