const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const runtime = path.join(process.env.USERPROFILE || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = createRequire(runtime)('playwright');

(async () => {
  const output = 'artifacts/v1.7';
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  const errors = [];
  try {
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('requestfailed', (request) => errors.push(request.url()));
    await page.goto('http://127.0.0.1:4325/');
    const content = await page.locator('main').textContent();
    for (const theme of ['hanwha', 'cobalt']) {
      for (const width of [1440, 375]) {
        await page.setViewportSize({ width, height: 1000 });
        const response = await page.goto(`http://127.0.0.1:4325/experiments/g-refined/${theme}`, { waitUntil: 'networkidle' });
        if (!response.ok()) throw new Error(`HTTP ${response.status()}`);
        await page.evaluate(() => document.fonts.ready);
        if (await page.locator('main').textContent() !== content) throw new Error('Content changed');
        const result = await page.evaluate(() => {
          const style = (selector) => getComputedStyle(document.querySelector(selector));
          const luminance = (color) => {
            const rgb = color.match(/[\d.]+/g).slice(0, 3).map((v) => Number(v) / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
            return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
          };
          const bg = luminance(style('body').backgroundColor);
          const fg = luminance(style('h2.section-label').color);
          return {
            theme: document.body.dataset.theme,
            overflow: document.documentElement.scrollWidth > innerWidth,
            accent: style('body').getPropertyValue('--color-accent'),
            textContrast: (Math.max(bg, fg) + .05) / (Math.min(bg, fg) + .05),
            sectionRule: style('.projects-section').borderTopWidth,
            marker: getComputedStyle(document.querySelector('.projects-section'), '::before').height,
            heading: style('h1').fontSize,
            title: style('.projects-section h3').fontSize,
            columns: style('.projects-section .grid-loose').gridTemplateColumns,
            images: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
          };
        });
        if (result.overflow || !result.images || result.textContrast < 4.5) throw new Error('Layout, image or text contrast failure');
        if (result.accent.trim() !== (theme === 'hanwha' ? '#F37321' : '#1F4FD1')) throw new Error('Theme route failed');
        if (width === 375 && result.columns.split(' ').length !== 1) throw new Error('Mobile columns');
        await page.screenshot({ path: `${output}/g-${theme}-${width}.png`, fullPage: true });
        results.push({ width, ...result });
      }
    }
    const invalid = await page.goto('http://127.0.0.1:4325/experiments/g-refined/unknown');
    if (invalid.status() !== 404) throw new Error('Unknown theme should 404');
    if (errors.length) throw new Error(errors.join('\n'));
    fs.writeFileSync(`${output}/validation.json`, JSON.stringify({ passed: true, results, unknownThemeStatus: 404 }, null, 2));
    console.log(JSON.stringify(results));
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
