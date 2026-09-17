# 지시사항 (LLM 코딩 에이전트용) - 히어로 사진 배치, 이름 크기, 액센트 바 색상 조정

지금 결과물은 방향이 맞다. 아래 세 가지만 세부 조정하라.

## 1. 프로필 사진 추가

`Hero.astro`의 "PORTFOLIO / AI & LLM" 라벨과 "[이름]" 사이, 또는 라벨과 같은 줄에 작은 정사각형 프로필 사진을 배치하라. 기본안은 라벨 위쪽 좌측에 작게 두는 것이다:

```astro
<div class="flex items-start gap-4 mb-2">
  <img
    src="/profile.jpg"
    alt="[이름] 프로필 사진"
    class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-sm border border-[var(--color-border)]"
  />
  <div>
    <p class="section-label">PORTFOLIO / AI & LLM</p>
    <!-- 이 아래에 기존 h1(이름) 유지 -->
  </div>
</div>
```

사진은 정사각형으로 크롭하고, 크기를 `w-16 h-16`(64px, 데스크톱은 `md:w-20 md:h-20` 80px) 이내로 제한해서 이름 텍스트보다 시각적 무게가 앞서지 않도록 하라. 둥근 정도는 `rounded-sm`(거의 각짐) 또는 `rounded-full`(원형) 중 하나를 선택하되, 기본값은 `rounded-sm`으로 하라. 큰 원형 프로필 사진이나 배경을 채우는 히어로 이미지는 사용하지 마라.

(참고: 이름 오른쪽에 배치하고 싶다면 위 구조 대신 `h1`을 포함한 flex 컨테이너에 `justify-between`을 주고 사진을 오른쪽 끝에 `w-20 h-20`로 넣는 대안도 가능하나, 기본으로는 위 좌상단 배치를 적용하라.)

## 2. 이름(h1) 크기 축소

`global.css`의 `h1` 규칙을 다음으로 수정하라 (이전 단계에서 `clamp(3rem, 9vw, 6.5rem)`으로 키운 것이 과했다):

```css
h1 {
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.025em;
}
```

목표는 이름이 여전히 페이지에서 가장 큰 텍스트이되, 한 화면을 압도하지 않고 "점잖게" 보이는 크기다. 수정 후 이름 크기가 "PORTFOLIO / AI & LLM" 라벨이나 본문 대비 시각적 위계는 유지하면서도 과하게 크지 않은지 확인하라.

## 3. 액센트 바 색상 및 두께 조정

`global.css`의 액센트 바 관련 클래스를 다음으로 교체하라. 기존 문제는 두 가지다: (1) 불투명도가 너무 낮아 색이 흐릿하다, (2) `.accent-bar-md`(40px)를 구분선 용도로 쓰기엔 두께가 애매하게 크다.

```css
.accent-bar {
  width: 100%;
  border-radius: 1px;
  background-color: var(--color-accent);
}

.accent-bar-sm { height: 3px; opacity: 0.55; }
.accent-bar-md { height: 4px; opacity: 0.65; }
.accent-bar-lg { height: 6px; opacity: 0.75; }
```

용도별로 다음과 같이 적용 클래스를 바꿔라:

- 히어로 섹션 상단의 짧은 오렌지 표식(현재 좌상단의 작은 가로선): `.accent-bar-sm`, 너비를 `100%`가 아니라 `width: 48px` 정도로 제한 (전체 폭 바가 아니라 짧은 마커로 사용).
- 히어로의 메타데이터 줄(LLM Agent · RAG Architecture ...) 아래 있던 두꺼운 색면 블록: 이 블록은 완전히 제거하거나, 유지한다면 `.accent-bar-sm`(3px, 짧은 폭)으로 대폭 줄여라. 현재처럼 폭 전체에 40px 높이로 깔린 옅은 색 블록은 삭제 대상이다.
- 각 프로젝트 카드 및 경력 섹션 사이 구분선 위 강조 마커: `.accent-bar-sm`을 구분선 왼쪽 끝에 짧게(`width: 48px`) 배치.

즉 전체적으로 "넓고 흐린 색면"을 "짧고 선명한 색 바(마커)"로 바꾸는 것이 핵심이다. 색상 자체(`var(--color-accent)`, 한화 오렌지)는 유지하고 불투명도만 0.08~0.12에서 0.55~0.75 수준으로 올려 눈에 확실히 띄게 하되, 두께를 줄이고 폭을 짧게 제한해서 "구분 마커"로만 인식되게 하라.

## 검증

수정 후 다음을 확인하고 보고하라.
1. 프로필 사진이 이름보다 시각적으로 크거나 부담스럽지 않은지.
2. 이름 크기가 과하지 않으면서도 페이지에서 가장 눈에 띄는 텍스트로 유지되는지.
3. 액센트 바가 흐릿하게 뭉개지지 않고 짧고 또렷한 구분 마커로 보이는지, 전체 화면에서 오렌지가 과하게 넓은 면적을 차지하지 않는지.
