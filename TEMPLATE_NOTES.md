# 템플릿 출처와 수정 범위

- 원본: https://github.com/michael-andreuzza/swissfolio
- 제작자: Lexington Themes / Michael Andreuzza
- 원본 GPL-3.0 라이선스는 루트 LICENSE에 보존했습니다.
- 원본 Wrapper.astro를 사용하고 원본 스타일은 src/styles/global.css.bak에 보존했습니다.
- 제공한 page/agent_prompt.md에 따라 Astro + Tailwind v4의 필요한 구조만 구성했습니다. 원본의 이미지·애니메이션·추가 섹션은 가져오지 않았습니다.
- 제공 CSS 및 ProjectsSection을 src로 이동하고, 라이트 전용 스타일·반응형 줄바꿈·작은 강조 요소를 보완했습니다.
- 모든 본문은 디자인 확인용 플레이스홀더입니다. 연락처는 실제 주소가 없어 비활성 상태입니다.
- 색상 변경: src/styles/global.css의 @theme 변수. [한화 공식 CI](https://www.hanwhaglobal.co.kr/en/company/ci)의 Hanwha Orange 100% RGB 243/115/33을 HEX #F37321로 적용했습니다. 섹션 상단에 짧은 오렌지 강조선을 추가했습니다.
- 폰트: 원본 main 브랜치의 BaseHead.astro, BaseLayout.astro, global.css, Text.astro, astro.config.mjs, package.json을 확인했습니다. Fontshare/CDNFonts가 아닌 Google Fonts의 Geist와 Geist Mono를 사용하므로 같은 CDN link 방식으로 복원했습니다. 한글에만 로컬 Pretendard Variable이 적용됩니다.
- 이전 Inter/Pretendard는 실제 로드되고 있었으며, 시스템 폰트 fallback 문제가 아니라 원본과 다른 폰트를 선택한 문제였습니다.
- 제목은 원본의 bold(700)를 적용하고 크기는 기존 제한을 유지합니다. 현재 원본에는 소개 이탤릭이 없지만 사용자 프롬프트에 따라 태그라인·소개 첫 문장에 추가했습니다. 영문은 실제 Geist Italic, 한글은 Pretendard의 브라우저 합성 기울임입니다.
- Google Fonts는 인터넷 연결이 필요합니다. 브라우저 CDP로 실제 렌더링 폰트와 폰트 요청 HTTP 200을 검증했습니다.
- 배포 설정, 실제 콘텐츠 선정 및 최종 순서는 이후 별도로 결정합니다.
