/**
 * Generates the blush-toned SVG placeholders used across the template.
 *
 * These stand in for the real photography. Replace any file in
 * `public/images/**` with a production asset of the same name and the site
 * picks it up with no code changes.
 *
 *   node scripts/generate-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'images')

const PALETTES = [
  ['#fdeeea', '#f7d2ca', '#efb6ab'],
  ['#fff1f4', '#ffc9d6', '#ffa1b9'],
  ['#fef7f4', '#f7d2ca', '#ffc9d6'],
  ['#fbe3dd', '#efb6ab', '#e2a396'],
  ['#fff5f0', '#fbe3dd', '#f4cfc2'],
  ['#f7efe9', '#e8d5c8', '#d9bfae'],
]

/** Cheap deterministic hash so a given name always renders the same art. */
function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

function rng(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

/**
 * A soft editorial composition: gradient wash, out-of-focus bokeh, a subtle
 * figure silhouette and the brand monogram.
 */
function scene(name, w, h, { mark = true, portrait = false } = {}) {
  const seed = hash(name)
  const rand = rng(seed)
  const palette = PALETTES[seed % PALETTES.length]
  const [c1, c2, c3] = palette
  const id = `g${seed % 99999}`

  const blobs = Array.from({ length: 7 }, () => {
    const cx = rand() * w
    const cy = rand() * h
    const r = (0.06 + rand() * 0.22) * Math.min(w, h)
    const o = (0.18 + rand() * 0.4).toFixed(2)
    return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="url(#${id}b)" opacity="${o}"/>`
  }).join('')

  const figureW = w * (portrait ? 0.52 : 0.3)
  const figureX = w * (portrait ? 0.24 : 0.56)
  const headR = figureW * 0.24
  const headY = h * (portrait ? 0.3 : 0.42)
  const figure = `
    <g opacity="0.5">
      <circle cx="${(figureX + figureW / 2).toFixed(0)}" cy="${headY.toFixed(0)}" r="${headR.toFixed(0)}" fill="${c3}"/>
      <path d="M ${figureX.toFixed(0)} ${h}
               C ${figureX.toFixed(0)} ${(headY + headR * 1.6).toFixed(0)},
                 ${(figureX + figureW * 0.28).toFixed(0)} ${(headY + headR * 1.1).toFixed(0)},
                 ${(figureX + figureW / 2).toFixed(0)} ${(headY + headR * 1.1).toFixed(0)}
               C ${(figureX + figureW * 0.72).toFixed(0)} ${(headY + headR * 1.1).toFixed(0)},
                 ${(figureX + figureW).toFixed(0)} ${(headY + headR * 1.6).toFixed(0)},
                 ${(figureX + figureW).toFixed(0)} ${h}
               Z" fill="${c3}"/>
    </g>`

  const monogram = mark
    ? `<g opacity="0.5" transform="translate(${(w - 74).toFixed(0)}, ${(h - 40).toFixed(0)})">
         <circle cx="0" cy="0" r="17" fill="none" stroke="#f04e7b" stroke-width="1.2" opacity="0.7"/>
         <text x="0" y="4.5" font-family="Georgia, serif" font-size="12" fill="#de3566" text-anchor="middle" opacity="0.85">WA</text>
       </g>`
    : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${name} placeholder">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="55%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="${id}b">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${id})"/>
  ${blobs}
  ${figure}
  ${monogram}
</svg>`
}

function avatar(name) {
  const seed = hash(name)
  const palette = PALETTES[seed % PALETTES.length]
  const [c1, c2, c3] = palette
  const id = `a${seed % 99999}`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" role="img" aria-label="${name} avatar placeholder">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient></defs>
  <rect width="96" height="96" fill="url(#${id})"/>
  <circle cx="48" cy="38" r="16" fill="${c3}" opacity="0.85"/>
  <path d="M16 96c0-17.7 14.3-30 32-30s32 12.3 32 30Z" fill="${c3}" opacity="0.85"/>
</svg>`
}

function logo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" role="img" aria-label="Woman Authority monogram">
  <circle cx="48" cy="48" r="45" fill="#fff1f4" stroke="#f04e7b" stroke-width="2"/>
  <text x="48" y="58" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#de3566" text-anchor="middle">WA</text>
</svg>`
}

function ogImage() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Woman Authority">
  <defs><linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#fffbfa"/><stop offset="60%" stop-color="#fdeeea"/><stop offset="100%" stop-color="#ffc9d6"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <circle cx="980" cy="140" r="200" fill="#ffffff" opacity="0.45"/>
  <circle cx="1080" cy="520" r="150" fill="#ffffff" opacity="0.35"/>
  <circle cx="96" cy="96" r="34" fill="none" stroke="#f04e7b" stroke-width="2"/>
  <text x="96" y="107" font-family="Georgia, serif" font-size="24" fill="#de3566" text-anchor="middle">WA</text>
  <text x="146" y="92" font-family="Inter, Arial, sans-serif" font-size="22" letter-spacing="3" font-weight="700" fill="#14100f">WOMAN AUTHORITY</text>
  <text x="146" y="115" font-family="Inter, Arial, sans-serif" font-size="12" letter-spacing="4" fill="#f04e7b">INSPIRE. EMPOWER. LEAD.</text>
  <text x="96" y="330" font-family="Georgia, serif" font-size="76" fill="#14100f">Build Confidence.</text>
  <text x="96" y="416" font-family="Georgia, serif" font-size="76" fill="#14100f">Live Purposefully.</text>
  <text x="96" y="502" font-family="Georgia, serif" font-size="76" fill="#de3566">Lead Powerfully.</text>
</svg>`
}

/* --------------------------------------------------------------- manifest */

const WIDE = [1600, 1000]
const HERO = [1200, 900]
const CARD = [800, 600]
const TALL = [800, 1000]
const SQUARE = [800, 800]
const THUMB = [400, 300]

/** @type {Array<[string, number[], object?]>} */
const scenes = [
  ['hero/home', HERO, { portrait: true }],
  ['hero/about', HERO, { portrait: true }],
  ['hero/expertise', HERO, { portrait: true }],
  ['hero/speaking', HERO, { portrait: true }],
  ['hero/blog', HERO, { portrait: true }],
  ['hero/contact', HERO, { portrait: true }],
  ['hero/article', HERO, { portrait: true }],
  ['hero/legal', WIDE, { portrait: true }],
  ['hero/booking', HERO, { portrait: true }],
  ['hero/newsletter', HERO, { portrait: true }],
  ['hero/ai-for-business', HERO, { portrait: true }],

  ['about/portrait', TALL, { portrait: true }],
  ['about/story', CARD, { portrait: true }],
  ['about/cta', TALL, { portrait: true }],
  ['about/stats-band', WIDE, { mark: false }],

  ['editorial/strength-training-mistakes', CARD],
  ['editorial/multiple-income-streams', CARD],
  ['editorial/timeless-style-essentials', CARD],
  ['editorial/skincare-routine', CARD],
  ['editorial/seven-systems', CARD],
  ['editorial/build-strength-confidence', THUMB],
  ['editorial/classic-style-rules', THUMB],
  ['editorial/ai-saves-hours', THUMB],
  ['editorial/best-skincare-over-30', CARD],
  ['editorial/stay-focused', CARD],
  ['editorial/three-conversations', CARD],
  ['editorial/edc-essentials', CARD],
  ['editorial/morning-routine', THUMB],
  ['editorial/personal-brand', THUMB],
  ['editorial/style-upgrades', THUMB],
  ['editorial/mindset-habits', THUMB],
  ['editorial/building-muscle-after-40', THUMB],
  ['editorial/future-of-work', CARD],
  ['editorial/compound-effect', CARD],
  ['editorial/lead-with-clarity', CARD],
  ['editorial/time-management', CARD],
  ['editorial/productivity-habits', CARD],
  ['editorial/great-leaders', THUMB],
  ['editorial/time-blocking', THUMB],
  ['editorial/unstoppable-mindset', THUMB],
  ['editorial/fitness-featured', CARD],
  ['editorial/success-featured', CARD],
  ['editorial/in-article-sunrise', CARD],

  ['topics/ai-strategy', CARD],
  ['topics/business-systems', CARD],
  ['topics/high-performance-teams', CARD],
  ['topics/content-personal-brand', CARD],
  ['topics/mindset-habits', CARD],
  ['topics/financial-freedom', CARD],

  ['speaking/ai-automation', CARD],
  ['speaking/leadership', CARD],
  ['speaking/business-growth', CARD],
  ['speaking/marketing-branding', CARD],
  ['speaking/mindset-performance', CARD],
  ['speaking/keynote-ai-advantage', CARD],
  ['speaking/keynote-future-proof', CARD],
  ['speaking/keynote-leaders', CARD],
  ['speaking/keynote-personal-brand', CARD],
  ['speaking/keynote-high-performance', CARD],
  ['speaking/reel', WIDE],
  ['speaking/booking', TALL, { portrait: true }],

  ['case-studies/ecommerce-brand', CARD],
  ['case-studies/coaching-business', CARD],
  ['case-studies/saas-company', CARD],
  ['case-studies/personal-brand', CARD],

  ['products/signature-hoodie', SQUARE, { mark: false }],
  ['products/classic-watch', SQUARE, { mark: false }],
  ['products/leather-tote', SQUARE, { mark: false }],
  ['products/wireless-earbuds', SQUARE, { mark: false }],
  ['products/wellness-journal', SQUARE, { mark: false }],
  ['products/shaker-bottle', SQUARE, { mark: false }],

  ['misc/office', CARD, { mark: false }],
  ['misc/founder', TALL, { portrait: true }],
  ['misc/newsletter-mug', CARD, { mark: false }],
  ['misc/legal-cta', CARD, { mark: false }],
  ['misc/faq-flowers', CARD, { mark: false }],
  ['misc/download-preview', CARD, { mark: false }],
  ['misc/sample-issue', CARD, { mark: false }],
]

const avatars = [
  'people/author',
  'people/mia-anderson',
  'people/jenna-stone',
  'people/alex-thomas',
  'people/daniel-k',
  'people/jason-stone',
  'people/mark-mitchell',
  'people/jessica-m',
  'people/sarah-l',
  'people/amanda-r',
  'people/emily-k',
  'people/sophia-l',
  'people/laura-t',
  'people/lisa-r',
  'people/commenter-1',
  'people/commenter-2',
  'people/commenter-3',
]

function write(relPath, contents) {
  const full = join(out, `${relPath}.svg`)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, contents, 'utf8')
}

for (const [name, [w, h], opts] of scenes) write(name, scene(name, w, h, opts))
for (const name of avatars) write(name, avatar(name))
write('logo', logo())
write('og-default', ogImage())

console.log(`Generated ${scenes.length + avatars.length + 2} placeholder images in public/images`)
