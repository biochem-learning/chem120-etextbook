const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE || undefined, args: ['--no-sandbox'] });
  try {
    const errors = [];
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.route(/https?:\/\/(?!127\.0\.0\.1)/, route => route.abort());
    const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8080/chem120-etextbook/';
    await page.goto(base + '#/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('heading', { name: 'Organic Chemistry E-Text' }).waitFor();
    if (await page.getByRole('link', { name: /^Unit / }).count() !== 10) throw new Error('Expected 10 published units');
    await page.getByText('Contents', { exact: true }).click();
    await page.getByRole('navigation', { name: 'Textbook contents' }).getByRole('link', { name: /^Unit 1[.]/ }).click();
    await page.locator('article').waitFor();
    if (!page.url().includes('#/units/1')) throw new Error('Sidebar navigation failed');
    if (await page.locator('#main-content').evaluate(el => document.activeElement === el) === false && await page.locator('h1').evaluate(el => document.activeElement === el) === false) throw new Error('Focus did not move to lesson');
    for (let id = 1; id <= 10; id++) {
      await page.goto(base + '#/units/' + id, { waitUntil: 'domcontentloaded' });
      await page.locator('article').waitFor();
      const blocks = await page.locator('article').locator(':scope > *').count();
      if (!blocks) throw new Error('Empty unit ' + id);
      console.log('Unit', id, blocks, 'blocks');
    }
    await page.goto(base + '#/unit1');
    await page.locator('article').waitFor();
    if (!page.url().includes('#/units/1')) throw new Error('Legacy redirect failed');
    await page.goto(base + '#/units/11');
    await page.getByText(/Draft lesson:/).waitFor();
    await page.goto(base + '#/units/999');
    await page.getByRole('heading', { name: 'Unit not found' }).waitFor();
    await page.goto(base + '#/units/10');
    await page.locator('article').waitFor();
    await page.getByRole('button', { name: 'Load molecular model' }).click();
    await page.waitForTimeout(1000);
    for (const control of ['Rotate left', 'Rotate right', 'Rotate up', 'Rotate down', 'Zoom in', 'Zoom out', 'Reset view']) await page.getByRole('button', { name: control }).click();
    if (await page.locator('.model-block canvas').count() !== 1) throw new Error('Model canvas missing');
    console.log('Model controls: passed');
    await page.goto(base + '#/units/2');
    await page.locator('article').waitFor();
    if (await page.locator('article ul').count() === 0) throw new Error('Bullet lists did not render as unordered lists');
    await page.goto(base + '#/units/3');
    await page.locator('article').waitFor();
    await page.setViewportSize({ width: 320, height: 720 });
    const width = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    if (width[0] > width[1]) throw new Error('Mobile overflow ' + width);
    console.log('Mobile viewport fits:', width.join('/'));
    console.log('Page errors:', errors);
    if (errors.length) throw new Error('Unhandled browser errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
