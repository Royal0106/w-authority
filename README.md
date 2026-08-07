# Woman Authority — Frontend Template

A production-quality, SSR frontend for a personal-authority website: editorial
content, expertise and speaking pages, and lead-generation flows.

Built from the supplied UI designs. Layout, typography, colour, spacing,
components and responsive behaviour follow those comps; nothing was redesigned.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TanStack Start (SSR) |
| Routing | TanStack Router (file-based, typed) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Components | Shadcn-style primitives on Radix UI |
| Animation | Motion (Framer Motion) |
| Forms | React Hook Form + Zod |
| Toasts | Sonner |
| Icons | Lucide + hand-drawn brand marks |

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build → `dist/client` + `dist/server` |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run qa` | Layout/visual sweep across every route (see below) |
| `npm run images` | Fetch the photography into `public/images` (`-- --force` to refetch) |
| `npm run contact-sheet` | Render every photo to one PNG for review |
| `npm run placeholders` | Regenerate the SVG placeholder set (fallback) |

---

## Project structure

```
src/
├── components/
│   ├── article/      Article body, table of contents, share bar, comments
│   ├── cards/        Article, category, expertise, case study, testimonial,
│   │                 statistic and product cards
│   ├── common/       Breadcrumb, carousel, logo, pagination, social links,
│   │                 reading progress, back-to-top, empty/error/loading
│   │                 states, 404, route error
│   ├── forms/        Newsletter, contact, speaking, booking forms
│   ├── layout/       Announcement bar, header + mega menu, mobile drawer,
│   │                 footer, site search, Section/Container/SectionHeader
│   ├── motion/       Reveal, RevealGroup, HoverLift, page transition
│   ├── sections/     Page hero, newsletter band, FAQ, CTA, testimonial
│   │                 carousel, legal page template
│   ├── theme/        Theme provider + toggle
│   └── ui/           Primitives: button, input, card, badge, accordion, tabs,
│                     dialog, drawer, tooltip, avatar, separator, skeleton,
│                     alert, table, star rating, icon, image
├── config/           site.ts (brand, contact, social), navigation.ts
├── data/             Typed content fixtures, query helpers,
│                     images.generated.ts (generated)
├── hooks/            use-mock-submit, use-scroll-progress
├── lib/              cn, format, seo, validation
├── routes/           File-based routes
├── styles/app.css    Design tokens, base layer, component utilities
└── types/            Content data models
```

### Where things live

- **Change brand copy, contact details, social profiles** → `src/config/site.ts`
- **Change navigation or the mega menu** → `src/config/navigation.ts`
- **Change content** → `src/data/*` (all typed against `src/types/content.ts`)
- **Change design tokens** → the `@theme` block in `src/styles/app.css`
- **Change a photo** → `scripts/images.manifest.mjs`, then `npm run images`

---

## Pages

| Route | Sections |
|---|---|
| `/` | Hero · Top Categories · Featured Articles · Newsletter · Shop Best Sellers · About the Founder · Solutions · Testimonials |
| `/about` | Hero + stats · Personal Introduction · My Story + Timeline · Mission · Values · Impact band · Achievements / Featured In / Testimonial · Testimonials · FAQ · CTA |
| `/expertise` | Hero + stats card · Areas of Expertise · Featured Topics · Process · Case Studies · Industries · Impact + testimonials · FAQ + CTA · Newsletter |
| `/speaking` | Hero + stats · Why Hire Me · Topics carousel · Keynotes carousel · Formats · Videos + audience types · Past Events · Testimonials · FAQ + booking form · Newsletter |
| `/blog` | Hero + search · Categories · Featured Article · Latest + Popular · Editor's Picks · Newsletter · Tags + Pagination |
| `/blog/$slug` | Hero · Share bar · TOC + subscribe · Article body · Recommended + download · Related · Newsletter · Author · Comments |
| `/contact` | Hero + quote card · Reasons to reach out · Form + office info · FAQ · Social band · Newsletter |
| `/ai-for-business` | Hero · Problems · Solutions · Industries · Framework · Case Studies · ROI · FAQ · CTA · Newsletter |
| `/booking` | Hero · Session Types · Who It's For · Calendar + form · Testimonials · FAQ |
| `/newsletter` | Hero · Benefits · Sample Issues · Testimonials · Subscribe · FAQ |
| `/terms`, `/privacy` | Legal hero · Numbered sections · Contact CTA |
| `/sitemap.xml` | Generated from routes + articles |

**Note on scope.** Designs were supplied for Home, About, Expertise, Speaking,
Blog, Article, Contact and Terms. The brief also lists **AI for Business**,
**Booking**, **Newsletter** and **Privacy**, which had no comps — those four are
composed from the same tokens, sections and cards as the designed pages, so they
sit inside the system rather than beside it. Swap them for comps when available;
they use only shared components.

---

## Design system

Tokens live in one place: the `@theme` block of `src/styles/app.css`.

**Colour** is two-layered. A raw palette (`rose-*`, `blush-*`, `ink-*`) feeds a
set of *semantic* tokens (`canvas`, `surface`, `surface-soft`, `surface-tint`,
`hairline`, `content`, `content-muted`, `brand`, `on-brand`, …). Components only
ever reference the semantic name, so light and dark themes are a single remap of
custom properties — no `dark:` variant sprinkled through the components.

**Typography** — Playfair Display for display copy, Inter for UI, Dancing Script
for the signature. The `text-display-2xl|xl|lg|md` utilities carry size, rhythm
*and* the serif family together. That pairing is deliberate: the design uses sans
for card titles, footer column headings and legal section headings, so a blanket
serif rule on `h1`–`h4` would quietly override them.

**Spacing** — `container-site` (1200px, responsive gutters) and the `Section`
component's `spacing` variants keep vertical rhythm consistent across pages.

**Motion** — one easing curve (`--ease-premium`), short durations, small
distances. Everything routes through `Reveal` / `RevealGroup` / `PageTransition`,
each of which returns a plain element under `prefers-reduced-motion`.

---

## Dark mode

Class-based (`.dark` on `<html>`), with `light | dark | system` persisted to
`localStorage`. A small inline script in `<head>` applies the class **before
first paint**, so there is no flash of the wrong theme on hydration.

---

## Accessibility

Targets WCAG AA.

- Semantic landmarks, one `h1` per page, ordered heading levels
- Skip-to-content link as the first tab stop
- Radix primitives for dialog, drawer, accordion, tabs, tooltip — focus
  trapping, escape-to-close and ARIA wiring come from the library
- Mega menu opens on hover **and** focus, closes on Escape and blur
- Every form control has a label (visually hidden where the design uses
  placeholders), with `aria-invalid` and `aria-describedby` on errors
- Decorative images have empty `alt`; icons are `aria-hidden` unless labelled
- A single visible focus ring, defined once in the base layer
- Carousels are native scroll containers, so they work with touch, trackpad and
  keyboard without a gesture layer
- Search opens with ⌘K / Ctrl-K, advertised on the trigger and via
  `aria-keyshortcuts`
- The article reading-progress bar is a real `role="progressbar"`
- Back-to-top leaves the tab order while it is off-screen, so it is never a
  phantom stop

---

## Performance

- SSR through TanStack Start; routes are code-split automatically
- Images lazy-load with `decoding="async"`; hero images opt into `priority`
- Every image reserves its space via an aspect-ratio wrapper — no layout shift
- Fonts are preconnected and `display=swap`
- Animations are transform/opacity only
- Photography ships as a per-crop `srcset` ladder with `sizes` hints, so a
  400px card pulls a 400px file rather than the 1600px hero source

---

## SEO

`src/lib/seo.ts` builds every page's metadata: title, description, canonical,
OpenGraph, Twitter card, and article-specific tags. Structured data helpers
cover `Organization`, `Person`, `BreadcrumbList`, `BlogPosting` and `FAQPage`.
`/sitemap.xml` is generated from the route list plus the article index;
`robots.txt` points at it.

---

## Photography

The site ships with **95 real photographs** from Pexels, which is free for
commercial use with no attribution required. Image-search results are *not*
used: they are third-party copyrighted works and cannot ship inside a template.

The pipeline is manifest-driven:

```
scripts/images.manifest.mjs     slot -> Pexels photo id, crop, alt text
        ↓  npm run images
public/images/**                one JPEG per srcset rung + a 20px LQIP
src/data/images.generated.ts    srcset, dimensions, blur data URI, alt
```

Components reference a **typed slot key**, never a path, so a typo is a compile
error rather than a missing image at runtime:

```tsx
<Img image="hero/home" priority sizes="(min-width: 1024px) 55vw, 100vw" />
```

`<Img>` gives every photo a responsive `srcset`, an inlined base64 blur-up
placeholder, a reserved aspect ratio (no layout shift), and optional scrims
(`overlay="bottom" | "full" | "soft" | "blend"`) for text sitting over an image.

**To change a photo:** edit its id in the manifest, delete that slot's cached
files, and run `npm run images`. **To review the set:** `npm run contact-sheet`
renders all 95 to a single PNG. Every photo currently in the manifest was
checked that way before shipping.

---

## Going from template to live site

The template is frontend-only by design. Three seams are ready for a backend:

1. **Content** — `src/data/queries.ts` is the single read layer over articles.
   Replace those function bodies (or wrap them in `createServerFn`) and no
   component changes.
2. **Forms** — every form submits through `useMockSubmit` in
   `src/hooks/use-mock-submit.ts`, which resolves after a delay and fires a
   toast. Point its body at a real endpoint and all four forms go live.
3. **Booking** — `src/data/booking.ts` exposes `availableSlots` as a plain
   record. Swap it for a scheduler API; the calendar UI is unchanged.

---

## QA sweep

`npm run qa` drives the locally installed Chrome (via `playwright-core`, no
browser download) across every route at desktop / tablet / mobile plus a
dark-mode pass. It writes screenshots to `.qa/` and reports horizontal overflow,
elements escaping the viewport, broken images and console errors.

```bash
npm run dev            # in one terminal
npm run qa             # in another
npm run qa -- blog     # full-page capture of a single route
```

Override `CHROME_PATH` if Chrome is not at the default Windows location.

---

## Verified

- `npm run typecheck` — clean
- `npm run build` — client + SSR bundles build
- All 13 routes SSR with correct status codes (`/nope` → 404)
- `npm run qa` against the **production build** — no layout problems, no broken
  images at 1440 / 834 / 390, light and dark
- All 95 photographs reviewed on a contact sheet; several first picks were
  replaced for being off-brand, too dark at avatar size, or a stock illustration
  rather than a photograph
- Scroll reveals confirmed firing on a real scroll (a full-page screenshot shows
  them blank because Playwright's capture never trips the IntersectionObserver —
  that is a capture artifact, not a bug)
- Interaction pass: mega menu, mobile drawer, ⌘K search, theme persistence, FAQ
  accordion, form validation and success states, blog filtering via URL, booking
  calendar, skip link
