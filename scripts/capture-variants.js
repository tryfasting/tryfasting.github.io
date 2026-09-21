// Run through Playwright CLI: run-code --filename=scripts/capture-variants.js
// Source selectors are backed by a CLI snapshot before this batch.
async (page) => {
  const variants = ['baseline', 'd-editorial', 'e-ledger', 'f-grid'];
  const results = [];
  let controlText;
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('requestfailed', (request) => errors.push(request.url()));
  for (const variant of variants) {
    for (const width of [1440, 375]) {
      await page.setViewportSize({ width, height: 1000 });
      const route = variant === 'baseline' ? '/' : `/experiments/${variant}`;
      const response = await page.goto(`http://127.0.0.1:4325${route}`, { waitUntil: 'networkidle' });
      if (!response.ok()) throw new Error(`${variant}: HTTP ${response.status()}`);
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => {
        const style = (selector) => getComputedStyle(document.querySelector(selector));
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          background: style('body').backgroundColor,
          heading: style('h1').fontSize,
          index: style('.index-number').fontSize,
          title: style('.projects-section h3').fontSize,
          body: style('.profile-overview .measure').fontSize,
          font: style('h1').fontFamily,
          imagesLoaded: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
          columns: style('.projects-section .grid-loose').gridTemplateColumns,
          content: document.querySelector('main').textContent.replace(/\s+/g, ' ').trim(),
        };
      });
      if (!controlText) controlText = result.content;
      if (result.content !== controlText) throw new Error(`${variant}: content changed`);
      delete result.content;
      if (result.overflow || !result.imagesLoaded) throw new Error(`${variant}/${width}: layout or image failure`);
      if (width === 375 && result.columns.split(' ').length !== 1) throw new Error('Mobile must have one column');
      await page.screenshot({ path: `artifacts/v1.6/${variant}-${width}.png`, fullPage: true });
      if (width === 1440) {
        await page.locator('.hero-section').screenshot({ path: `artifacts/v1.6/${variant}-hero.png` });
        await page.locator('.projects-section').screenshot({ path: `artifacts/v1.6/${variant}-projects.png` });
      }
      await page.emulateMedia({ colorScheme: 'dark' });
      if (await page.evaluate(() => getComputedStyle(document.body).backgroundColor) !== result.background) throw new Error('Light mode changed');
      await page.emulateMedia({ colorScheme: 'light' });
      await page.keyboard.press('Tab');
      const focus = await page.evaluate(() => document.activeElement?.textContent);
      if (focus !== '본문으로 건너뛰기') throw new Error('Keyboard skip link missing');
      results.push({ variant, width, ...result, keyboardFocus: focus });
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('VARIANT_RESULTS=' + JSON.stringify(results));
  return results;
}
