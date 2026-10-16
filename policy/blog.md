# 블로그 운영 규칙

개발하며 배운 내용을 기록·공개하는 블로그. 주소는 `https://tryfasting.github.io/blog/`, 글은 `/blog/<slug>/`.

발행 흐름: **마크다운 작성 → `main`에 `git push` → GitHub Actions 빌드 → 자동 배포**

## 구조

| 위치 | 용도 |
|---|---|
| `posts/` | 글 (Obsidian 볼트로 여는 폴더) |
| `posts/_templates/` | Obsidian 기본 Templates용 템플릿 (빌드 제외) |
| `posts/_drafts/` | 공개 전 초안 (Git 제외, 빌드 제외) |
| `src/content.config.ts` | 컬렉션 정의, frontmatter 스키마 |
| `src/blog/` | 블로그 전용 레이아웃·컴포넌트·CSS·helper |
| `src/pages/blog/` | 라우트: 목록, 글 상세, 태그 |
| `src/pages/rss.xml.ts` | RSS |

- 블로그와 포트폴리오는 디자인을 통일하지 않는다. 블로그는 별도 레이아웃·CSS를 쓰며 다크모드는 블로그에만 있다.
- 블로그 코드는 `src/blog/` 밖의 포트폴리오 파일을 import하지 않는다.

## 글 작성 규칙

- **표준 마크다운만** 쓴다. Obsidian `[[위키링크]]`, `![[임베드]]`는 쓰지 않는다.
- 이미지는 글과 같은 폴더의 `images/`에 두고 상대 경로로 참조한다: `![설명](./images/그림.png)`
- 파일명: `YYYY-MM-DD-영문-kebab-case.md` (소문자·숫자·하이픈만, 한글 파일명 금지). 날짜를 뺀 부분이 이 규칙에 맞지 않으면 빌드가 실패한다. `tags`는 예약어라 슬러그로 쓸 수 없다.
- frontmatter (빌드 시 검증, 필수 항목이 없거나 형식이 틀리면 빌드 실패)

  ```yaml
  ---
  title: 글 제목             # 필수
  date: 2026-10-16           # 필수
  description: 한두 문장 요약  # 필수 (목록·검색 미리보기·OG에 사용)
  tags: [astro, python]      # 선택, 기본값 []
  draft: false               # 선택, 기본값 false. true면 빌드에서 제외
  ---
  ```

- 공개 레포이므로 커밋된 `draft: true` 글은 사이트에는 안 보여도 GitHub 소스에서는 보인다. 공개 전 글은 `posts/_drafts/`에 둔다.

## 폴더와 URL

- 폴더 깊이는 최대 2단계로 정리한다: `posts/` 안에 주제 폴더 1단계, 그 안에 `images/`까지.
  - 허용: `posts/2026-10-16-first-post.md`, `posts/python/2026-10-20-uv-basics.md`, `posts/python/images/그림.png`
  - 쓰지 않음: `posts/python/basics/2026-10-20-uv-basics.md`
  - 이 규칙은 운영 습관이며 빌드에서 강제하지 않는다.
- **URL은 폴더와 무관하다.** 슬러그 = 파일명에서 날짜 접두사(`YYYY-MM-DD-`)를 뺀 값. 예: `posts/python/2026-10-20-uv-basics.md` → `/blog/uv-basics/`
  - 글을 다른 주제 폴더로 옮겨도 URL은 바뀌지 않는다.
  - 한 번 공개된 슬러그(파일명)는 바꾸지 않는다.
- 폴더가 달라도 같은 슬러그가 둘 이상이면 **빌드가 실패**하고 겹친 파일 경로가 표시된다.
- 주제 폴더는 정리용일 뿐이다. 사이트 분류는 frontmatter `tags`로만 한다.

## 브랜치·배포

| 작업 종류 | 브랜치 |
|---|---|
| 블로그 글 추가·수정 (`posts/` 안의 변경만) | `main`에 바로 push |
| 블로그 코드(레이아웃, CSS, 설정) 변경 | `dev`에서 작업 → 사용자 요청 시 `main` 반영 |
| 포트폴리오 변경 | `dev`에서 작업 → 사용자 요청 시 `main` 반영 |

- 글은 `main`에만 쌓이고 코드는 `dev`에서 바뀐다. **`dev`를 `main`에 반영하기 전에 반드시 `main`을 `dev`로 먼저 merge**한다.
- 배포 워크플로의 사진 복원 단계(Secrets)는 블로그 배포에도 적용된다. Secrets가 없으면 블로그 배포도 실패한다.
- 글 하나의 빌드 오류는 포트폴리오 배포도 함께 막는다. 사이트는 마지막 성공 배포본을 계속 보여 주므로 내려가지는 않는다.

## 배포가 실패하면

1. GitHub Actions 로그에서 frontmatter 오류(필수 항목 누락, 날짜 형식)를 확인한다.
2. 슬러그 중복 오류인지 확인한다 (겹친 경로가 로그에 나온다).
3. 그다음 사진 복원 단계(Secrets) 오류인지 확인한다.

로컬에서 먼저 확인하려면 `npm run build`를 실행한다.

## 검색 노출

- 블로그 페이지는 색인을 허용한다.
- 회사별 포트폴리오 페이지는 `noindex`, `/general/`만 색인을 허용한다.
- sitemap에는 블로그 페이지와 `/general/`만 넣는다.
