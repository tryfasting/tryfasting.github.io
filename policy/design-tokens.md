# 디자인 규칙 (단일 진실 공급원 — Single Source of Truth)

이 문서는 프로젝트의 모든 디자인 값(폰트 크기, 간격, 색상)의 최종 기준이다. 앞으로 어떤 수정 지시를 받든, 이 문서에 없는 값을 임의로 바꾸지 말고, 수정 후에는 반드시 이 문서도 함께 갱신하라. 이 문서와 실제 코드가 어긋나 있으면 이 문서를 기준으로 코드를 맞춰라.

## 타이포그래피 스케일 (고정값, 임의 조정 금지)

| 요소 | font-size (clamp) | font-weight | line-height | letter-spacing |
|---|---|---|---|---|
| h1 (이름) | clamp(2.75rem, 5.5vw, 4rem) | 700 | 1.02 | -0.03em |
| h2 (섹션 없음, 미사용) | - | - | - | - |
| .index-number (01. 02. ...) | clamp(2rem, 3.5vw, 2.75rem) | 600 | 1 | -0.02em |
| .section-label (EXPERIENCE, MAIN PROJECTS) | 0.8rem | 700 | 1.4 | 0.08em |
| body p (본문) | 1.0625rem | 400 | 1.6 | normal |
| .period-label ([시작-종료]) | 0.75rem | 400 | 1.4 | normal |

## 간격 스케일 (CSS 변수, 값 변경 시 여기부터 수정)

| 변수 | 값 | 용도 |
|---|---|---|
| --space-xs | 8px | 인라인 요소 간 최소 간격 |
| --space-sm | 16px | 라벨-제목 간격 |
| --space-md | 24px | 문단 내부 요소 간격 |
| --space-lg | 40px | 카드 내부 블록 간격 |
| --space-xl | 64px | 섹션 내부 상하 패딩 (모바일 기준) |
| --space-2xl | 96px | 섹션 내부 상하 패딩 (데스크톱 기준) |

## 레이아웃 고정값

- 컨테이너: `.portfolio-shell { max-width: 1080px; margin: 0 auto; padding: 64px 48px 0; }`
- 프로필 사진: `w-16 h-16` (64px), 라벨 왼쪽에 배치, `rounded-sm`
- 그리드: 프로젝트/경력 카드는 `grid-cols-1 md:grid-cols-2`, gap은 `--space-xl`

## 색상 (고정값)

| 토큰 | 값 | 용도 |
|---|---|---|
| --color-paper | #F7F5F1 | 배경 |
| --color-ink | #16140F | 본문 텍스트, 헤드라인 |
| --color-ink-soft | #4A473F | 보조 텍스트, 라벨 |
| --color-border | #D8D4C9 | 구분선 |
| --color-accent | #F37321 | 한화 오렌지, 포인트 |
| --color-accent-secondary | #1F4FD1 | 코발트, 배지 |

## 액센트 바 규칙

- `.accent-bar-sm`: height 3px, opacity 0.55, width 48px (전체 폭 금지)
- 색상은 항상 `var(--color-accent)`
- 넓은 색면(width: 100%, height 40px 이상)으로 사용 금지 — 이는 v1.0에서 발견된 실수이며 재발 금지

- v1.0: 초기 스케일 대비 확보 (h1 6.5rem까지 확대) — 시원함은 있었으나 "과함" 피드백
- v1.1: 사진/바 조정 과정에서 h1을 3.25rem까지 과도하게 축소 — 스케일 대비 상실, 되돌림 필요
- v1.2: h1 4rem 절충 적용 (`clamp(2.75rem, 5.5vw, 4rem)`), `.index-number`(`clamp(2rem, 3.5vw, 2.75rem)`), 본문 `p`(`1.0625rem`) 및 `.section-label`(`0.8rem`) 토큰 일치화
- v1.3: 타이포그래피 specificity 전수 감사 및 본문 p 태그 유틸리티 제거, CSS 특이도 충돌 방지 규칙 추가

## 사용 규칙

### v1.7 G 개선안 및 URL 테마 (2026-09-18)

사용자 피드백: 앞으로 캡처는 375px/1440px만 생성. 색상 존재감과 선 굵기를 강화하고 기업별 URL 테마를 실험합니다.

- 경로: `/experiments/g-refined/hanwha`, `/experiments/g-refined/cobalt` (개발 전용)
- 테마의 단일 기준: `src/data/themes.ts`. 한화 강조 #F37321 / 읽기용 진한 색 #9C3A00 / 연한 면 #FBE9DC. 코발트 #1F4FD1 / #1A3FA6 / #E8EDFA. 진한 색·연한 면은 자체 보조색이며 기업 공식 색상으로 주장하지 않습니다.
- 구현: `src/styles/refined.css`. G 최대 폭 1120px, 섹션 상하 80px/56px, 이름 clamp(44px,5.2vw,64px), 프로젝트 제목 clamp(24px,2.3vw,28px), 번호18px, 사진44px.
- 선: 주요 섹션2px #A9A399, 내부 구분1px, 섹션 마커96×5px, 최상단 마커120×7px. 장식선으로 의미를 전달하지 않으며 실제 제목·본문은 텍스트로 유지.
- 색상: 메타 정보 줄의 연한 배경·4px 좌측 선, 섹션 라벨·번호의 진한 색. 제목의 가짜 링크 같은 밑줄 제거. 테마별 보조색도 함께 교체.
- 같은 공통 콘텐츠를 공유하고 테마는 허용된 경로 값으로만 지정. 생산 빌드에는 아직 포함하지 않음. 최종 테마 확정 후 `/hanwha/` 같은 정식 정적 경로로 승격 가능.

