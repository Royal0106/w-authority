/**
 * Renders every photograph in the manifest to one PNG contact sheet so the
 * selection can be reviewed at a glance before it ships.
 *
 *   npm run dev                      (in one terminal)
 *   node scripts/contact-sheet.mjs   all slots
 *   node scripts/contact-sheet.mjs people/   just one group
 */
import { chromium } from 'playwright-core'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000'
const OUT = process.env.SHEET_DIR ?? tmpdir()

const source = readFileSync('src/data/images.generated.ts', 'utf8')

// Each crop ships a different srcset ladder — heroes start at 640, cards at
// 400, avatars at 96 — so read the smallest real source out of the manifest
// rather than assuming a rung that may not exist.
const smallestSrc = new Map()
for (const block of source.matchAll(/^ {2}"([^"]+)": \{[\s\S]*?"srcSet": "([^"]+)"/gm)) {
  smallestSrc.set(block[1], block[2].split(',')[0].trim().split(' ')[0])
}

const group = process.argv[2] || ''
const selected = [...smallestSrc.keys()].filter((k) => k.startsWith(group))

const cells = selected
  .map(
    (key) =>
      `<figure><img src="${BASE}${smallestSrc.get(key)}">` +
      `<figcaption>${key}</figcaption></figure>`,
  )
  .join('')

const htmlPath = join(OUT, 'contact-sheet.html')
writeFileSync(
  htmlPath,
  `<style>body{font:11px system-ui;background:#fff;margin:0;padding:8px;display:grid;` +
    `grid-template-columns:repeat(6,1fr);gap:6px}figure{margin:0}` +
    `img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:#eee}` +
    `figcaption{padding:2px 0;color:#333;font-size:9px;word-break:break-all}</style>${cells}`,
)

const browser = await chromium.launch({ executablePath: CHROME })
const page = await browser.newPage({ viewport: { width: 1200, height: 400 } })
await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const out = process.argv[3] ?? join(OUT, 'contact-sheet.png')
await page.screenshot({ path: out, fullPage: true })
console.log(`${selected.length} photos -> ${out}`)
await browser.close()
