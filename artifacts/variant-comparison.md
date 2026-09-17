# Swissfolio 레퍼런스 실측치 기반 3개 변량(Variant) 배치 비교 보고서

이 보고서는 [`prompt/v1.4_multi-variant-exploration-prompt-en.md`](file:///c:/Workspace/01-active/porfolio-page-agent/prompt/v1.4_multi-variant-exploration-prompt-en.md) 지시에 따라, 원본 저장소(`swissfolio-reference`)의 실제 소스 코드 실측치를 기준으로 생성된 3가지 독립 변량 브랜치(`variant-a-subtle`, `variant-b-scale`, `variant-c-combined`)의 수치, 변경 사항, 스크린샷 및 사실적 거리 비교를 정리한 단일 비교 문서입니다.

> [!NOTE]
> 본 보고서에서는 특정 변량을 "우승작"으로 임의 선정하거나 머지하지 않으며, 사용자가 세 가지 방향성을 일괄 검토할 수 있도록 객관적 사실과 실측 수치만을 제시합니다.

---

## 1. 레퍼런스 실측 비교표 (`policy/reference-diff.md`)

| 속성 분류 | 세부 속성 | 현재 프로젝트 기본값 (v1.3) | 원본 레퍼런스 실측치 (`swissfolio-reference`) | 격차 분석 및 기술적 의미 |
|---|---|---|---|---|
| **헤드라인 (Hero Heading)** | font-size (데스크톱 1440px) | `64px` (`4rem`, `clamp(2.75rem, 5.5vw, 4rem)`) | **`288px`** (`wordmark`) / **`128px`** (`displayHero`) | 레퍼런스는 128~288px의 초대형 디스플레이 타이포 적용. |
| | font-size (모바일 375px) | `44px` (`2.75rem`) | **`80px`** (`5rem`) / **`48px`** (`3rem`) | 모바일에서도 레퍼런스가 최소 48~80px로 훨씬 큼. |
| | line-height | `1.02` | **`0.72` ~ `0.76`** | 레퍼런스는 초극단 타이트 행간으로 글자 간 긴장감 형성. |
| | letter-spacing | `-0.03em` | **`-0.07em` ~ `-0.09em`** | 레퍼런스는 자간을 극단적으로 당겨 밀도 극대화. |
| **프로젝트/카드 타이틀** | font-size (데스크톱 1440px) | `20px` (`text-xl`) | **`72px`** (`4.5rem`, `clamp(2.25rem, 5vw, 4.5rem)`) | 레퍼런스는 프로젝트 제목도 72px 거대 타이포 적용. |
| | line-height / 자간 | `1.25` / `-0.025em` | **`0.85` / `-0.06em`** | 레퍼런스가 훨씬 타이트함. |
| **인덱스 번호 / 메타** | .index-number (1440px) | `44px` (`clamp(2rem, 3.5vw, 2.75rem)`) | **`12px`** (`font-mono text-xs uppercase`) | 레퍼런스는 메타 라벨(12px) 중심, 현재 프로젝트는 그리드 인덱스 강조(44px) 중심. |
| | .section-label | `12.8px` (`0.8rem`), 700, `0.08em` | **`12px`** (`0.75rem`, `font-mono text-xs uppercase`) | 거의 동일함. |
| **주요 섹션 간격 (Section Spacing)** | 섹션 상하 패딩 (데스크톱) | `96px` (`--space-2xl`) | **`128px`** (`py-20 md:py-32` = 128px) | **레퍼런스가 약 33% 더 넓음 (128px vs 96px)**. 스위스폴리오 특유의 '시원하고 여유로운(airy)' 여백의 핵심 요인. |
| | 섹션 상하 패딩 (모바일) | `64px` (`--space-xl`) | **`80px`** (`py-20` = 80px) | 레퍼런스가 25% 더 여유로움. |
| | 내부 블록 간격 | `32px ~ 48px` (`mb-8`, `mb-12`) | **`80px ~ 128px`** (`my-20 md:my-28`, `mt-20 md:mt-32`) | 레퍼런스는 블록 간에도 100px 내외의 큰 간격을 부여. |
| **컨테이너** | max-width / 패딩 | `1080px` / `48px` | **`1280px`** (`max-w-7xl`) / **`16px`** (`px-4`) | 레퍼런스가 가로 200px 더 넓고 좌우 여백이 좁아 외곽까지 꽉 참. |
| **본문 타이포** | font-size / 행간 | `17px` (`1.0625rem`) / `1.6` | **`14px`** (`text-sm`) / **`1.625`** | 레퍼런스는 본문이 14px로 작아 헤드라인과의 대비가 더 큼. |

---

## 2. 변량별 상세 변경 사항 및 적용 토큰

### Variant A: `variant-a-subtle` (여백 단독 회복)
* **Git 정보**: 브랜치 `variant-a-subtle` | 커밋 `a66c5ea` | 태그 `exp-variant-a-subtle`
* **설계 가설**: 타이포그래피 스케일은 v1.3 그대로 유지하고, 주요 섹션 간 여백만 레퍼런스 실측치 수준(+25~30%)으로 넓혔을 때 스위스폴리오 특유의 여유로운 호흡(airy feel)이 살아나는지 검증.
* **적용 CSS 토큰 (`src/styles/global.css`)**:
  ```css
  --space-xl: 80px;   /* 64px -> 80px (+25%, 레퍼런스 모바일 py-20 80px 일치) */
  --space-2xl: 124px; /* 96px -> 124px (+29%, 레퍼런스 데스크톱 md:py-32 128px 근접) */
  --space-3xl: 160px; /* 128px -> 160px (+25%) */
  /* h1, .index-number, 컴포넌트 마크업: v1.3 유지 */
  ```
* **스크린샷**:
  - 데스크톱 (1440px): [`artifacts/variant-a-subtle_preview-1440.png`](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-a-subtle_preview-1440.png)
  - 모바일 (375px): [`artifacts/variant-a-subtle_preview-375.png`](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-a-subtle_preview-375.png)

---

### Variant B: `variant-b-scale` (스케일 대비 단독 회복)
* **Git 정보**: 브랜치 `variant-b-scale` | 커밋 `ec7aeb6` | 태그 `exp-variant-b-scale`
* **설계 가설**: 간격은 v1.3 그대로 유지하고, 헤드라인과 인덱스 번호 및 프로젝트 제목의 스케일 대비를 레퍼런스 실측치 방향으로 공격적으로 확장했을 때의 시각적 충격량 검증.
* **적용 CSS 토큰 (`src/styles/global.css`, `ProjectsSection.astro`)**:
  ```css
  /* 간격: v1.3 유지 (--space-xl: 64px, --space-2xl: 96px, --space-3xl: 128px) */
  
  /* h1 헤드라인: 4rem(64px) -> 5.25rem(84px) 확대 (+31%) */
  h1 {
    font-size: clamp(3.25rem, 6.5vw, 5.25rem);
    font-weight: 700;
    line-height: 0.96;
    letter-spacing: -0.04em;
  }
  
  /* .index-number: 2.75rem(44px) -> 3.25rem(52px) 비례 확대 (+18%) */
  .index-number {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: clamp(2.25rem, 4.2vw, 3.25rem);
    line-height: 1;
    letter-spacing: -0.03em;
  }
  
  /* 프로젝트 카드 타이틀: text-xl(20px) -> text-2xl(24px) */
  ```
* **스크린샷**:
  - 데스크톱 (1440px): [`artifacts/variant-b-scale_preview-1440.png`](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-b-scale_preview-1440.png)
  - 모바일 (375px): [`artifacts/variant-b-scale_preview-375.png`](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-b-scale_preview-375.png)

---

### Variant C: `variant-c-combined` (여백 + 스케일 결합 & 히어로 2단 구조 밀도화)
* **Git 정보**: 브랜치 `variant-c-combined` | 커밋 `0f22979` | 태그 `exp-variant-c-combined`
* **설계 가설**: Variant A의 확장 여백(124px/80px)과 Variant B의 거대 스케일 대비(84px h1)를 결합하고, 히어로 하단 2단 컬럼을 스위스 그리드 방식으로 더 조밀하게 압축 정렬하여 결합 시너지를 검증.
* **적용 CSS 토큰 및 구조 변경**:
  - **간격 토큰**: `--space-xl: 80px`, `--space-2xl: 124px`, `--space-3xl: 160px` (Variant A 동일)
  - **스케일 토큰**: `h1 clamp(3.25rem, 6.5vw, 5.25rem)`, `.index-number clamp(2.25rem, 4.2vw, 3.25rem)`, 프로젝트 제목 `text-2xl` (Variant B 동일)
  - **구조적 개선 (`Hero.astro`)**:
    - 하단 2단 컬럼 간격: `gap-x-16` → `gap-x-10` (축소)
    - 하단 블록 상단 여백: `pt-8` → `pt-6` (축소)
    - 상단 Overview 문단 하단 마진: `mb-12` → `mb-8` (축소)
* **스크린샷**:
  - 데스크톱 (1440px): [`artifacts/variant-c-combined_preview-1440.png`](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c-combined_preview-1440.png)
  - 모바일 (375px): [`artifacts/variant-c-combined_preview-375.png`](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c-combined_preview-375.png)

---

## 3. 정량적 사실 비교 분석 (Factual Distance to Reference)

미학적 주관을 배제하고, 원본 `swissfolio-reference`의 실측 수치와의 절대적 거리(근접성) 관점에서 분석한 결과는 다음과 같습니다:

1. **섹션 여백 축 (Vertical Spacing Distance)**:
   - **가장 근접**: `variant-a-subtle` 및 `variant-c-combined`
     - 데스크톱 섹션 패딩이 124px로, 레퍼런스의 실측치(`128px`)와의 차이가 **4px(3.1%)**에 불과함.
   - **가장 멂**: `variant-b-scale`
     - 데스크톱 섹션 패딩이 96px로, 레퍼런스 실측치(`128px`)와 **32px(25%)**의 격차를 유지함.

2. **타이포그래피 스케일 축 (Typographic Scale Distance)**:
   - **가장 근접**: `variant-b-scale` 및 `variant-c-combined`
     - 헤드라인 크기가 84px(데스크톱)로 확대되어 레퍼런스 `displayHero` 실측치(`128px`)와의 격차를 기존 64px 격차에서 **44px 격차**로 크게 좁힘.
     - 행간(0.96)과 자간(-0.04em) 역시 레퍼런스의 타이트한 수치에 더 근접함.
   - **가장 멂**: `variant-a-subtle`
     - 헤드라인 크기가 64px에 머물러 있어 레퍼런스 실측치와의 격차가 **64px(50%)**로 가장 큼.

3. **종합 다차원 거리 (Multidimensional Distance)**:
   - **레퍼런스 실측치에 종합적으로 가장 근접한 변량**: **`variant-c-combined`**
     - 여백(Spacing)과 타이포 스케일(Scale)의 두 축 모두에서 레퍼런스 측정값에 가장 가깝게 전진함.
   - **특정 단일 축만 전진한 변량**:
     - `variant-a-subtle`: 여백 축만 레퍼런스에 근접, 스케일 축은 원거리 유지.
     - `variant-b-scale`: 스케일 축만 레퍼런스에 근접, 여백 축은 원거리 유지.
