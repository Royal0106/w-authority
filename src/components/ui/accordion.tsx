import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { ComponentProps } from 'react'
import { cn } from '~/lib/cn'

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        'border-b border-hairline last:border-b-0 data-[state=open]:bg-surface-soft/60',
        className,
      )}
      {...props}
    />
  )
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group flex flex-1 items-center justify-between gap-4 px-4 py-4 text-left',
          'text-sm font-medium text-content transition-colors hover:text-brand sm:px-5',
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="relative size-4 shrink-0 text-brand transition-transform duration-300 ease-[var(--ease-premium)] group-data-[state=open]:rotate-45"
        >
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_240ms_var(--ease-premium)] data-[state=open]:animate-[accordion-down_240ms_var(--ease-premium)]"
      {...props}
    >
      <div className={cn('px-4 pb-5 text-sm leading-relaxed text-content-muted sm:px-5', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}
