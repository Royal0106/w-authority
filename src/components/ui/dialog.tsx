import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentProps } from 'react'
import { Icon } from './icon'
import { cn } from '~/lib/cn'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogPortal = DialogPrimitive.Portal

const overlayClasses = [
  'fixed inset-0 z-50 bg-ink-950/45 backdrop-blur-[2px]',
  'data-[state=open]:animate-[overlay-in_220ms_var(--ease-premium)]',
  'data-[state=closed]:animate-[overlay-out_180ms_var(--ease-premium)]',
]

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay className={cn(overlayClasses, className)} {...props} />
}

export function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { showClose?: boolean }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2',
          'rounded-[var(--radius-card)] border border-hairline bg-surface p-6 shadow-float',
          'max-h-[85vh] overflow-y-auto',
          'data-[state=open]:animate-[dialog-in_260ms_var(--ease-premium)]',
          'data-[state=closed]:animate-[dialog-out_180ms_var(--ease-premium)]',
          className,
        )}
        {...props}
      >
        {children}
        {showClose ? (
          <DialogPrimitive.Close
            className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-content-muted transition-colors hover:bg-surface-soft hover:text-brand"
            aria-label="Close dialog"
          >
            <Icon name="x" className="size-4" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('grid gap-1.5 pr-8', className)} {...props} />
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn('font-display text-xl text-content', className)}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm leading-relaxed text-content-muted', className)}
      {...props}
    />
  )
}

export function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mt-6 flex flex-wrap items-center justify-end gap-3', className)} {...props} />
  )
}
