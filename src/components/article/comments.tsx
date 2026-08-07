import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Input } from '~/components/ui/input'
import { Avatar } from '~/components/ui/misc'
import { useMockSubmit } from '~/hooks/use-mock-submit'
import type { ImageKey } from '~/data/images.generated'
import { commentSchema, type CommentValues } from '~/lib/validation'

type Comment = {
  id: string
  name: string
  avatar: ImageKey
  postedAt: string
  body: string
  likes: number
}

const seedComments: Array<Comment> = [
  {
    id: 'c1',
    name: 'Jessica M.',
    avatar: 'people/jessica-m',
    postedAt: 'May 16, 2024 at 9:32 AM',
    body: 'This is gold. The systems you shared here are exactly what most people overlook. Implementing these changed my life.',
    likes: 12,
  },
  {
    id: 'c2',
    name: 'Amanda R.',
    avatar: 'people/amanda-r',
    postedAt: 'May 16, 2024 at 11:04 AM',
    body: 'The evening review is the one I always skip. Starting tonight — thank you for the nudge.',
    likes: 8,
  },
  {
    id: 'c3',
    name: 'Sophia L.',
    avatar: 'people/sophia-l',
    postedAt: 'May 17, 2024 at 7:12 AM',
    body: 'Sent this to my whole team. The decision-framework section alone is worth the read.',
    likes: 5,
  },
]

export function Comments({ count }: { count: number }) {
  const [comments, setComments] = useState(seedComments.slice(0, 1))
  const [expanded, setExpanded] = useState(false)

  const { submit, isSubmitting } = useMockSubmit<CommentValues>({
    successTitle: 'Comment posted',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { comment: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    const ok = await submit(values)
    if (!ok) return
    setComments((current) => [
      {
        id: `local-${current.length + 1}`,
        name: 'You',
        avatar: 'people/commenter-1',
        postedAt: 'Just now',
        body: values.comment,
        likes: 0,
      },
      ...current,
    ])
    reset()
  })

  const visible = expanded ? [...comments, ...seedComments.slice(1)] : comments

  return (
    <section aria-labelledby="comments-heading" className="border-t border-hairline pt-6">
      <h2
        id="comments-heading"
        className="text-[11px] font-semibold uppercase tracking-[0.12em] text-content"
      >
        Comments ({count})
      </h2>

      <form onSubmit={onSubmit} noValidate className="mt-5 flex items-start gap-3">
        <Avatar image="people/commenter-1" alt="Your avatar" className="mt-0.5 size-9" />
        <div className="flex-1">
          <label htmlFor="new-comment" className="sr-only">
            Write a comment
          </label>
          <Input
            id="new-comment"
            placeholder="Write a comment..."
            aria-invalid={errors.comment ? true : undefined}
            aria-describedby={errors.comment ? 'new-comment-error' : undefined}
            {...register('comment')}
          />
          {errors.comment ? (
            <p id="new-comment-error" role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-300">
              {errors.comment.message}
            </p>
          ) : null}
        </div>
        <Button type="submit" disabled={isSubmitting} className="shrink-0">
          {isSubmitting ? 'Posting…' : 'Post Comment'}
        </Button>
      </form>

      <ul className="mt-6 grid gap-6">
        {visible.map((comment) => (
          <li key={comment.id} className="flex items-start gap-3">
            <Avatar image={comment.avatar} alt={comment.name} className="mt-0.5 size-9" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <p className="text-xs font-semibold text-content">{comment.name}</p>
                <p className="text-xs text-content-subtle">{comment.postedAt}</p>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-content-muted">{comment.body}</p>
              <div className="mt-2.5 flex items-center gap-4 text-xs text-content-subtle">
                <button type="button" className="transition-colors hover:text-brand">
                  Reply
                </button>
                <span aria-hidden="true">•</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
                  aria-label={`Like this comment (${comment.likes} likes)`}
                >
                  <Icon name="heart" className="size-3.5" />
                  {comment.likes}
                </button>
              </div>
            </div>
            <button
              type="button"
              aria-label="Comment options"
              className="grid size-7 shrink-0 place-items-center rounded-full text-content-subtle transition-colors hover:bg-surface-soft hover:text-brand"
            >
              <Icon name="ellipsis" className="size-4" />
            </button>
          </li>
        ))}
      </ul>

      {!expanded ? (
        <Button
          variant="outline"
          className="mx-auto mt-6 flex"
          onClick={() => setExpanded(true)}
        >
          View All Comments
        </Button>
      ) : null}
    </section>
  )
}
