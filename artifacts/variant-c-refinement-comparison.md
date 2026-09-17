# Variant C 심화 정제 3개 변량(c1, c2, c3) 배치 비교 보고서

[`prompt/v1.5_variant-c-refinement-prompt-en.md`](file:///c:/Workspace/01-active/porfolio-page-agent/prompt/v1.5_variant-c-refinement-prompt-en.md) 지시에 따라, 최적 방향성으로 확정된 `variant-c-combined`에서 발견된 3가지 잔여 문제점을 각각 독립적으로 해결한 **3개의 심화 정제 브랜치(`variant-c1-photo-fix`, `variant-c2-accent-fix`, `variant-c3-projects-rhythm`)**를 단일 패스로 생성하고 실측 검증 및 스크린샷 캡처를 완료했습니다.

> [!NOTE]
> 본 보고서에서는 특정 변량을 "우승작"으로 임의 확정하거나 `main`/`variant-c-combined`로 머지하지 않으며, 세 가지 개선안을 나란히 일괄 검토하실 수 있도록 사실과 변경 내역을 객관적으로 제시합니다.

---

## 1. 정제 대상 3대 잔여 이슈 (Diagnosed Issues)

1. **이슈 1 (사진 vs h1 시각적 무게 경합)**:
   - 프로필 사진(80px)이 `h1`(84px)과 대등한 크기로 옆에 위치하여, `h1`이 확대되었음에도 단독 지배력을 온전히 드러내지 못함. (레퍼런스는 헤드라인 옆에 경합하는 요소가 전혀 없음)
2. **이슈 2 (오렌지 포인트 컬러의 미약한 임팩트)**:
   - 오렌지 액센트가 3px 반투명(0.55) 선에 불과하여 장식적이고 눈에 잘 띄지 않음. 3% 면적 제한을 지키면서도 보다 당당하고 의도적인 존재감이 필요함.
3. **이슈 3 (Main Projects 카드 그리드의 단조로운 리듬감)**:
   - 히어로 영역의 스케일과 여백이 시원하게 개선된 반면, 하단 2x2 프로젝트 카드는 v1.1 시절의 균일한 박스 형태를 그대로 유지하여 스크롤 시 리듬감이 단조로움.

---

## 2. 3개 정제 변량 종합 비교표

| 변량 브랜치 | Git Tag / Commit | 집중 해결 이슈 | 핵심 변경 내용 (Touched Classes & Values) | 스크린샷 링크 |
|---|---|---|---|---|
| **`variant-c1-photo-fix`** | `exp-variant-c1-photo-fix`<br>(`e5251ab`) | **이슈 1**<br>(사진 vs h1 경합) | • 사진 크기를 `w-11 h-11` (44px)로 축소<br>• 사진을 상단 `PORTFOLIO / AI & LLM` 라벨 줄로 이동<br>• `h1`을 단독 독립 행으로 분리하여 압도적 지배력 확보<br>*(액센트/프로젝트 그리드는 variant-c 유지)* | • [히어로 크롭](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c1-photo-fix_hero-1440.png)<br>• [데스크톱 전체](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c1-photo-fix_preview-1440.png)<br>• [모바일 전체](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c1-photo-fix_preview-375.png) |
| **`variant-c2-accent-fix`** | `exp-variant-c2-accent-fix`<br>(`982a1ed`) | **이슈 2**<br>(오렌지 액센트 임팩트) | • 마커 바 불투명도 100% (1.0), 높이 4px로 강화<br>• 프로필 사진 하단에 3px 오렌지 포인트 보더 추가 (`border-b-[3px] border-b-[var(--color-accent)]`)<br>• 인덱스 번호 마침표에 `.edition-mark` 오렌지 도트 적용 (`01<span class="edition-mark">.</span>`)<br>*(사진 크기/프로젝트 그리드는 variant-c 유지)* | • [히어로 크롭](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c2-accent-fix_hero-1440.png)<br>• [데스크톱 전체](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c2-accent-fix_preview-1440.png)<br>• [모바일 전체](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c2-accent-fix_preview-375.png) |
| **`variant-c3-projects-rhythm`** | `exp-variant-c3-projects-rhythm`<br>(`79e61ee`) | **이슈 3**<br>(프로젝트 카드 리듬감) | • 카드 그리드 행간격을 `gap-y-14 md:gap-y-20` (80px)으로 대폭 확장<br>• 각 카드 상단에 세련된 헤어라인 구분선 (`border-t pt-6`) 추가<br>• 짝수 카드(2, 4번)에 `md:mt-6` 비대칭 오프셋을 부여하여 4박스 단조로움 해소<br>• 마커 바 너비를 48px / 24px로 변주 부여<br>*(사진 크기/액센트 규칙은 variant-c 유지)* | • [히어로 크롭](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c3-projects-rhythm_hero-1440.png)<br>• [데스크톱 전체](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c3-projects-rhythm_preview-1440.png)<br>• [모바일 전체](file:///c:/Workspace/01-active/porfolio-page-agent/artifacts/variant-c3-projects-rhythm_preview-375.png) |

---

## 3. 세부 코드 변경 사항 및 시각적 효과 분석

### 1) Branch: `variant-c1-photo-fix`
* **변경 파일**: [`src/components/Hero.astro`](file:///c:/Workspace/01-active/porfolio-page-agent/src/components/Hero.astro), [`policy/design-tokens.md`](file:///c:/Workspace/01-active/porfolio-page-agent/policy/design-tokens.md)
* **코드 수정 상세**:
  ```astro
  <!-- 상단 프로필 배지 & 메타 라벨: h1과 시각적 무게 경합 제거 (variant-c1) -->
  <div class="flex items-center gap-3.5 mb-4">
    <img
      src="/profile.jpg"
      alt="[이름] 프로필 사진"
      class="w-11 h-11 object-cover rounded-sm border border-[var(--color-border)] shadow-xs shrink-0"
    />
    <p class="section-label">PORTFOLIO <span class="edition-mark">/</span> AI &amp; LLM</p>
  </div>

  <!-- 헤드라인 영역: h1이 단독 행을 독점하여 압도적 지배력 확보 -->
  <div class="mb-2">
    <h1 id="profile-title">[이름]</h1>
    <p class="text-base md:text-lg font-medium tracking-tight text-ink-soft mt-1.5">
      AI / LLM Engineer
    </p>
  </div>
  ```
* **시각적 효과**:
  - 사진이 44px의 단정한 '작성자 배지' 역할을 수행하며 라벨과 정렬됨.
  - `[이름]`(84px) 좌우에 어떤 방해 요소도 없이 전체 가로폭을 독점하여, 원본 Swissfolio의 wordmark처럼 압도적인 스케일 지배력을 즉각 발휘함.

---

### 2) Branch: `variant-c2-accent-fix`
* **변경 파일**: [`src/styles/global.css`](file:///c:/Workspace/01-active/porfolio-page-agent/src/styles/global.css), [`src/components/Hero.astro`](file:///c:/Workspace/01-active/porfolio-page-agent/src/components/Hero.astro), [`src/components/Experience.astro`](file:///c:/Workspace/01-active/porfolio-page-agent/src/components/Experience.astro), [`src/components/ProjectsSection.astro`](file:///c:/Workspace/01-active/porfolio-page-agent/src/components/ProjectsSection.astro), [`policy/design-tokens.md`](file:///c:/Workspace/01-active/porfolio-page-agent/policy/design-tokens.md)
* **코드 수정 상세**:
  ```css
  /* global.css: 100% 불투명도 및 4px 두께로 마커 존재감 확립 */
  .accent-bar-sm { height: 4px; opacity: 1; border-radius: 1px; }
  main > section.section-rule::before { width: 56px; height: 4px; background-color: var(--color-accent); }
  ```
  ```astro
  <!-- Hero.astro: 사진 하단 3px 한화 오렌지 보더 -->
  <img src="/profile.jpg" class="... border-b-[3px] border-b-[var(--color-accent)] ..." />
  
  <!-- Experience & Projects: 인덱스 마침표 오렌지 도트 분리 -->
  <span class="index-number">{p.index.replace('.', '')}<span class="edition-mark">.</span></span>
  ```
* **시각적 효과**:
  - 오렌지 포인트가 흐릿한 장식선에서 **선명하고 당당한 브랜드 시그니처**로 도약.
  - 사진 하단 보더와 인덱스 도트(`01.`)가 시선의 흐름을 유도하여, 면적 3% 미만의 제한을 철저히 준수하면서도 한눈에 경쾌하고 프로페셔널한 인상을 형성함.

---

### 3) Branch: `variant-c3-projects-rhythm`
* **변경 파일**: [`src/components/ProjectsSection.astro`](file:///c:/Workspace/01-active/porfolio-page-agent/src/components/ProjectsSection.astro), [`policy/design-tokens.md`](file:///c:/Workspace/01-active/porfolio-page-agent/policy/design-tokens.md)
* **코드 수정 상세**:
  ```astro
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 md:gap-y-20">
    {
      projects.map((p, idx) => (
        <article class={`pt-6 border-t border-[var(--color-border)] stack ${idx % 2 === 1 ? 'md:mt-6' : ''}`}>
          <div class="flex items-baseline justify-between gap-4">
            <span class="index-number">{p.index}</span>
            <span class="period-label">{p.tag}</span>
          </div>
          {idx % 2 === 0 ? (
            <div class="accent-bar accent-bar-sm max-w-[48px]" aria-hidden="true"></div>
          ) : (
            <div class="accent-bar accent-bar-sm max-w-[24px]" aria-hidden="true"></div>
          )}
          <div>
            <h3 class="text-2xl font-bold tracking-tight text-[var(--color-ink)]">{p.title}</h3>
          </div>
          <p class="measure text-[var(--color-ink-soft)]">{p.description}</p>
        </article>
      ))
    }
  </div>
  ```
* **시각적 효과**:
  - 카드 상단의 얇은 헤어라인 구분선(`border-t`)과 80px(`md:gap-y-20`)에 달하는 넉넉한 수직 간격이 카드의 독립성과 건축적 안정감을 부여함.
  - 짝수 열에 살짝 들어간 수직 오프셋(`md:mt-6`)과 마커 너비 변주가 바둑판식 단조로움을 완벽하게 깨뜨려, 스크롤을 내릴 때 잡지(Editorial)를 읽는 듯한 역동적인 리듬감을 제공함.

---

## 4. 로컬 실시간 브랜치 전환 검토 가이드

현재 작업 트리는 `main` 브랜치에 위치해 있습니다. 각 개선안을 로컬 개발 서버(`http://127.0.0.1:4321`)에서 브라우저로 직접 전환하며 체험해 보시려면 아래 명령어를 사용하실 수 있습니다:

```bash
# 1) 사진 크기/배치 조정 브랜치 검토
git checkout variant-c1-photo-fix

# 2) 오렌지 액센트 임팩트 강화 브랜치 검토
git checkout variant-c2-accent-fix

# 3) 프로젝트 카드 그리드 리듬감 개선 브랜치 검토
git checkout variant-c3-projects-rhythm

# 다시 메인으로 복귀
git checkout main
```
