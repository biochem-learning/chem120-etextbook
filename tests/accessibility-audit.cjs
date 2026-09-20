const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const axe = fs.readFileSync(process.env.AXE_SCRIPT || '/tmp/bioText-axe.min.js', 'utf8');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE || undefined, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.route(/https?:\/\/(?!127\.0\.0\.1)/, route => route.abort());
    const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8080/chem120-etextbook/';
    let count = 0;
    for (let id = 1; id <= 10; id++) {
      await page.goto(base + '#/units/' + id, { waitUntil: 'domcontentloaded' });
      await page.locator('article').waitFor();
      await page.addScriptTag({ content: axe });
      const result = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }));
      for (const violation of result.violations) {
        console.log('Unit', id, violation.id, violation.impact, violation.nodes.map(node => node.target.join(' ')).join(', '));
        count++;
      }
      const brokenImages = await page.locator('article img').evaluateAll(async images => (await Promise.all(images.map(async image => ({ src: image.src, ok: (await fetch(image.src)).ok })))).filter(item => !item.ok).map(item => item.src));
      if (brokenImages.length) throw new Error('Unit ' + id + ' broken images: ' + brokenImages.join(', '));
    }
    console.log('WCAG A/AA axe violations:', count);
    if (count) process.exitCode = 1;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
