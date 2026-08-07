import { Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/layout/section'

export function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-display-xl">This page took a different path.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-content-muted">
        The page you were looking for has moved or never existed. Try the articles index — there
        is a good chance what you wanted is in there.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/blog">Browse articles</Link>
        </Button>
      </div>
    </Container>
  )
}
