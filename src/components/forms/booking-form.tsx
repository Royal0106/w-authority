import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormField } from './speaking-form'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Input, Select, Textarea } from '~/components/ui/input'
import { useMockSubmit } from '~/hooks/use-mock-submit'
import { availableSlots, sessionTypes } from '~/data/booking'
import { formatLongDate } from '~/lib/format'
import { bookingSchema, type BookingValues } from '~/lib/validation'
import { cn } from '~/lib/cn'

/**
 * Booking calendar plus enquiry form.
 *
 * The calendar renders a static month from `availableSlots`. Swap that data
 * source for a scheduler API and the rest of the component is unchanged.
 */
export function BookingForm({ className }: { className?: string }) {
  const dates = useMemo(() => Object.keys(availableSlots).sort(), [])
  const [selectedDate, setSelectedDate] = useState(dates[0]!)
  const [selectedTime, setSelectedTime] = useState(availableSlots[dates[0]!]![0]!)

  const { submit, isSubmitting, isSuccess } = useMockSubmit<BookingValues>({
    successTitle: 'Session requested',
    successDescription: 'Check your inbox for the confirmation and intake form.',
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      sessionType: sessionTypes[1]!.name,
      date: dates[0]!,
      time: availableSlots[dates[0]!]![0]!,
      goals: '',
    },
  })

  const chooseDate = (date: string) => {
    const firstSlot = availableSlots[date]![0]!
    setSelectedDate(date)
    setSelectedTime(firstSlot)
    setValue('date', date, { shouldValidate: true })
    setValue('time', firstSlot, { shouldValidate: true })
  }

  const chooseTime = (time: string) => {
    setSelectedTime(time)
    setValue('time', time, { shouldValidate: true })
  }

  const onSubmit = handleSubmit(async (values) => {
    const ok = await submit(values)
    if (ok) reset({ ...values, name: '', email: '', goals: '' })
  })

  return (
    <div className={cn('grid gap-6 lg:grid-cols-[1fr_1fr]', className)}>
      {/* Calendar */}
      <div className="rounded-[var(--radius-card)] border border-hairline bg-surface p-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-content">
            June 2024
          </p>
          <p className="text-xs text-content-subtle">All times CST</p>
        </div>

        <fieldset className="mt-5">
          <legend className="sr-only">Choose a date</legend>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {dates.map((date) => {
              const active = date === selectedDate
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => chooseDate(date)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-[var(--radius-card)] border px-2 py-2.5 text-center transition-colors duration-200',
                    active
                      ? 'border-brand bg-brand text-on-brand'
                      : 'border-hairline text-content-muted hover:border-brand hover:text-brand',
                  )}
                >
                  <span className="block text-[10px] uppercase tracking-[0.1em] opacity-80">
                    {new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
                      weekday: 'short',
                      timeZone: 'UTC',
                    })}
                  </span>
                  <span className="mt-0.5 block font-display text-base">
                    {new Date(`${date}T00:00:00Z`).getUTCDate()}
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-[11px] font-semibold uppercase tracking-[0.12em] text-content">
            Available times
          </legend>
          <p className="mt-1 text-xs text-content-subtle">{formatLongDate(selectedDate)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {availableSlots[selectedDate]!.map((time) => {
              const active = time === selectedTime
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => chooseTime(time)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-pill border px-4 py-2 text-xs font-medium transition-colors duration-200',
                    active
                      ? 'border-brand bg-brand text-on-brand'
                      : 'border-hairline text-content-muted hover:border-brand hover:text-brand',
                  )}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </fieldset>

        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-content-muted">
          <Icon name="info" className="mt-0.5 size-3.5 shrink-0 text-brand" />
          Sessions are held over video. You will receive a link and a short intake form as soon as
          the booking is confirmed.
        </p>
      </div>

      {/* Details */}
      <form onSubmit={onSubmit} noValidate className="grid content-start gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Full Name" error={errors.name?.message}>
            {(props) => (
              <Input placeholder="Full Name" autoComplete="name" {...props} {...register('name')} />
            )}
          </FormField>
          <FormField label="Email Address" error={errors.email?.message}>
            {(props) => (
              <Input
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                {...props}
                {...register('email')}
              />
            )}
          </FormField>
        </div>

        <FormField label="Session Type" error={errors.sessionType?.message}>
          {(props) => (
            <Select {...props} {...register('sessionType')}>
              {sessionTypes.map((session) => (
                <option key={session.slug} value={session.name}>
                  {session.name} — {session.duration} — {session.price}
                </option>
              ))}
            </Select>
          )}
        </FormField>

        <FormField label="What would you like to get out of this session?" error={errors.goals?.message}>
          {(props) => (
            <Textarea
              rows={5}
              placeholder="What would you like to get out of this session?"
              {...props}
              {...register('goals')}
            />
          )}
        </FormField>

        {/* Date and time are driven by the calendar above. */}
        <input type="hidden" {...register('date')} />
        <input type="hidden" {...register('time')} />

        <p className="rounded-[var(--radius-card)] bg-surface-soft px-4 py-3 text-xs text-content-muted">
          Selected: <strong className="font-semibold text-content">{formatLongDate(selectedDate)}</strong>{' '}
          at <strong className="font-semibold text-content">{selectedTime} CST</strong>
        </p>

        <Button type="submit" disabled={isSubmitting} className="mt-1">
          {isSubmitting ? 'Requesting…' : 'Request This Session'}
          <Icon name="arrow-right" className="size-3.5" />
        </Button>

        {isSuccess ? (
          <p role="status" className="text-xs text-content-muted">
            Request received — we confirm every booking within one business day.
          </p>
        ) : null}
      </form>
    </div>
  )
}
