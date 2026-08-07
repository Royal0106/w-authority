import { Link, type ErrorComponentProps } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/layout/section'

export function RouteError({ error, reset }: ErrorComponentProps) {
  const message = error instanceof Error ? error.message : String(error)

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Something broke</p>
      <h1 className="mt-4 text-display-lg">We hit an unexpected error.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-content-muted">
        Try loading the page again. If it keeps happening, get in touch and we will take a look.
      </p>
      {import.meta.env.DEV ? (
        <pre className="mt-6 max-w-xl overflow-x-auto rounded-[var(--radius-card)] border border-hairline bg-surface-soft p-4 text-left text-xs text-content-muted">
          {message}
        </pre>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact support</Link>
        </Button>
      </div>
    </Container>
  )
}
