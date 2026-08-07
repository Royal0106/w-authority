import type { ComponentProps } from 'react'
import { cn } from '~/lib/cn'

const fieldBase = [
  'w-full bg-surface text-content placeholder:text-content-subtle',
  'border border-hairline rounded-[var(--radius-card)]',
  'transition-colors duration-200',
  'hover:border-blush-500/60',
  'focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25',
  'disabled:cursor-not-allowed disabled:opacity-60',
  'aria-[invalid=true]:border-rose-600 aria-[invalid=true]:ring-rose-600/20',
]

export function Input({ className, type = 'text', ...props }: ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(fieldBase, 'h-11 px-4 text-sm', className)}
      {...props}
    />
  )
}

export function Textarea({ className, rows = 5, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(fieldBase, 'px-4 py-3 text-sm resize-y min-h-28', className)}
      {...props}
    />
  )
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(
          fieldBase,
          'h-11 pl-4 pr-10 text-sm appearance-none cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-content-subtle"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path d="m1 1.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function Checkbox({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        'size-4 shrink-0 rounded-[3px] border border-hairline bg-surface',
        'accent-[var(--brand-base)] cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
        className,
      )}
      {...props}
    />
  )
}
