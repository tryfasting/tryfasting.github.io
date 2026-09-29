# 최종 구현 및 운영 안내

## 후속 수정: 가독성·이니셜·사진

- 좌상단과 favicon은 이름 선종의 이니셜 `SJ`로 수정.
- 프로젝트 요약은 데스크톱 18px / 모바일 17px, 소개·경력·상세·기술 설명은 16px로 확대.
- 실제 사진 원본 `유선종  2_1.jpg`와 미리보기 자산 `public/portrait-local.jpg`는 모두 Git에서 제외. 사진은 원본 비율로 작게 표시.
- 사진은 GitHub Actions의 `PORTFOLIO_PORTRAIT_1`부터 `_6`까지 암호화된 Secrets에서 복원한다. JPEG의 Base64를 30,000자씩 나눈 값이며 빌드 전에 `public/portrait-local.jpg`로 주입한다. 입력이 없거나 잘못되면 배포 빌드가 실패한다. 사진 교체 시 로컬 파일과 Secrets를 함께 갱신해야 한다.
- 저장소 파일 목록에 사진을 남기지 않는 것과 웹에 표시된 사진의 다운로드를 막는 것은 다르다. 후자는 보장할 수 없다.

2026-09-21 · main 배포 완료 · 공개 화면 검증 통과

## 전체 진행 순서

1. [x] 기존 계획·레퍼런스·지원서 작성 파이프라인 확인.
2. [x] 사실 자료에서 공개용 경력·프로젝트·인적사항 추출. 근거는 `private/CONTENT_FACTS.md`에 로컬 보관.
3. [x] 한화용 오렌지와 일반용 코발트 테마, 회사별 콘텐츠 설정 분리.
4. [x] 실제 원고·사진·연락처·GitHub 링크를 편집형 UI에 반영.
5. [x] 프로덕션 빌드, 375px·1440px 화면과 링크·상세 펼치기·404 검증.
6. [x] 사용자의 최종 외형·공개 원고 검수 및 main 배포 요청 수신.
7. [x] dev 변경을 main에 반영하고 GitHub Pages 배포 완료 (`b477cc8`).
8. [x] 실제 공개 URL의 375px·1440px 화면, 사진·링크·테마·상세 펼치기·404 확인.

## 검수 위치

- `artifacts/final/index.html`: 한화·일반용 375px/1440px 스크린샷 비교.
- `artifacts/final/validation.json`: 자동 검증 결과.
- `http://127.0.0.1:4326/hanwha/`: 한화용 실제 동작 미리보기.
- `http://127.0.0.1:4326/general/`: 일반용 실제 동작 미리보기.
- 로컬 서버 종료 후에는 `npm run build`, `npm run preview -- --port 4326`으로 다시 시작.

## 수정할 파일

| 목적 | 파일 |
|---|---|
| 공통 개인정보·경험·기술·프로젝트, 회사별 소개·프로젝트 순서 | `src/data/portfolio.ts` |
| 테마 색상 | `src/data/themes.ts` |
| 실제 페이지 구조 | `src/components/SitePortfolio.astro` |
| 실제 페이지 핵심 CSS | `src/styles/site.css` |
| 회사별 정적 URL 생성 | `src/pages/[company]/index.astro` |
| 기본 주소 | `src/pages/index.astro` |

`global.css`, `experiments.css`, `refined.css`는 이전 실험용이다. 최종 페이지는 `site.css`를 사용한다.

