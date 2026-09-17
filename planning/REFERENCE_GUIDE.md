# 관련 지식과 디자인 선택 참고

이 문서는 기술·호스팅 설명과 디자인 선택을 돕는 참고 자료입니다. 작업 순서와 완료 상태는 [실행 계획](WALKTHROUGH_PLAN.md)에서만 관리합니다.

## 기술과 호스팅

현재 선택은 **Swissfolio 기반 Astro + Tailwind CSS v4 정적 사이트**입니다. 라이트 모드만 제공하며, 아래 후보·초기 권장 구성은 선택 과정의 참고 기록입니다. 로컬 실행은 [미리보기 안내](LOCAL_PREVIEW.md)를 참고하세요.

- **현재 권장 구성:** 정적 HTML/CSS와 필요한 최소 JavaScript. 목표는 웹 개발 기술을 늘리는 것이 아니라, AI·LLM 지원용 포트폴리오를 적은 유지 비용으로 준비하는 것입니다.
- **백엔드:** 글·이미지·링크를 보여주는 현재 사이트에는 필요하지 않습니다. 향후 서버에서 모델 추론, 외부 LLM API 호출, DB 저장 등이 필요해지면 Python + FastAPI를 우선 검토합니다.
- **React:** 사용 가능하지만 필수는 아닙니다. 현재는 기존 정적 템플릿을 가져와 수정하는 쪽을 우선 검토합니다.
- **GitHub Pages:** HTML/CSS/JavaScript 파일을 제공하는 정적 호스팅입니다. GitHub Free에서는 공개 저장소로 사용할 수 있으며 FastAPI 서버를 실행하지는 않습니다.
- **주소와 비용:** 기본 github.io 주소를 사용하면 도메인 구매 없이 호스팅할 수 있습니다. 사용자 사이트는 계정당 하나, 프로젝트 사이트는 저장소당 하나입니다. 이용 범위와 사용량 제한이 있으며 모델 API 비용까지 무료로 제공하는 것은 아닙니다.
- **배포 방법:** 게시할 정적 파일을 저장소에 넣고 Pages 설정에서 브랜치와 폴더를 지정하면 GitHub가 게시합니다. 이후 해당 브랜치에 push하면 갱신됩니다. 이번 단계에서는 배포하지 않습니다.

