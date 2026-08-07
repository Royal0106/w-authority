import { useCallback, useState } from 'react'
import { toast } from 'sonner'

/**
 * Stand-in for a real submission endpoint.
 *
 * The template ships frontend-only, so forms resolve after a short delay and
 * surface a toast. Replace the body of `submit` with a `createServerFn` call
 * (or a fetch) and every form keeps working unchanged.
 */
export function useMockSubmit<TValues>({
  successTitle,
  successDescription,
  delay = 700,
}: {
  successTitle: string
  successDescription?: string
  delay?: number
}) {
  const [isSubmitting, setSubmitting] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  const submit = useCallback(
    async (values: TValues) => {
      setSubmitting(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, delay))
        // eslint-disable-next-line no-console -- placeholder for a real endpoint
        console.info('[woman-authority] form submitted', values)
        setSuccess(true)
        toast.success(successTitle, { description: successDescription })
        return true
      } finally {
        setSubmitting(false)
      }
    },
    [delay, successDescription, successTitle],
  )

  const reset = useCallback(() => setSuccess(false), [])

  return { submit, isSubmitting, isSuccess, reset }
}
