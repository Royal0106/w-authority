import { createContext, useContext, useId, type ReactNode } from 'react'
import { cn } from '~/lib/cn'

type FieldContextValue = {
  id: string
  errorId: string
  descriptionId: string
  hasError: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

/**
 * Wires a label, control, description and error message together with the
 * right `id`/`aria-describedby` relationships so forms stay screen-reader
 * friendly without every page repeating the plumbing.
 */
export function Field({
  children,
  error,
  className,
}: {
  children: ReactNode
  error?: string
  className?: string
}) {
  const id = useId()
  return (
    <FieldContext.Provider
      value={{
        id,
        errorId: `${id}-error`,
        descriptionId: `${id}-description`,
        hasError: Boolean(error),
      }}
    >
      <div className={cn('grid gap-1.5', className)}>
        {children}
        {error ? (
          <p id={`${id}-error`} role="alert" className="text-xs text-rose-600 dark:text-rose-300">
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  )
}

export function useField() {
  const context = useContext(FieldContext)
  if (!context) throw new Error('useField must be used inside <Field>')
  return context
}

/** Props to spread onto the input/textarea/select inside a `<Field>`. */
export function useFieldControlProps(hasDescription = false) {
  const { id, errorId, descriptionId, hasError } = useField()
  return {
    id,
    'aria-invalid': hasError || undefined,
    'aria-describedby':
      [hasError ? errorId : null, hasDescription ? descriptionId : null]
        .filter(Boolean)
        .join(' ') || undefined,
  } as const
}

export function FieldLabel({
  children,
  className,
  required,
}: {
  children: ReactNode
  className?: string
  required?: boolean
}) {
  const { id } = useField()
  return (
    <label
      htmlFor={id}
      className={cn(
        'text-[11px] font-semibold uppercase tracking-[0.12em] text-content-muted',
        className,
      )}
    >
      {children}
      {required ? (
        <span className="ml-1 text-brand" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  )
}

export function FieldDescription({ children }: { children: ReactNode }) {
  const { descriptionId } = useField()
  return (
    <p id={descriptionId} className="text-xs text-content-subtle">
      {children}
    </p>
  )
}
