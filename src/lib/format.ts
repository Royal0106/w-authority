/** Formatting helpers shared across cards, meta rows and tables. */

// Dates are authored as plain calendar days (`2024-05-16`), so they are parsed
// and formatted in UTC. Without pinning the zone, a viewer west of UTC sees the
// previous day — and the server and client would disagree during hydration.
const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

const LONG_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

/** `2024-05-16` → `May 16, 2024` */
export function formatDate(iso: string) {
  return DATE_FORMATTER.format(new Date(`${iso}T00:00:00Z`))
}

/** `2024-05-16` → `May 16, 2024` (unabbreviated month) */
export function formatLongDate(iso: string) {
  return LONG_DATE_FORMATTER.format(new Date(`${iso}T00:00:00Z`))
}

/** `8` → `8 min read` */
export function formatReadTime(minutes: number) {
  return `${minutes} min read`
}

/** `59.99` → `$59.99` */
export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

/** `128` → `128`, `1280` → `1.3K` */
export function formatCompact(value: number) {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)
}

/** Zero-pad list indexes: `1` → `01` */
export function padIndex(value: number) {
  return String(value).padStart(2, '0')
}

/** Turn a title into a URL slug. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
