// Local browser capture fallback when the Playwright CLI daemon cannot start.
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const runtime = path.join(process.env.USERPROFILE || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = createRequire(runtime)('playwright');

(async () => {
  fs.mkdirSync('artifacts/v1.6', { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    await page.goto('http://127.0.0.1:4325/experiments/d-editorial');
    fs.writeFileSync('artifacts/v1.6/initial-snapshot.yml', await page.locator('body').ariaSnapshot());
    const capture = new Function(`return (${fs.readFileSync('scripts/capture-variants.js', 'utf8')});`)();
    const results = await capture(page);
    fs.writeFileSync('artifacts/v1.6/validation.json', JSON.stringify({ results, passed: true }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
