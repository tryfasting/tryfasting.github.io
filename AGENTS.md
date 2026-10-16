# Agent instructions

이 레포는 포트폴리오(회사별 페이지)와 개발 블로그(`/blog/`)를 한 Astro 빌드로 배포한다.

## 공통 규칙

- 한국어로 응답한다. 응답 직전에 Asia/Seoul 현재 시각을 확인하고 첫 줄을 **`[YYYY-MM-DD HH:mm:ss KST]`** 형식으로 적는다.
- 완료 보고에는 변경 파일·핵심 변경, 실행한 검증과 결과, 남은 제한을 적는다.
- 사진 원본·비공개 자료·대화 기록·비밀값은 커밋하지 않는다. `git add .` 대신 변경 파일을 명시한다.
- 삭제·대규모 변경·DB 마이그레이션·전역 설치·작업공간 밖 수정은 사용자 승인을 받는다.
- 코드 변경은 `dev`에서 작업하며, 사용자의 배포 요청이 있을 때 `main`에 반영한다. 예외: 블로그 글(`posts/` 안의 변경만)은 `main`에 바로 push한다.
- 검증: `npm run build`, `npx astro check`. 포트폴리오 화면에 영향이 있으면 미리보기 서버를 띄우고 `node scripts/check-final.cjs`도 실행한다.
- Python은 PEP 8·타입 힌트를 따르고, 사용할 수 있으면 `uv run`으로 실행한다. Python 테스트는 pytest를 우선한다.

## 작업별 문서

| 작업 | 먼저 읽을 문서 |
|---|---|
| 포트폴리오(회사별 페이지, `/`, `/general/`) | [기업별 페이지 원칙](policy/company-pages.md), [운영 안내](planning/FINAL_HANDOFF.md) |
| 블로그(글, `/blog/`, `src/blog/`, RSS·sitemap) | [블로그 운영 규칙](policy/blog.md) |

## 포트폴리오 규칙

- **회사별로 색상·디자인·테마와 상단 기업 표기만 바꾼다. 본문·프로젝트·경력·학습 내용과 순서는 모든 회사 페이지에서 공통으로 유지한다.** 회사 맞춤 요청을 원고 수정 허가로 해석하지 않는다.
- 공통 콘텐츠는 `src/data/portfolio.ts`, 테마는 `src/data/themes.ts`, 최종 페이지 스타일은 `src/styles/site.css`에서 관리한다.
- 기존 수정과 새 회사 페이지 작업은 별도로 검증하고 별도 커밋으로 구분한다.
- 회사 slug로 `blog`, `rss.xml` 등 블로그 경로와 겹치는 이름을 쓰지 않는다.