공식 자료: [GitHub Pages 설명](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [브랜치 기반 게시 방법](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 선택 가능한 외부 템플릿

최신 선호: **아래로 읽기, 모던하지만 전통·보수적인 격식, 미니멀, 정돈된 인상**. 한화금융 지원용으로 사용할 첫 색상 방향은 어두운 배경에 오렌지·코발트를 절제해서 적용하는 것이다. 금융권 적합성 평가는 사용자의 희망 이미지에 대한 디자인 추천 의견이며 기업의 공식 채용 기준이 아니다.

비선호: 중앙의 과도하게 큰 제목, 큰 인물 사진, 웹 개발 기술을 과시하는 효과, 강한 애니메이션. 중앙 방식은 페이지 본문 영역의 중앙 배치로 해석하며, 제목과 긴 본문은 왼쪽 정렬을 우선 비교한다.

아래는 원본 디자인을 확인하는 후보다. 기존 Dimension·Ceevee·Kards·Workfolio는 이번 목록에서 제외한다. 실제 콘텐츠 선정과 배치는 여전히 미정이다.

| 후보 | 원본 디자인과 추천 이유 | 원하는 방향으로 바꿀 부분 | 공식 링크 |
|---|---|---|---|
| A. Risen / 3rd Wave Media | 다크 모드 이력서형. 구분선과 텍스트 중심으로 아래로 읽는 구성. 어두움·격식의 균형을 우선 비교할 후보 | 프로필 사진은 더 작게 하거나 생략. 색상 강조와 아이콘을 줄이고 오렌지·코발트를 제한적으로 적용 | [미리보기](https://themes.3rdwavemedia.com/demo/bs5/risen/) · [소개·다운로드](https://themes.3rdwavemedia.com/bootstrap-templates/resume/risen-free-bootstrap-5-dark-mode-resume-cv-template-for-developers/) |
| B. DevResume / 3rd Wave Media | 밝은 배경의 정돈된 문서형. 제목·본문의 위계가 분명해 보수적인 인상을 원하는 경우 적합 | 다크 버전은 별도 조정 필요. 사진은 생략 가능하고, 본문 밀도·글꼴·여백을 다듬어 답답함 완화 | [미리보기](https://themes.3rdwavemedia.com/demo/bs5/devresume/) · [소스·사용 조건](https://github.com/xriley/DevResume-Theme) |
| C. Minimal Portfolio / Web Portfolios | 작은 프로필 정보와 경력·프로젝트를 간결하게 나열하는 단순한 구성. 밝고 어두운 테마 지원 | 간단한 원본에 구분선·간격·제목 규칙을 정해 격식을 보완. 색상은 CSS 변수로 변경 | [미리보기](https://www.webportfolios.dev/templates/html/minimal-portfolio-template/demo/index.html) · [소개·다운로드](https://www.webportfolios.dev/portfolio-templates/html/minimal-portfolio-template) |
| D. Astro Nano | 작은 소개와 세로 목록 위주의 미니멀한 포트폴리오·블로그. 밝고 어두운 테마 지원 | 캐주얼한 문구·이모지·모션을 제외하고 글꼴·색상을 정리. 원본 사용 시 Astro 빌드가 추가됨 | [미리보기](https://astro-nano-demo.vercel.app/) · [소스·사용 조건](https://github.com/markhorn-dev/astro-nano) |

추천 판단: A는 다크·격식의 균형, B는 가장 문서다운 인상, C는 적은 구현 부담, D는 미니멀한 현대적 느낌을 비교하기 좋다. 실제 한글과 회사별 포인트 색을 적용한 시안으로 사용자가 최종 판단한다.

## 색상과 구현 부담

- 현재 색상 방향은 검정에 가까운 차콜/짙은 남색을 바탕으로 하고 오렌지는 얇은 구분선·링크·작은 표식에 사용한다. 코발트는 보조 강조로 제한하는 안을 제안한다. 큰 오렌지 배경이나 강한 그라데이션은 기본안에 넣지 않는다.
- 한화 오렌지 참고값은 공식 계열 CI의 RGB 243/115/33, HEX `#F37321`이다. 특정 금융 계열사의 별도 디지털 브랜드 규정까지 확인한 값은 아니다. [공식 CI](https://www.hanwhaglobal.co.kr/ko/company/ci)
- 기업별 변경을 위해 배경·본문·주 강조·보조 강조·테두리를 공통 CSS 변수로 정리한다. 변경 후 대비와 읽기 편함을 확인한다.
- C는 제공 페이지에서 `--bg-color`, `--text-color`, `--accent-color` 등 테마별 변수를 안내한다. A·B는 CSS/SCSS를 한 번 정리해 공통 색상 설정으로 연결하는 작업이 필요할 수 있다.
- A·B·C는 정적 HTML/CSS 기반으로 접근할 수 있다. D는 Astro·Tailwind 기반이므로 원본을 채택하면 Node 빌드와 정적 결과물 배포 설정이 필요하다. 서버 백엔드는 필요 없지만, 기존 '빌드 없는 HTML/CSS'보다 도구 관리가 추가된다. D는 우선 디자인 비교 후보이며 기술 스택을 변경한 것은 아니다.
- 특정 템플릿의 디자인만 참고해 별도로 단순화할 때에도, 실제 제작 전에 간단한 시안을 제시해 확인받는다. 원본 코드·자산을 이용한다면 해당 사용 조건을 유지한다.

## 무료 사용과 확인 범위

- A·B: 제공자는 푸터 출처 링크 유지 조건의 무료 사용을 안내한다. 템플릿 자체의 재판매·별도 재배포 제한도 있으므로 원본을 배포 패키지처럼 재공유하지 않는다. 세부 조건은 각 공식 링크 참고.
- C: 제공 페이지에 MIT로 표기되어 있다. 채택 시 내려받는 배포본의 LICENSE와 개별 자산도 확인한다.
- D: 공식 GitHub 저장소에서 MIT와 정적 빌드 방식을 확인했다.
- 공식 소개·데모 페이지의 응답과 설명을 확인했다. 브라우저 렌더링·모바일 동작·색상 변경 전체를 테스트한 것은 아니다.
- 로컬 템플릿 다운로드·설치·맞춤 시안 구현·배포는 아직 하지 않았다.
