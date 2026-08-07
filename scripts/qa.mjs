/**
 * Visual + layout QA sweep.
 *
 * Loads every route at three viewports (plus a dark-mode pass), writes
 * screenshots to `.qa/`, and reports:
 *   - horizontal overflow (scrollWidth > clientWidth)
 *   - elements escaping the viewport without a clipping ancestor
 *   - images that failed to load
 *   - console and uncaught page errors
 *
 * Start the dev server first, then:  npm run qa
 * Pass a route name to capture that one full-page:  node scripts/qa.mjs blog
 *
 * Drives the locally installed Chrome via playwright-core, so no browser
 * download is required. Override with CHROME_PATH if yours lives elsewhere.
 */
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000'
const OUT = process.env.SHOT_DIR ?? './.qa'
mkdirSync(OUT, { recursive: true })

const ROUTES = [
  ['home', '/'],
  ['about', '/about'],
  ['expertise', '/expertise'],
  ['speaking', '/speaking'],
  ['blog', '/blog'],
  ['article', '/blog/the-7-systems-top-performers-use-every-single-day'],
  ['contact', '/contact'],
  ['ai-for-business', '/ai-for-business'],
  ['booking', '/booking'],
  ['newsletter', '/newsletter'],
  ['terms', '/terms'],
  ['privacy', '/privacy'],
  ['404', '/nope'],
]

const VIEWPORTS = [
  ['desktop', 1440, 900],
  ['tablet', 834, 1100],
  ['mobile', 390, 844],
]

const browser = await chromium.launch({
  executablePath: CHROME,
})

const only = process.argv[2]
const problems = []

for (const [vpName, width, height] of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: 'light',
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  const consoleErrors = []
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text())
  })
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`))

  for (const [name, path] of ROUTES) {
    if (only && only !== name) continue
    consoleErrors.length = 0
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)

    const report = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth
      const overflow = []
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && (r.right > vw + 2 || r.left < -2)) {
          const style = getComputedStyle(el)
          let clipped = false
          for (let p = el.parentElement; p; p = p.parentElement) {
            const o = getComputedStyle(p).overflowX
            if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') {
              clipped = true
              break
            }
          }
          if (!clipped && style.position !== 'fixed') {
            overflow.push(
              `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} right=${Math.round(r.right)}`,
            )
          }
        }
      }
      const brokenImages = [...document.images]
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.getAttribute('src'))
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: vw,
        overflow: overflow.slice(0, 5),
        brokenImages: brokenImages.slice(0, 5),
        h1Count: document.querySelectorAll('h1').length,
      }
    })

    const horizontal = report.scrollWidth > report.clientWidth + 2
    if (horizontal || report.overflow.length || report.brokenImages.length || consoleErrors.length) {
      problems.push({ vpName, name, ...report, consoleErrors: [...consoleErrors].slice(0, 3) })
    }

    if (vpName === 'desktop' || only) {
      await page.screenshot({ path: `${OUT}/${name}-${vpName}.png`, fullPage: Boolean(only) })
    }
  }
  await context.close()
}

const darkContext = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: 'dark',
})
const darkPage = await darkContext.newPage()
for (const name of ['home', 'blog', 'contact']) {
  const path = ROUTES.find(([n]) => n === name)[1]
  await darkPage.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })
  await darkPage.waitForTimeout(400)
  await darkPage.screenshot({ path: `${OUT}/${name}-dark.png` })
}
await darkContext.close()

console.log(problems.length ? JSON.stringify(problems, null, 1) : 'No layout problems found.')
await browser.close()
