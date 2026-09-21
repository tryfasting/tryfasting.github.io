# v1.6 디자인 실험 안내

출발점은 dev 6de72ad입니다. 기존 C 실험 브랜치를 통째로 병합하지 않고 현재 dev의 배포 설정과 정책을 유지한 채 세 시안을 추가했습니다.

## 결과 보기

`artifacts/v1.6/index.html`을 브라우저로 열면 저장된 화면을 나란히 비교할 수 있습니다. 소개/프로젝트 영역, 1440/768/375px 전체 화면 전환 및 기존 dev 비교를 지원합니다. 이미지 자체는 서버 없이 열립니다.

- D: `/experiments/d-editorial` — 문서형 정렬, 작은 번호, 라벨 전용 열
- E: `/experiments/e-ledger` — 번호·제목·설명으로 나눈 목록형
- F: `/experiments/f-grid` — 넓은 2단 그리드와 큰 제목의 대비

로컬 서버는 `127.0.0.1:4325`에서 제공합니다. 표준 Node 환경에서 `npm run dev -- --port 4325`로 재실행할 수 있습니다. 루트 `/`는 기존 디자인 기준 화면입니다. 실험 CSS는 별도 페이지에서만 불러오며, `getStaticPaths`의 DEV 조건으로 프로덕션에는 실험 HTML을 생성하지 않습니다.

## 파일 역할

- `src/layouts/Portfolio.astro`: 기존 페이지를 공통 레이아웃으로 분리, 동일 콘텐츠 공유
- `src/styles/experiments.css`: 모든 새 시안 값, data-variant로 범위 제한
- `policy/design-tokens.md`: 기존 기준과 실험 예외 값
- `scripts/capture-variants.js`: Playwright CLI `run-code --filename`용 캡처 함수
- `scripts/render-variants.cjs`: 현재 Codex Node 런타임의 Playwright를 이용한 재현용 대체 실행기
- `scripts/build-variant-gallery.mjs`: 오프라인 비교 갤러리 재생성

이번 환경에서는 Playwright CLI daemon이 사용자 캐시 접근 문제와 시작 지연으로 동작하지 않아, 기존 Playwright 런타임으로 캡처했습니다. 글로벌 설치나 레퍼런스 폴더 수정은 하지 않았습니다. 대체 실행기는 현재 Windows/Codex 환경에 맞춰져 있습니다.

표준 node가 PATH에 있으면 `node scripts/render-variants.cjs`, `node scripts/build-variant-gallery.mjs` 순서로 결과를 재생성합니다. 전자는 서버가 4325에서 실행 중이어야 합니다. `npm run build`는 기본 루트 페이지만 출력하는지 확인합니다.

실제 콘텐츠는 선정하지 않았습니다. 기존 샘플 문장은 사실 검증 또는 최종 승인된 원고로 간주하지 않습니다. 현재 사진·항목·연락처 상태를 그대로 공유하며, 캡처는 디자인 판단용입니다.
