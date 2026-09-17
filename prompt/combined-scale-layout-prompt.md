# 지시사항 (LLM 코딩 에이전트용) - 타이포그래피 스케일 + 레이아웃 밀도 + 액센트 바 통합 적용

techsonyx.xyz(Swissfolio 제작자 라이브 데모)를 참고 기준으로 삼아, 아래 세 가지 작업을 순서대로 모두 적용하라. 이전에 별도로 전달했던 scale-fix-prompt.md와 layout-density-prompt.md의 내용을 통합한 것이니, 이 문서 하나만 실행하면 된다.

## PART 1. 타이포그래피 스케일 대비 복원

지금 결과물은 헤드라인, 인덱스 번호, 본문 텍스트가 모두 비슷한 크기라 밋밋해 보인다. `src/styles/global.css`에서 다음을 수정하라.

1. `h1` 규칙을 다음으로 교체하라:
```
h1 {
  font-size: clamp(3rem, 9vw, 6.5rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.035em;
}
```

2. `.index-number` 규칙을 다음으로 교체하라 (기존보다 존재감을 회복하되 원본만큼 거대하게는 하지 않는다):
```
.index-number {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: clamp(1.75rem, 3.2vw, 2.75rem);
  color: var(--color-ink);
  opacity: 0.9;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}
```

3. 본문 텍스트(`p`, `.measure`가 적용된 요소)의 기본 폰트 크기를 `1rem`에서 `1.125rem`으로 올려라. `.period-label`, `.section-label`처럼 라벨류는 작게 유지한다.

4. `Hero.astro`의 소개 문단을 자동 줄바꿈에 맡기지 말고, 원본처럼 짧은 줄 단위로 명시적으로 끊어서(`<br />` 또는 별도 `<p>`) 리듬감을 만들어라.

## PART 2. 레이아웃 밀도 및 중앙 정렬 구조

1. `.portfolio-shell`(최상위 컨테이너)에 좌우 중앙 정렬을 적용하라:
```
.portfolio-shell {
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding: 64px 48px 0;
}
```
텍스트 자체는 좌측 정렬을 유지하되, 컨테이너가 뷰포트 안에서 좌우 대칭 여백을 갖게 하는 것이 목적이다.

2. `Hero.astro`에서 이름/타이틀과 소개 문단 사이에 얇은 메타데이터 줄을 추가하라: 상하 1px `var(--color-border)` 구분선 사이에 flex 컨테이너를 두고, 왼쪽에는 짧은 키워드 태그 나열(가운데 점으로 구분, 일부는 `font-weight: 600`으로 강조), 오른쪽에는 `Email`, `GitHub`, `LinkedIn` 링크를 배치한다. 폰트 크기는 `0.8rem`.

3. 경력 또는 소개 섹션 하단에 2단 컬럼(`grid-cols-1 md:grid-cols-2 gap-x-16`)을 추가하라: 왼쪽은 연락/지원 상태 안내 문장(밑줄 처리), 오른쪽은 개발 철학·협업 방식 소개 문단(밑줄 없음). 이 구조로 하단부 빈 공간을 줄인다.

4. (선택) 소개 문단 첫 줄에 `text-indent: 2em`을 적용해 문서형 들여쓰기를 재현할 수 있다. 어색하면 되돌려도 된다.

## PART 3. 액센트 바(accent bar) 요소 추가

원본 데모의 검은 색 placeholder 바를 그대로 쓰지 않고, 옅은 한화 오렌지 색면으로 재해석해 그래픽 리듬 요소로 사용한다.

1. `global.css`에 다음 유틸리티 클래스를 추가하라:
```
.accent-bar {
  width: 100%;
  border-radius: 2px;
  background-color: var(--color-accent);
}

.accent-bar-sm { height: 12px; opacity: 0.08; }
.accent-bar-md { height: 40px; opacity: 0.1; }
.accent-bar-lg { height: 96px; opacity: 0.12; }
```
높이 40px인 `.accent-bar-md`를 기본값으로 사용한다 (요청한 "중간 크기" 기준).

2. 이 바는 다음 두 위치 중 하나(또는 둘 다)에만 절제해서 사용하라. 화면 전체를 채우는 용도로 남발하지 마라.
   - 히어로 섹션의 메타데이터 줄 바로 아래, 소개 문단 시작 전에 `.accent-bar-md` 하나를 구분 요소로 배치.
   - 각 프로젝트 카드(`ProjectsSection.astro`)에서 인덱스 번호와 제목 사이, 또는 카드 배경 하단에 `.accent-bar-sm`을 아주 얇게 깔아 카드 영역을 은은하게 구획.
3. 바 위에 텍스트가 올라가는 경우, 텍스트 색상과의 대비가 WCAG 4.5:1 이상 유지되는지 확인하라. 오렌지의 불투명도가 낮으므로(8~12%) 배경이 거의 종이색에 가깝게 유지되어 텍스트 대비에는 문제가 없어야 한다.

## 검증

1. 데스크톱 뷰포트(1440px)에서 콘텐츠 블록의 좌우 여백이 대칭인지 확인하라.
2. 헤드라인과 본문/라벨 사이의 크기 대비가 뚜렷해졌는지 확인하라.
3. 액센트 바가 화면에서 튀지 않고 은은한 색면으로만 인지되는지, 오렌지가 과하게 쓰이지 않는지(전체 화면의 3% 원칙 유지) 확인하라.
4. `npm run build`가 에러 없이 성공하는지 확인하고, 위 3가지 결과와 스크린샷을 함께 보고하라.