### v1.6 로컬 실험 예외 (2026-09-18)

사용자가 dev에서 복수 디자인 실험을 승인했습니다. 기존 `/`의 위 기준은 유지하며, `/experiments/*`에 한해 `src/styles/experiments.css`의 이름 있는 선택자로 다음 값을 적용합니다. 공통 컴포넌트의 텍스트·데이터·이미지는 변경하지 않습니다. 이 경로는 개발 서버 전용이고 프로덕션 빌드에서 생성하지 않습니다.

| 값 | D 문서형 | E 목록형 | F 넓은 그리드형 |
|---|---|---|---|
| 컨테이너 최대 폭 | 1120px | 1040px | 1200px |
| h1 clamp | 2.75rem / 5.4vw / 4.5rem | 2.75rem / 5vw / 4rem | 3rem / 6vw / 5.25rem |
| h1 굵기 / 행간 / 자간 | 700 / 1.04 / -0.045em | 동일 | 동일 |
| 번호 | 16px / 500 | 16px / 500 | 22px / 500 |
| 프로젝트 제목 | 24px | 24px | clamp(24px, 2.5vw, 34px) |
| 본문 | 16px / 1.8 | 동일 | 동일, 데스크톱 Overview만 18px |
| 라벨 | 12px / 700 / 1.4 / 0.1em | 동일 | 동일 |
| 섹션 상하 간격 (데스크톱 / 모바일) | 88px / 56px | 72px / 56px | 112px / 64px |
| 사진 | 44px, 좌측 | 48px, 우측 | 44px, 우측 |
| 프로젝트 | 라벨 열 + 2단 카드 | 1단 행, 번호·제목·설명 3열 | 2단 카드, gap 64px/72px |

공통: 상단 바깥 여백 48px/24px, 히어로 상단 56px/32px, footer 상하 28px. 767px 이하 카드·소개는 1단, 900px 이하 D의 라벨 열은 위로 이동. 색상과 Pretendard 폰트는 기존 토큰 유지. 작은 번호·실선·제목 밑줄로 강조하며 전체 색면을 추가하지 않음. 모든 세부 값의 구현은 실험 CSS에 한정합니다.

v1.6 변경 이력: dev에 D/E/F 로컬 전용 시안과 재현·비교 도구 추가. 기존 디자인 선택 및 콘텐츠 확정은 하지 않음.

앞으로 어떤 프롬프트를 받더라도:
1. 이 문서의 표에 있는 값부터 코드에 실제로 반영되어 있는지 먼저 확인하라.
2. 사용자가 특정 요소만 콕 집어 수정을 요청하면, 그 요소만 바꾸고 표의 다른 값들은 절대 함께 바꾸지 마라 (v1.1에서 발생한 실수 = 사진 추가 지시를 처리하다 h1 크기까지 같이 건드림).
3. 수정이 끝나면 이 문서의 표 값을 실제 반영된 최종값으로 갱신하고, 변경 이력에 한 줄을 추가하라.
4. Font size, letter-spacing, and line-height values must be controlled only through named classes in global.css (e.g. `.index-number`, `.section-label`) or element selectors (h1, p) — never through Tailwind size utility classes applied directly on components. Violating this causes a specificity bug where policy values get silently overridden, as happened between v1.1 and v1.2.



## 최종 편집형 페이지 — 2026-09-21

실서비스 경로 `/`, `/hanwha/`, `/general/`은 `src/styles/site.css`와 `src/data/themes.ts`를 사용한다. 이전 global/refined/experiments 스타일은 실험용으로 유지한다.

- 배경 #F7F5F1, 본문 #16140F, 보조문 #57534A, 경계 #D0CBC1.
- Pretendard Variable; 주요 본문 18px, 모바일 요약 17px, 세부 설명 16px.
- 중앙 컨테이너 최대 1200px, 좌우 여백 48px / 모바일 24px. 텍스트 좌측 정렬.
- 편집 그리드 1:3, 모바일 767px 이하 단일 열.
- 주요 구분선 2px와 테마색 96×5px 마커. 작은 글자는 accent-ink 사용.
- 이름 최대 80px, 주요 문장 최대 38px, 모바일 27px. 사진 72×93px / 모바일 56×72px.
- 한화 #F37321, 일반 코발트 #1F4FD1. 기업별 색과 원고는 공통 레이아웃에서 분리.
