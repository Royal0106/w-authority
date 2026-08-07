import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Input } from '~/components/ui/input'
import { useMockSubmit } from '~/hooks/use-mock-submit'
import { newsletterSchema, type NewsletterValues } from '~/lib/validation'
import { cn } from '~/lib/cn'

type Variant =
  /** Input + full-width labelled button, used inside newsletter bands. */
  | 'inline'
  /** Input with a compact arrow button, used in the footer. */
  | 'compact'

export function NewsletterForm({
  variant = 'inline',
  buttonLabel = 'Subscribe',
  placeholder = 'Enter your email',
  className,
  tone = 'default',
}: {
  variant?: Variant
  buttonLabel?: string
  placeholder?: string
  className?: string
  tone?: 'default' | 'onTint'
}) {
  const { submit, isSubmitting } = useMockSubmit<NewsletterValues>({
    successTitle: "You're on the list",
    successDescription: 'Check your inbox to confirm your subscription.',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    const ok = await submit(values)
    if (ok) reset()
  })

  const errorId = 'newsletter-email-error'

  return (
    <form onSubmit={onSubmit} noValidate className={cn('w-full', className)}>
      <div className="flex w-full items-stretch gap-2">
        <div className="min-w-0 flex-1">
          <label htmlFor={`newsletter-${variant}`} className="sr-only">
            Email address
          </label>
          <Input
            id={`newsletter-${variant}`}
            type="email"
            autoComplete="email"
            placeholder={placeholder}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId : undefined}
            className={cn(
              'h-11',
              tone === 'onTint' && 'border-transparent bg-surface',
            )}
            {...register('email')}
          />
        </div>

        {variant === 'compact' ? (
          <Button
            type="submit"
            size="icon"
            disabled={isSubmitting}
            aria-label={buttonLabel}
            className="h-11 w-11 shrink-0"
          >
            <Icon name="arrow-right" className="size-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting} className="shrink-0">
            {isSubmitting ? 'Subscribing…' : buttonLabel}
          </Button>
        )}
      </div>

      {errors.email ? (
        <p id={errorId} role="alert" className="mt-2 text-xs text-rose-600 dark:text-rose-300">
          {errors.email.message}
        </p>
      ) : null}
    </form>
  )
}

/** The “No spam · Unsubscribe anytime · 100% value” row under subscribe forms. */
export function NewsletterPromises({
  items,
  className,
}: {
  items: ReadonlyArray<string>
  className?: string
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-1.5 text-xs text-content-muted">
          <Icon name="check" className="size-3.5 text-brand" strokeWidth={2.5} />
          {item}
        </li>
      ))}
    </ul>
  )
}
