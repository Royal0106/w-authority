import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ComponentProps } from 'react'
import { cn } from '~/lib/cn'

export const Tabs = TabsPrimitive.Root

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-[var(--radius-card)] border border-hairline bg-surface-soft p-1',
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'rounded-[calc(var(--radius-card)-2px)] px-4 py-2',
        'text-[11px] font-semibold uppercase tracking-[0.1em] text-content-muted',
        'transition-colors duration-200',
        'hover:text-brand',
        'data-[state=active]:bg-surface data-[state=active]:text-content data-[state=active]:shadow-soft',
        className,
      )}
      {...props}
    />
  )
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn('mt-6 focus-visible:outline-none', className)} {...props} />
}
