import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Input, Select, Textarea } from '~/components/ui/input'
import { useMockSubmit } from '~/hooks/use-mock-submit'
import { eventTypes } from '~/data/speaking'
import { speakingEnquirySchema, type SpeakingEnquiryValues } from '~/lib/validation'
import { cn } from '~/lib/cn'

export function SpeakingForm({ className }: { className?: string }) {
  const { submit, isSubmitting } = useMockSubmit<SpeakingEnquiryValues>({
    successTitle: 'Request sent',
    successDescription: 'My team will get back to you within 24 hours.',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpeakingEnquiryValues>({
    resolver: zodResolver(speakingEnquirySchema),
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      eventType: '',
      eventDate: '',
      message: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const ok = await submit(values)
    if (ok) reset()
  })

  return (
    <form onSubmit={onSubmit} noValidate className={cn('grid gap-3', className)}>
      <div className="grid gap-3 sm:grid-cols-2">
        <FormField label="Your Name" error={errors.name?.message}>
          {(props) => <Input placeholder="Your Name" autoComplete="name" {...props} {...register('name')} />}
        </FormField>
        <FormField label="Your Email" error={errors.email?.message}>
          {(props) => (
            <Input type="email" placeholder="Your Email" autoComplete="email" {...props} {...register('email')} />
          )}
        </FormField>
      </div>

      <FormField label="Organization" error={errors.organization?.message}>
        {(props) => (
          <Input placeholder="Organization" autoComplete="organization" {...props} {...register('organization')} />
        )}
      </FormField>

      <div className="grid gap-3 sm:grid-cols-2">
        <FormField label="Event Type" error={errors.eventType?.message}>
          {(props) => (
            <Select {...props} {...register('eventType')} defaultValue="">
              <option value="" disabled>
                Event Type
              </option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          )}
        </FormField>
        <FormField label="Event Date" error={errors.eventDate?.message}>
          {(props) => <Input type="date" {...props} {...register('eventDate')} />}
        </FormField>
      </div>

      <FormField label="Message" error={errors.message?.message}>
        {(props) => <Textarea rows={4} placeholder="Message" {...props} {...register('message')} />}
      </FormField>

      <Button type="submit" disabled={isSubmitting} className="mt-1 w-full">
        {isSubmitting ? 'Sending…' : 'Send Request'}
        <Icon name="arrow-right" className="size-3.5" />
      </Button>
    </form>
  )
}

/**
 * Minimal field wrapper: visually-hidden label (the design uses placeholders),
 * wired-up `aria-describedby`, and an inline error message.
 */
export function FormField({
  label,
  error,
  children,
  className,
}: {
  label: string
  error?: string
  children: (props: {
    id: string
    'aria-invalid'?: true
    'aria-describedby'?: string
  }) => React.ReactNode
  className?: string
}) {
  const id = `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const errorId = `${id}-error`

  return (
    <div className={cn('grid gap-1.5', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-rose-600 dark:text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}
