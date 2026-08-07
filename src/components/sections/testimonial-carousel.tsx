import { TestimonialCard } from '~/components/cards'
import { Carousel, CarouselSlide } from '~/components/common/carousel'
import { Reveal } from '~/components/motion/reveal'
import type { Testimonial } from '~/types/content'
import { cn } from '~/lib/cn'

export function TestimonialCarousel({
  testimonials,
  className,
  ariaLabel = 'Client testimonials',
  variant = 'default',
  showDots = true,
}: {
  testimonials: Array<Testimonial>
  className?: string
  ariaLabel?: string
  variant?: 'default' | 'tint'
  showDots?: boolean
}) {
  return (
    <Reveal className={cn('block', className)}>
      <Carousel ariaLabel={ariaLabel} showDots={showDots} itemsPerPage={1}>
        {testimonials.map((testimonial) => (
          <CarouselSlide
            key={testimonial.id}
            className="w-[min(85vw,20rem)] md:w-[calc((100%-3rem)/3)]"
          >
            <TestimonialCard testimonial={testimonial} variant={variant} className="h-full" />
          </CarouselSlide>
        ))}
      </Carousel>
    </Reveal>
  )
}
