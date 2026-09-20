const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_EXECUTABLE || undefined,
    args: ['--no-sandbox']
  });
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 850 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8080/chem120-etextbook/';
    await page.goto(base + '#/units/1', { waitUntil: 'domcontentloaded' });
    await page.locator('article').waitFor();
    const podcast = page.locator('.podcast');
    await podcast.scrollIntoViewIfNeeded();
    assert.equal(await podcast.locator('iframe').count(), 1);
    assert.equal(await podcast.locator('.zoomable-image-trigger').count(), 0);
    const height = await podcast.locator('iframe').evaluate(el => Math.round(el.getBoundingClientRect().height));
    assert.ok(height >= 200 && height <= 230, 'Podcast frame height: ' + height);
    await page.waitForTimeout(1500);
    console.log('Podcast frame height:', height);

    const trigger = page.locator('article > figure .zoomable-image-trigger').first();
    await trigger.click();
    const dialog = page.locator('.image-lightbox');
    await dialog.waitFor({ state: 'visible' });
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    assert.equal(await dialog.locator('output').innerText(), '100%');
    await dialog.getByRole('button', { name: 'Zoom in' }).click();
    assert.ok(parseInt(await dialog.locator('output').innerText(), 10) > 100);
    await dialog.getByRole('button', { name: 'Zoom out' }).click();
    assert.equal(await dialog.locator('output').innerText(), '100%');
    const wheelPrevented = await dialog.locator('.image-lightbox-viewport').evaluate(el => {
      const event = new WheelEvent('wheel', { deltaY: -100, ctrlKey: true, bubbles: true, cancelable: true });
      el.dispatchEvent(event);
      return event.defaultPrevented;
    });
    assert.equal(wheelPrevented, true);
    assert.ok(parseInt(await dialog.locator('output').innerText(), 10) > 100);
    await dialog.locator('.image-lightbox-viewport').evaluate(el => el.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, ctrlKey: true, bubbles: true, cancelable: true })));
    assert.equal(await dialog.locator('output').innerText(), '100%');
    await dialog.getByRole('button', { name: 'Reset zoom' }).click();
    assert.equal(await dialog.locator('output').innerText(), '100%');
    await dialog.getByRole('button', { name: 'Close enlarged image' }).click();
    await dialog.waitFor({ state: 'detached' });
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');

    await trigger.click();
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'detached' });
    await trigger.click();
    await page.locator('.image-lightbox-viewport').evaluate(el => el.click());
    await dialog.waitFor({ state: 'detached' });
    await trigger.click();
    await page.mouse.click(3, 3);
    await dialog.waitFor({ state: 'detached' });

    await page.locator('.table-scroll .zoomable-image-trigger').first().click();
    await dialog.waitFor({ state: 'visible' });
    await dialog.getByRole('button', { name: 'Close enlarged image' }).click();

    await page.setViewportSize({ width: 320, height: 720 });
    await trigger.click();
    await dialog.waitFor({ state: 'visible' });
    const fit = await dialog.evaluate(el => [el.getBoundingClientRect().width, window.innerWidth, el.querySelector('.image-lightbox-viewport').clientHeight]);
    assert.ok(fit[0] <= fit[1] && fit[2] > 250, 'Mobile dialog fit: ' + fit);
    await dialog.getByRole('button', { name: 'Close enlarged image' }).click();
    console.log('Image viewer interactions passed; mobile dialog:', fit);

    await page.goto(base + '#/');
    await page.locator('.home .zoomable-image-trigger').click();
    await dialog.waitFor({ state: 'visible' });
    await dialog.getByRole('button', { name: 'Close enlarged image' }).click();
    assert.deepEqual(errors, []);
    console.log('Home image and page errors: passed');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
