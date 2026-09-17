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

앞으로 어떤 프롬프트를 받더라도:
1. 이 문서의 표에 있는 값부터 코드에 실제로 반영되어 있는지 먼저 확인하라.
2. 사용자가 특정 요소만 콕 집어 수정을 요청하면, 그 요소만 바꾸고 표의 다른 값들은 절대 함께 바꾸지 마라 (v1.1에서 발생한 실수 = 사진 추가 지시를 처리하다 h1 크기까지 같이 건드림).
3. 수정이 끝나면 이 문서의 표 값을 실제 반영된 최종값으로 갱신하고, 변경 이력에 한 줄을 추가하라.
4. Font size, letter-spacing, and line-height values must be controlled only through named classes in global.css (e.g. `.index-number`, `.section-label`) or element selectors (h1, p) — never through Tailwind size utility classes applied directly on components. Violating this causes a specificity bug where policy values get silently overridden, as happened between v1.1 and v1.2.

