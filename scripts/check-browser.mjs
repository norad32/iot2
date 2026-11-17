import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import assert from 'node:assert/strict'

const port = Number(process.env.PORT || 3040)
const origin = `http://localhost:${port}`
const child = spawn(process.execPath, ['node_modules/@slidev/cli/bin/slidev.mjs', 'slides.md', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'] })
let logs = ''
child.stdout.on('data', data => { logs += data })
child.stderr.on('data', data => { logs += data })
let browser
try {
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  // Headless Chromium cannot hold a screen wake lock; disable only this UI preference.
  await page.addInitScript(() => localStorage.setItem('slidev-wake-lock', 'false'))
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  let ready = false
  for (let attempt = 0; attempt < 90; attempt++) {
    try { const response = await fetch(origin); if (response.ok) { ready = true; break } } catch {}
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  assert(ready, `Slidev did not start:\n${logs}`)
  // The lesson decks use only plain slide separators after their headmatter.
  const source = await readFile('slides.md', 'utf8')
  const slides = source.split(/^---\s*$/m).slice(2)
  let quizzes = 0
  const layoutErrors = []
  for (let index = 0; index < slides.length; index++) {
    await page.goto(`${origin}/${index + 1}`, { waitUntil: 'networkidle' })
    const slide = page.locator('.slidev-page:not([style*="display: none"]) .slidev-layout').first()
    await slide.waitFor()
    const checkLayout = () => slide.evaluate(el => {
      const box = (el.querySelector('.marp-content') || el).getBoundingClientRect()
        return [...el.querySelectorAll('h1, h2, p, li, table, pre, .mermaid svg, fieldset, .quiz-controls, .quiz-feedback')]
        .filter(node => node.getBoundingClientRect().height > 0)
        .filter(node => node.getBoundingClientRect().bottom > box.bottom + 3
          || node.getBoundingClientRect().top < box.top - 3
           || node.getBoundingClientRect().right > box.right + 3
           || node.getBoundingClientRect().left < box.left - 3)
        .map(node => node.textContent.slice(0, 80))
    })
    const overflow = await checkLayout()
    if (overflow.length) layoutErrors.push({ slide: index + 1, overflow })
    const quiz = slide.locator('.quiz')
    if (!await quiz.count()) continue
    quizzes++
    const answer = Number(slides[index].match(/:answer="(\d+)"/)[1])
    const radios = quiz.getByRole('radio')
    const check = quiz.getByRole('button', { name: 'Prüfen', exact: true })
    assert(await check.isDisabled())
    await radios.nth((answer + 1) % await radios.count()).check()
    await check.click()
    assert.match(await quiz.getByRole('status').innerText(), /Noch nicht richtig/)
    await radios.nth(answer).check()
    await check.click()
    assert.match(await quiz.getByRole('status').innerText(), /Lösung/)
    await quiz.getByRole('button', { name: 'Zurücksetzen' }).click()
    assert(await check.isDisabled())
    await quiz.getByRole('button', { name: 'Auflösen' }).click()
    assert.match(await quiz.getByRole('status').innerText(), /Lösung/)
    const revealedOverflow = await checkLayout()
    if (revealedOverflow.length) layoutErrors.push({ slide: index + 1, revealedOverflow })
    // Quiz keyboard input must not advance the slide.
    const before = page.url()
    await quiz.getByRole('button', { name: 'Zurücksetzen' }).focus()
    await page.keyboard.press('Enter')
    assert.equal(page.url(), before)
    await page.emulateMedia({ media: 'print' })
    assert(await quiz.locator('.quiz-print').isVisible())
    await page.emulateMedia({ media: 'screen' })
    // Slidev also exports individual slides using its print query in screen media.
    await page.goto(`${origin}/${index + 1}?print=true`, { waitUntil: 'networkidle' })
    assert(await page.locator(`.slidev-page-${index + 1} .quiz.exporting .quiz-print`).isVisible())
  }
  assert.deepEqual(layoutErrors, [], 'Content overlaps the branded header/footer or slide edges')
  assert.deepEqual(errors, [], 'Browser errors')
  console.log(`Verified ${slides.length} slides and ${quizzes} quizzes (wrong/right/reset/reveal/print).`)
} finally {
  await browser?.close()
  child.kill('SIGTERM')
}
