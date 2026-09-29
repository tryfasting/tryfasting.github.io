// Screenshot-only capture of a deployed site: node scripts/capture-site.cjs <baseUrl> <outDir>
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const runtime = path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = createRequire(runtime)('playwright');

const [baseUrl = 'https://tryfasting.github.io', output = 'artifacts/main'] = process.argv.slice(2);
const pages = ['', 'hanwha', 'hanwha-ocean', 'general'];

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const shots = [];
  try {
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    for (const slug of pages) {
      const url = `${baseUrl.replace(/\/$/, '')}/${slug ? `${slug}/` : ''}`;
      for (const width of [1440, 375]) {
        await page.setViewportSize({ width, height: 1000 });
        const response = await page.goto(url, { waitUntil: 'networkidle' });
        if (!response || response.status() !== 200) break;
        await page.evaluate(() => document.fonts.ready);
        const file = `${slug || 'root'}-${width}.png`;
        await page.screenshot({ path: path.join(output, file), fullPage: true });
        shots.push({ slug: slug || '/', width, url, file });
      }
    }
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(output, 'meta.json'), JSON.stringify({ capturedAt: new Date().toISOString(), baseUrl, shots }, null, 2));
  const cards = shots.map(({ slug, width, file }) => `<article><h2>${slug} · ${width}px</h2><a href="${file}"><img src="${file}" alt="${slug} ${width}px"></a></article>`).join('');
  fs.writeFileSync(path.join(output, 'index.html'), `<!doctype html><html lang="ko"><meta charset="utf-8"><title>${path.basename(output)} 캡처</title><style>body{font-family:system-ui;background:#f7f5f1;margin:40px}main{display:grid;grid-template-columns:2fr 1fr;gap:32px}img{width:100%;border:1px solid #ccc}h2{font-size:16px}</style><h1>${path.basename(output)} · ${baseUrl}</h1><p>${new Date().toLocaleString('ko-KR')}</p><main>${cards}</main></html>`);
  console.log(JSON.stringify({ output, shots: shots.length }));
})().catch((error) => { console.error(error); process.exitCode = 1; });
