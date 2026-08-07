import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentProps } from 'react'
import { Icon } from './icon'
import { cn } from '~/lib/cn'

/**
 * Edge-anchored panel built on the dialog primitive, so it inherits focus
 * trapping, scroll locking and escape-to-close for free.
 */
export const Drawer = DialogPrimitive.Root
export const DrawerTrigger = DialogPrimitive.Trigger
export const DrawerClose = DialogPrimitive.Close

export function DrawerContent({
  className,
  children,
  side = 'right',
  title,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  side?: 'right' | 'left'
  /** Required for assistive tech; rendered visually hidden when not shown. */
  title: string
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          'fixed inset-0 z-50 bg-ink-950/45 backdrop-blur-[2px]',
          'data-[state=open]:animate-[overlay-in_220ms_var(--ease-premium)]',
          'data-[state=closed]:animate-[overlay-out_180ms_var(--ease-premium)]',
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          'fixed inset-y-0 z-50 flex w-[min(92vw,25rem)] flex-col bg-surface shadow-float',
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
          'border-hairline',
          'data-[state=open]:animate-[drawer-in-right_300ms_var(--ease-premium)]',
          'data-[state=closed]:animate-[drawer-out-right_220ms_var(--ease-premium)]',
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
        <DialogPrimitive.Close
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full text-content-muted transition-colors hover:bg-surface-soft hover:text-brand"
          aria-label="Close menu"
        >
          <Icon name="x" className="size-4" />
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
