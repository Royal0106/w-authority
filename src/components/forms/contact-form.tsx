import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormField } from './speaking-form'
import { NewsletterPromises } from './newsletter-form'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Input, Textarea } from '~/components/ui/input'
import { useMockSubmit } from '~/hooks/use-mock-submit'
import { contactSchema, type ContactValues } from '~/lib/validation'
import { cn } from '~/lib/cn'

export function ContactForm({ className }: { className?: string }) {
  const { submit, isSubmitting } = useMockSubmit<ContactValues>({
    successTitle: 'Message sent',
    successDescription: 'We reply to every message within 24 hours.',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    const ok = await submit(values)
    if (ok) reset()
  })

  return (
    <form onSubmit={onSubmit} noValidate className={cn('grid gap-3', className)}>
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

      <FormField label="Subject" error={errors.subject?.message}>
        {(props) => <Input placeholder="Subject" {...props} {...register('subject')} />}
      </FormField>

      <FormField label="Your Message" error={errors.message?.message}>
        {(props) => (
          <Textarea rows={5} placeholder="Your Message" {...props} {...register('message')} />
        )}
      </FormField>

      <NewsletterPromises
        items={['No spam, ever', '100% confidential', 'We reply within 24 hours']}
        className="mt-1"
      />

      <Button type="submit" disabled={isSubmitting} className="mt-2 self-start">
        {isSubmitting ? 'Sending…' : 'Send Message'}
        <Icon name="arrow-right" className="size-3.5" />
      </Button>
    </form>
  )
}
