/**
 * Downloads the site photography from Pexels into `public/images/**`.
 *
 * For each slot in `images.manifest.mjs` it writes one JPEG per width in the
 * crop's srcset ladder plus a ~20px LQIP, then emits
 * `src/data/images.generated.ts` with the srcset, dimensions, inlined blur
 * placeholder and alt text for every slot.
 *
 *   npm run images              fetch anything missing
 *   npm run images -- --force   re-download everything
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { KINDS, PHOTOS } from './images.manifest.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'images')
const force = process.argv.includes('--force')

const pexelsUrl = (id, w, h) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg` +
  `?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}&dpr=1`

/**
 * @param minBytes Guards against truncated responses and HTML error pages.
 *   The 20px LQIP is legitimately only a few hundred bytes, so the caller
 *   sets this rather than sharing one threshold.
 */
async function download(url, minBytes, attempt = 1) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'woman-authority-template/1.0' },
      signal: AbortSignal.timeout(45_000),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const buffer = Buffer.from(await response.arrayBuffer())
    if (buffer.length < minBytes) throw new Error(`truncated (${buffer.length}b)`)
    if (buffer[0] !== 0xff || buffer[1] !== 0xd8) throw new Error('not a JPEG')
    return buffer
  } catch (error) {
    if (attempt >= 3) throw error
    await new Promise((resolve) => setTimeout(resolve, 800 * attempt))
    return download(url, minBytes, attempt + 1)
  }
}

/** Runs `task` over `items` with at most `limit` in flight. */
async function pool(items, limit, task) {
  let cursor = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) await task(items[cursor++])
    }),
  )
}

const entries = Object.entries(PHOTOS)
const generated = {}
const failures = []
let downloaded = 0
let cached = 0

await pool(entries, 6, async ([slot, photo]) => {
  const kind = KINDS[photo.kind]
  if (!kind) throw new Error(`Unknown kind "${photo.kind}" for ${slot}`)
  const [ratioW, ratioH] = kind.ratio

  mkdirSync(join(outDir, dirname(slot)), { recursive: true })

  try {
    const sources = []
    for (const width of kind.widths) {
      const height = Math.round((width * ratioH) / ratioW)
      const file = join(outDir, `${slot}-${width}w.jpg`)
      if (force || !existsSync(file)) {
        // Floor scales with the request: a 96px avatar is legitimately ~1–2KB.
        const minBytes = Math.max(400, Math.round(width * 4))
        writeFileSync(file, await download(pexelsUrl(photo.id, width, height), minBytes))
        downloaded++
      } else {
        cached++
      }
      sources.push({ width, src: `/images/${slot}-${width}w.jpg` })
    }

    const blurFile = join(outDir, `${slot}-blur.jpg`)
    if (force || !existsSync(blurFile)) {
      const blurHeight = Math.max(1, Math.round((20 * ratioH) / ratioW))
      writeFileSync(blurFile, await download(pexelsUrl(photo.id, 20, blurHeight), 120))
    }

    const largest = sources[sources.length - 1]
    generated[slot] = {
      src: largest.src,
      srcSet: sources.map((s) => `${s.src} ${s.width}w`).join(', '),
      width: largest.width,
      height: Math.round((largest.width * ratioH) / ratioW),
      blur: `data:image/jpeg;base64,${readFileSync(blurFile).toString('base64')}`,
      alt: photo.alt,
      credit: `https://www.pexels.com/photo/${photo.id}/`,
    }
  } catch (error) {
    failures.push(`${slot}: ${error.message}`)
  }
})

// Keep manifest order stable regardless of completion order.
const ordered = {}
for (const [slot] of entries) if (generated[slot]) ordered[slot] = generated[slot]

if (failures.length) {
  console.error(`\n${failures.length} slot(s) failed:`)
  for (const failure of failures) console.error(`  ${failure}`)
}

writeFileSync(
  join(root, 'src', 'data', 'images.generated.ts'),
  `/**
 * GENERATED — do not edit by hand.
 * Run \`npm run images\` after changing scripts/images.manifest.mjs.
 *
 * Photography from Pexels (free for commercial use, no attribution required).
 */

export type GeneratedImage = {
  src: string
  srcSet: string
  width: number
  height: number
  /** Base64 LQIP painted behind the photo until it decodes. */
  blur: string
  alt: string
  credit: string
}

export const IMAGES = ${JSON.stringify(ordered, null, 2)} as const satisfies Record<string, GeneratedImage>

export type ImageKey = keyof typeof IMAGES
`,
  'utf8',
)

console.log(
  `\n${Object.keys(ordered).length}/${entries.length} slots ready ` +
    `(${downloaded} downloaded, ${cached} cached)`,
)
