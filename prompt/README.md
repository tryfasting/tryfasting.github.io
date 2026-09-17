# 프롬프트 및 버전 히스토리 인덱스 (Prompt & Version Archive)

이 디렉터리는 프로젝트의 버전별 지시사항(프롬프트)을 시간 순서대로 보관하며, 각 지시사항이 어떤 Git 버전(커밋/태그)과 디자인 정책으로 이어졌는지를 역추적할 수 있도록 아카이빙합니다.

## 버전별 프롬프트 매핑 테이블

| 순서 | 파일명 | 반영 버전 | Git Commit / Tag | 핵심 지시 및 작업 요약 | 상태 |
|:---:|---|:---:|:---:|---|:---:|
| 01 | [`v1.0_combined-scale-layout-prompt.md`](./v1.0_combined-scale-layout-prompt.md) | **v1.0** | `29bd282` (`tag: v1.0`) | Pretendard 단일 폰트 적용, 스위스 타이포그래피 스케일 대비 및 수직 리듬 밀도 기준선 수립 | 완료 |
| 02 | [`v1.1_detail-fix-prompt.md`](./v1.1_detail-fix-prompt.md) | **v1.1** | `e598185` (`tag: v1.1`) | 프로필 사진 추가(64~80px), `h1` 크기 조율(`clamp(2.25rem, 4.5vw, 3.25rem)`), 오렌지 액센트 바 정제(48px 마커화) | 완료 |
| 03 | [`v1.2_execute-with-policy.md`](./v1.2_execute-with-policy.md) | **v1.2** | `138cf21` (`tag: v1.2`) | `policy/design-tokens.md` 채택(SSOT), 원본 레퍼런스(`swissfolio-reference`) 클론, `h1` 스케일 대비 복원(`clamp(2.75rem, 5.5vw, 4rem)`) | 완료 |
| 04 | [`v1.3_specificity-fix-prompt-en.md`](./v1.3_specificity-fix-prompt-en.md) | **v1.3** | `ac8d958` (`tag: v1.3`) | CSS Specificity 전수 점검, `<p>` 태그 인라인 Tailwind 유틸리티 제거, 디자인 토큰 4번 규칙(특이도 충돌 방지) 추가 | 완료 |
| 05 | [`v1.4_multi-variant-exploration-prompt-en.md`](./v1.4_multi-variant-exploration-prompt-en.md) | **v1.4 (예정)** | *Pending* (Base: `v1.3`) | 원본 레퍼런스 실측치(`reference-diff.md`) 기반 3개 변량(Variant A, B, C) 병렬 브랜치 실험 탐색 지시서 | 대기 |

## 네이밍 및 아카이빙 규칙
1. **파일명 전단 접두어**: `v{major}.{minor}_` 형식으로 버전명을 파일명 맨 앞에 명시하여 파일 탐색기나 에디터 트리에서 시간 순서대로 정렬되도록 합니다.
2. **파일 헤더(전단) 메타데이터**: 모든 프롬프트 마크다운 파일 최상단에 매핑 버전, Git Commit / Tag, 핵심 지시 및 수행 내역을 블록 형태로 명시합니다.
