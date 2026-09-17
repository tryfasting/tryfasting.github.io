# 로컬 미리보기

- 현재 주소: http://127.0.0.1:4321
- 재실행: 프로젝트 루트에서 `powershell -ExecutionPolicy Bypass -File scripts/start-preview.ps1`
- 일반 Node/npm 환경: `npm install` → `npm run dev`
- 빌드: `npm run build` → `dist/`에 정적 사이트 출력
- 색상·폰트: `src/styles/global.css`의 `@theme`
- 샘플 섹션: `src/components/` / 조립: `src/pages/index.astro`
- [템플릿 출처와 수정 범위](../TEMPLATE_NOTES.md)

현재 환경은 기존 Codex Node 런타임과 프로젝트 내부 npm(`.tools/npm/package/bin/npm-cli.js`)을 사용합니다. 전역 설치는 하지 않았습니다. Astro 실행 시 `ASTRO_TELEMETRY_DISABLED=1`을 설정해 작업 폴더 밖의 설정 파일 생성을 방지합니다. 재실행 스크립트가 이를 설정합니다.

이름·경력·프로젝트는 플레이스홀더입니다. 연락처는 주소가 없어 비활성 상태입니다. 실제 콘텐츠·최종 배치·배포는 이후 진행합니다.

검증: 빌드 성공, 1440px 2단·375px 1단, 가로 넘침 없음, Geist/Geist Mono/Pretendard 실제 렌더링 및 폰트 요청 HTTP 200 확인, OS 다크 설정에서도 라이트 배경 유지, 런타임 오류 없음. 화면 캡처는 artifacts/에 보관합니다.
