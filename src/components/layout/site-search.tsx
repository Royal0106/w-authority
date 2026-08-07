import { Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { Icon } from '~/components/ui/icon'
import { Input } from '~/components/ui/input'
import { articles } from '~/data/articles'
import { getCategoryName } from '~/data/categories'
import { searchArticles } from '~/data/queries'
import { cn } from '~/lib/cn'

/**
 * Command-palette style site search. Filters the article index client-side —
 * swap `searchArticles` for a server function to move it behind an API.
 */
export function SiteSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const [isMac, setIsMac] = useState(false)

  const results = useMemo(() => searchArticles(query).slice(0, 6), [query])
  const suggestions = useMemo(() => articles.slice(0, 4), [])
  const list = query.trim() ? results : suggestions

  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent))
  }, [])

  // ⌘K / Ctrl-K opens search from anywhere, the convention readers expect.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const shortcut = isMac ? '⌘K' : 'Ctrl K'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Search articles (${shortcut})`}
          aria-keyshortcuts="Meta+K Control+K"
          className={cn(
            'group flex h-9 items-center gap-2 rounded-full text-content-muted transition-colors',
            'px-0 hover:text-brand xl:border xl:border-hairline xl:bg-surface-soft xl:pl-2.5 xl:pr-1.5',
            'xl:hover:border-brand/40',
            'max-xl:grid max-xl:size-9 max-xl:place-items-center max-xl:hover:bg-surface-soft',
            className,
          )}
        >
          <Icon name="search" className="size-[18px] xl:size-4" />
          <span className="hidden text-xs 2xl:inline">Search</span>
          <kbd
            aria-hidden="true"
            className="hidden rounded border border-hairline bg-surface px-1.5 py-0.5 text-[10px] font-medium text-content-subtle xl:inline"
          >
            {shortcut}
          </kbd>
        </button>
      </DialogTrigger>

      <DialogContent
        className="top-[12vh] max-w-xl translate-y-0 p-0"
        showClose={false}
        aria-label="Search"
      >
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <Icon name="search" className="size-4 text-content-subtle" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, topics, guides…"
            aria-label="Search articles"
            className="h-12 border-0 px-0 focus-visible:ring-0"
          />
          <kbd className="hidden rounded border border-hairline px-1.5 py-0.5 text-[10px] text-content-subtle sm:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-content-subtle">
            {query.trim() ? `${results.length} results` : 'Suggested reading'}
          </p>

          {list.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-content-muted">
              No articles match “{query}”. Try a broader term.
            </p>
          ) : (
            <ul className="grid gap-1">
              {list.map((article) => (
                <li key={article.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: article.slug }}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 rounded-[var(--radius-card)] px-3 py-2.5 transition-colors hover:bg-surface-soft"
                  >
                    <Icon name="open-book" className="mt-0.5 size-4 text-brand" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-content">
                        {article.title}
                      </span>
                      <span className="mt-1 flex items-center gap-2">
                        <Badge variant="ghost" size="sm" className="px-0">
                          {getCategoryName(article.category)}
                        </Badge>
                        <span className="text-xs text-content-subtle">
                          {article.readMinutes} min read
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-hairline px-4 py-3 text-xs text-content-subtle">
          <span>Search across {articles.length} published articles</span>
          <Link
            to="/blog"
            onClick={() => setOpen(false)}
            className="font-medium text-brand hover:underline"
          >
            Browse all
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