새 회사는 `campaigns`에 `{ slug, theme, label }` 한 줄만 추가한다(예: `'hanwha-ocean': { slug: 'hanwha-ocean', theme: 'hanwha', label: 'HANWHA OCEAN · AX' }`). 본문 문구는 모든 회사 페이지가 `profile`과 각 프로젝트의 `nextStep`을 공유하며, 회사별 소개문을 따로 쓰지 않는다(2026-09-30 사용자 결정 — 원고가 늘면 헷갈림). `check-final.cjs`가 캠페인 간 본문 일치를 검사하므로 새 slug도 `accents`에 추가한다. 회사 페이지에는 noindex가 붙고, `indexable: true`인 `/general/`만 검색 색인을 허용한다. 이미 제출한 주소의 slug(`hanwha` = 한화금융)는 바꾸지 않는다. 새로운 색상이면 `portfolioThemes`에도 추가한다. 빌드하면 `/{slug}/index.html`이 생성되어 직접 접속·새로고침이 된다. 별도 FastAPI, 데이터베이스, 클라이언트 라우터가 필요 없다. 회사별 페이지는 모두 공개 URL이며 접근제한 기능이 아니다.

루트 `/`는 기존 제출 주소를 유지하기 위해 한화용을 보여주며 canonical은 `/hanwha/`다. `/general/`은 한화 언급 없이 별도 원고와 코발트 색상을 사용한다.

## 콘텐츠 기준

- 이름 유선종, 이메일 `2015111004@yonsei.ac.kr` 사용. 다른 후보 주소는 임의 수정하지 않았다.
- SmartRouter의 공개 저장소로 연결. Defect Detection은 확인된 공개 저장소가 없어 링크를 만들지 않았다.
- F1 0.788(@0.25)은 분류 모델 평가값이며, 재검증에서 강도 규칙과 결정 99.65%가 일치한 한계를 함께 적는다. 미검증 비용 절감률·품질 보존율, FastAPI 서빙 구현은 사용하지 않는다(2026-09-29 FACTS.md 기준 정정).
- 개인 학습 프로젝트는 `studies`에 추가하고 캠페인의 `studyIds`로 노출한다. 문구는 `01-active/learning/**/EVIDENCE.md`와 `apply/docs/FACTS.md` "Practice 학습 프로젝트" 범위 안에서만 쓰고, 각 카드의 "지원서에 쓰지 않을 표현"을 지킨다. 증거 카드가 없는 프로젝트는 싣지 않는다. 공개 저장소가 생기면 `repository`만 채운다.
- 책·강의는 `learnings`에 추가하고 `profile.learningIds`로 노출한다. 진행 범위는 사실대로 적는다(예: Tiny Python Projects 14/21장). 책 표지는 공식 페이지 이미지를 `public/covers/`에 WebP로 저장하며 외부 이미지를 직접 링크하지 않는다. 강의는 인물 사진·썸네일 대신 `coverLines`로 만든 글자 표지를 쓴다. "딥 러닝 파이토치 교과서"는 부제의 "LLM 파인튜닝"을 쓰지 않는다(해당 장 미학습).
- 팀 성과와 본인의 구현 역할을 구분하고, 금융 분야 목표는 향후 지향점으로 서술했다.
- 지원서 원문과 비공개 근거는 정적 배포 디렉터리에 포함하지 않는다. `planning/private/`는 Git 제외 대상이다.

## 검증 및 배포

`npm run build` 성공: 루트·한화·일반·404의 정적 HTML 4개 생성. 실험 페이지는 배포 빌드에서 제외된다.

미리보기 서버를 실행한 뒤 `node scripts/check-final.cjs`로 4개 화면, 이미지 로딩, 가로 넘침, 회사별 색상과 canonical, 이메일과 저장소 주소, 상세 펼치기와 키보드 닫기, 연락 앵커, 잘못된 URL의 404를 확인한다. 이 스크립트는 현재 환경에 제공된 Playwright 런타임을 사용한다.

사용자의 `main으로 배포해줘` 요청에 따라 배포를 완료했다. Actions 실행 `35608385109` 성공, 실제 사이트에서도 자동 검증 4개 화면을 통과했고 사진 파일이 로컬 원본과 일치함을 확인했다. 검증 기록은 로컬 `artifacts/live/`에 보관한다. OG 제목·설명은 설정되어 있으며 별도 공유 카드 이미지는 아직 없다.
