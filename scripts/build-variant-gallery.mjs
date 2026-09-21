import { mkdirSync, writeFileSync } from 'node:fs';

const output = 'artifacts/v1.6';
mkdirSync(output, { recursive: true });
const variants = [
  ['baseline', '기존 dev', '비교 기준', '기존 타이포그래피와 여백을 그대로 촬영했습니다.'],
  ['d-editorial', 'D · 문서형', '정렬과 절제', '왼쪽 라벨 열, 작은 번호, 제목 중심의 계층. 격식과 읽기 편한 구성을 우선합니다.'],
  ['e-ledger', 'E · 목록형', '한 항목씩 읽기', '프로젝트를 가로 행으로 정리합니다. 숫자·제목·설명이 같은 정렬선을 공유합니다.'],
  ['f-grid', 'F · 넓은 그리드형', '여백과 대비', '독립된 이름, 작은 사진, 큰 프로젝트 제목. 원본의 넓은 호흡을 가장 적극적으로 반영합니다.'],
];
const cards = variants.map(([id, title, subtitle, description]) => `
<article data-id="${id}" ${id === 'baseline' ? 'hidden' : ''}>
  <div class="caption"><span>${subtitle}</span><h2>${title}</h2><p>${description}</p>
  <a class="original" href="${id}-hero.png" target="_blank">이미지 원본 열기 ↗</a>
  <a href="http://127.0.0.1:4325/${id === 'baseline' ? '' : 'experiments/' + id}" target="_blank">로컬 실제 페이지 ↗</a></div>
  <a class="image-link" href="${id}-hero.png" target="_blank"><img src="${id}-hero.png" alt="${title} 디자인 화면" /></a>
</article>`).join('');
writeFileSync(`${output}/index.html`, `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>포트폴리오 디자인 비교 · v1.6</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f1f0ec;color:#16140f;font-family:system-ui,sans-serif}header{max-width:1600px;margin:auto;padding:40px 28px 24px;border-bottom:1px solid #d8d4c9}h1{font-size:28px;letter-spacing:-1px;margin:8px 0 12px}p{line-height:1.7}header>small{color:#685f54}nav{display:flex;gap:20px;flex-wrap:wrap;align-items:center;margin-top:24px}select,button{font:inherit;padding:8px;border:1px solid #b8b4aa;background:#fff}label{font-size:14px}main{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;padding:28px;max-width:1800px;margin:auto}main.with-baseline{grid-template-columns:repeat(4,minmax(0,1fr))}article{background:#fff;border:1px solid #d8d4c9;min-width:0}article[hidden]{display:none}.caption{padding:22px;min-height:224px;border-top:3px solid #f37321}.caption>span{font-size:12px;color:#686257}.caption h2{font-size:20px;margin:12px 0}.caption p{font-size:14px;min-height:72px}.caption a{font-size:12px;display:inline-block;margin:0 12px 8px 0;color:#1f4fd1}.image-link{display:block;background:#f7f5f1}img{display:block;width:100%;height:auto}main.mobile img{max-width:375px;margin:auto}footer{padding:20px 28px;font-size:13px}a{color:inherit}:focus-visible{outline:2px solid #1f4fd1;outline-offset:4px}@media(max-width:950px){main,main.with-baseline{grid-template-columns:1fr}.caption{min-height:0}.caption p{min-height:0}}
</style></head><body><header><small>SWISSFOLIO STUDY / v1.6 / 2026-09-18</small><h1>같은 내용, 세 가지 디자인</h1><p>기존 원고·사진·항목은 그대로입니다. 이름·이력·프로젝트의 내용 확정은 별도 단계입니다.<br>이 비교 화면은 저장된 이미지로 동작합니다. 로컬 실제 페이지 링크는 개발 서버가 실행 중일 때 사용할 수 있습니다.</p>
<nav><label>화면 <select id="view"><option value="hero">소개 영역</option><option value="projects">프로젝트 영역</option><option value="1440">데스크톱 전체 · 1440px</option><option value="768">태블릿 전체 · 768px</option><option value="375">모바일 전체 · 375px</option></select></label><label><input id="control" type="checkbox"> 기존 dev 함께 보기</label><a href="comparison.md">비교 보고서</a><a href="validation.json">검증 수치</a></nav></header>
<main>${cards}</main><footer>원본 사진과 텍스트를 변경하지 않은 디자인 실험입니다. 이미지를 클릭하면 원본 해상도로 열립니다.</footer>
<script>
const view=document.querySelector('#view'), control=document.querySelector('#control'), main=document.querySelector('main');
function update(){main.classList.toggle('mobile',view.value==='375');main.classList.toggle('with-baseline',control.checked);document.querySelector('[data-id="baseline"]').hidden=!control.checked;document.querySelectorAll('article').forEach(card=>{const src=card.dataset.id+'-'+view.value+'.png';card.querySelector('img').src=src;card.querySelector('.original').href=src;card.querySelector('.image-link').href=src;});}view.addEventListener('change',update);control.addEventListener('change',update);
</script></body></html>`);
console.log(`${output}/index.html`);
