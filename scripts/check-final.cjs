const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const runtime = path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = createRequire(runtime)('playwright');

(async () => {
  const output = 'artifacts/final';
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const errors = [];
  const results = [];
  try {
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => errors.push(request.url()));
    for (const campaign of ['hanwha', 'general']) {
      for (const width of [1440, 375]) {
        await page.setViewportSize({ width, height: 1000 });
        const response = await page.goto(`http://127.0.0.1:4326/${campaign}/`, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        const result = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          images: [...document.images].every(image => image.complete && image.naturalWidth > 0),
          font: getComputedStyle(document.querySelector('h1')).fontFamily,
          accent: getComputedStyle(document.body).getPropertyValue('--accent'),
          canonical: document.querySelector('link[rel=canonical]').href,
          unsafeLinks: [...document.querySelectorAll('a[target=_blank]')].filter(a => !a.rel.includes('noopener')).length,
        }));
        assert.equal(result.overflow, false);
        assert.equal(result.images, true);
        assert.equal(result.unsafeLinks, 0);
        assert.equal(result.accent, campaign === 'hanwha' ? '#F37321' : '#1F4FD1');
        assert.equal(result.canonical, `https://tryfasting.github.io/${campaign}/`);
        assert.equal(await page.locator('h1').textContent(), '유선종.');
        assert.equal(await page.locator('a[href="https://github.com/tryfasting/yds-dmdp-smart-router"]').count(), 1);
        assert.equal(await page.locator('a[href="mailto:2015111004@yonsei.ac.kr"]').count(), 2);
        const text = await page.locator('main').innerText();
        assert(!/\[이름\]|\[기관명\]|36\.6%|98\.4%/.test(text));
        // Claims not backed by apply/docs/FACTS.md or the practice EVIDENCE cards.
        assert(!/FastAPI|F1 0\.78(?!8)|사전학습|LLM을 개발|이벤트 기반|파인튜닝|LoRA/.test(text), 'unsupported claim in page text');
        assert.equal(await page.locator('#self-study .study').count(), 2);
        if (campaign === 'general') assert(!text.includes('한화'));
        await page.screenshot({ path: `${output}/${campaign}-${width}.png`, fullPage: true });
        await page.locator('details summary').first().click();
        assert.equal(await page.locator('details[open]').count(), 1);
        assert(await page.locator('.project-details').first().isVisible());
        await page.locator('details summary').first().press('Enter');
        assert.equal(await page.locator('details[open]').count(), 0);
        await page.locator('nav a[href="#contact"]').click();
        assert(page.url().endsWith('#contact'));
        results.push({ campaign, width, ...result });
      }
    }
    assert.equal((await page.goto('http://127.0.0.1:4326/')).status(), 200);
    assert.equal((await page.goto('http://127.0.0.1:4326/unknown-company/')).status(), 404);
    assert.equal((await page.goto('http://127.0.0.1:4326/experiments/d-document/')).status(), 404);
    assert.deepEqual(errors, []);
    fs.writeFileSync(`${output}/validation.json`, JSON.stringify({ passed: true, results, errors }, null, 2));
    const cards = results.map(({ campaign, width }) => `<article><h2>${campaign} · ${width}px</h2><a href="${campaign}-${width}.png"><img src="${campaign}-${width}.png" alt="${campaign} ${width}px 전체 화면"></a></article>`).join('');
    fs.writeFileSync(`${output}/index.html`, `<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>유선종 포트폴리오 최종 검수</title><style>body{font-family:system-ui;background:#f7f5f1;color:#16140f;margin:40px}a{color:#9c3a00}main{display:grid;grid-template-columns:2fr 1fr;gap:32px}img{width:100%;border:1px solid #ccc}h2{font-size:18px}@media(max-width:700px){main{display:block}}</style><h1>포트폴리오 최종 검수</h1><p><a href="http://127.0.0.1:4326/hanwha/">한화용 실제 화면</a> · <a href="http://127.0.0.1:4326/general/">일반용 실제 화면</a> · <a href="validation.json">검증 결과</a></p><p>스크린샷은 상세 설명을 접은 상태입니다. 실제 화면에서 ‘구현 과정과 결과’를 펼쳐 볼 수 있습니다.</p><main>${cards}</main></html>`);
    console.log(JSON.stringify({ passed: true, screenshots: results.length }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
