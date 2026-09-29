import type { PortfolioTheme } from './themes';

export const person = {
  name: '유선종',
  role: 'Junior AI / LLM Engineer',
  email: '2015111004@yonsei.ac.kr',
  github: 'https://github.com/tryfasting',
  education: '연세대학교 중어중문학과 · 2024 졸업',
};

export interface Project {
  id: string;
  year: string;
  name: string;
  subtitle: string;
  role: string;
  summary: string;
  contribution: string[];
  outcome: string;
  limitation: string;
  stack: string[];
  metric: { value: string; label: string };
  award: string;
  repository?: string;
  steps: string[];
}

export const projects: Record<string, Project> = {
  smartrouter: {
    id: 'smartrouter', year: '2025', name: 'SmartRouter',
    subtitle: '문장 난이도에 따른 LLM 라우팅',
    role: '팀장 · 난이도 라벨 설계, 임계값·라우팅 설계, 교정 생성과 Judge 평가',
    summary: '모든 문장을 같은 경량 모델에 보내던 한국어 문장 교정 서비스에서 출발했습니다. 교정 강도·문서 분야와 문장을 함께 입력해 난이도를 분류하고, 결과에 따라 경량·고성능 모델로 요청을 나누는 파이프라인을 만들었습니다.',
    contribution: [
      '정답이 없는 서비스 로그에서 원문·교정문 유사도를 역산하고, Gemini 채점으로 난이도 라벨을 설계했습니다.',
      '팀원과 함께 klue/roberta-base 이진 분류기를 학습하고, 정밀도·재현율을 비교해 기본 라우팅 임계값을 0.25로 정했습니다.',
      '경량 모델 단독·상위 모델 단독·라우터 경유 세 시나리오의 교정 결과를 LLM Judge로 비교했습니다.',
    ],
    outcome: '분류 모델 F1 0.788(임계값 0.25)을 확인했고, 이어드림스쿨 스타트업 연계 프로젝트 장려상(3등)을 수상했습니다.',
    limitation: '이후 AI 도구의 보조를 받아 재검증한 결과, 분류기 결정의 99.65%가 교정 강도 규칙과 같았습니다. 라벨이 강도 태그에서 만들어져 생긴 지름길 학습이었고, 모델 선택과 평가에 같은 test 분할을 쓴 한계도 함께 기록했습니다. 공개 저장소는 AI 보조로 재구성한 평가 감사본입니다.',
    stack: ['Python', 'PyTorch', 'Transformers', 'Pandas', 'Gemini API'],
    metric: { value: '0.788', label: '분류 모델 F1' },
    award: '이어드림스쿨 · 장려상(3등)',
    repository: 'https://github.com/tryfasting/yds-dmdp-smart-router',
    steps: ['강도·분야 + 문장', 'RoBERTa 난이도 분류', '경량 / 고성능 모델 선택'],
  },
  defect: {
    id: 'defect', year: '2024', name: 'Defect Detection',
    subtitle: '열화상 기반 주택 하자 탐지',
    role: '팀원 · 열화상 센서 통신 제어와 실시간 데이터 수집',
    summary: '눈으로 확인하기 어려운 주택 누수와 하자를 탐지하는 팀 프로젝트입니다. 열화상 카메라를 연결하고 직접 데이터를 수집해 모델 실험에 필요한 입력을 마련했습니다.',
    contribution: [
      'Lepton 3.5 데이터시트와 오픈소스 코드를 확인하며 Raspberry Pi의 SPI 통신 기반 수집 모듈을 구현했습니다.',
      '팀원들과 누수 모사 환경을 구성하고 열화상 이미지 수집·증강에 참여했습니다.',
      '조장이 결정한 대안 병행 전략에서 Raspberry Pi 검증을 맡아, 통신 병목 상황에서도 수집 경로를 확보했습니다.',
    ],
    outcome: '열화상 데이터 수집 시스템을 완성하고, 포스코 AI·Big Data 아카데미 최종 프로젝트 우수상을 수상했습니다.',
    limitation: '담당 범위는 센서 통신과 데이터 수집입니다. 팀 전체의 모델링 성과와 개인 기여를 구분합니다.',
    stack: ['Python', 'Raspberry Pi', 'SPI', 'Lepton 3.5', 'OpenCV'],
    metric: { value: 'SPI', label: '센서 → 데이터 수집' },
    award: '포스코 AI·Big Data 아카데미 · 우수상',
    steps: ['누수 모사 환경', '열화상 센서 · SPI 수집', '이미지 데이터 구성'],
  },
};

export interface Study {
  id: string;
  period: string;
  name: string;
  subtitle: string;
  summary: string;
  built: string[];
  verified: string;
  limitation: string;
  stack: string[];
  repository?: string;
}

// Keep wording within each project's EVIDENCE.md and apply/docs/FACTS.md "Practice" section.
export const studies: Record<string, Study> = {
  'korean-char-lm': {
    id: 'korean-char-lm', period: '2026.09', name: 'korean-char-lm',
    subtitle: '글자 단위 소형 언어모델 구현',
    summary: 'Transformer가 다음 글자를 예측하는 과정을 코드로 이해하려고, PyTorch 표준 모듈로 한국어 글자 단위 Causal LM을 조립해 학습·저장·생성까지 한 파일에서 이어 봤습니다.',
    built: [
      '한국어 글자 사전과 encode/decode, 무작위 시퀀스 배치를 만들었습니다.',
      'nn.MultiheadAttention과 causal mask로 Transformer 블록 1개짜리 모델을 조립하고, AdamW로 10,000스텝 학습했습니다.',
      '가중치·글자 사전·문맥 길이를 체크포인트에 함께 저장하고, 다시 불러와 Temperature 0.2와 1.0의 생성 결과를 비교했습니다.',
    ],
    verified: '첫 학습 Loss가 이론치 ln(어휘 크기) 근처인지 대조해 초기화와 손실 계산을 점검했습니다.',
    limitation: '소형 문학 텍스트로 학습한 실습 모델입니다. 별도 평가 분할이 없어 train loss를 품질 지표로 쓰지 않습니다. 단계 가이드와 피드백은 AI 보조를 받았고, 코드는 직접 작성했습니다.',
    stack: ['Python', 'PyTorch'],
  },
  'screen-tracker': {
    id: 'screen-tracker', period: '2026.08', name: 'screen-tracker',
    subtitle: 'Windows 활성 창 사용 기록 CLI',
    summary: '어떤 프로그램에 시간을 쓰는지 기록하고 분류하는 CLI를 Python 표준 라이브러리만으로 만들었습니다. OS API 호출, 로그 설계, 설정 기반 분류, 리포트 출력을 한 도구 안에서 다뤘습니다.',
    built: [
      'ctypes로 Win32 API를 호출해 활성 창과 프로세스 정보를 주기적으로 폴링하고 CSV로 기록했습니다.',
      'TOML 규칙으로 프로그램을 카테고리에 분류하고, 일간·주간 리포트와 기간 비교를 출력했습니다.',
      'argparse 옵션과 subprocess로 트래커를 백그라운드에서 시작·종료할 수 있게 했습니다.',
    ],
    verified: '단계별 완료 기준 5개 항목을 피드백으로 점검받았고, 폴링 완성본의 CLI 실행을 확인했습니다.',
    limitation: '폴링 대신 이벤트 훅으로 바꾸는 작업은 모듈 분리 중 순환 import 문제로 보류했습니다. 자동 테스트는 없습니다.',
    stack: ['Python', 'ctypes', 'tomllib', 'csv', 'subprocess'],
  },
};

export interface Campaign {
  slug: string;
  theme: PortfolioTheme;
  label: string;
  description: string;
  introduction: string;
  focusTitle: string;
  focus: string;
  projectIds: string[];
  projectContext: Record<string, string>;
  studyIds: string[];
}

export const campaigns: Record<string, Campaign> = {
  hanwha: {
    slug: 'hanwha', theme: 'hanwha', label: 'HANWHA FINANCE · AI / DATA',
    description: '유선종의 AI·LLM 포트폴리오. 모델 평가, LLM 라우팅, 데이터 품질 개선 경험을 소개합니다.',
    introduction: '언어모델을 평가하고 개선해,\n사람의 읽기와 쓰기를 돕고 싶습니다.',
    focusTitle: '금융 AI에서 이어가고 싶은 일',
    focus: '문장 교정 모델의 품질·비용 균형을 고민한 경험을 바탕으로, 금융 문서와 고객 안내에 맞는 평가 기준을 배우고 싶습니다. 작은 과제부터 개선 전후를 비교하며 신뢰할 수 있는 AI를 만드는 데 기여하겠습니다.',
    projectIds: ['smartrouter', 'defect'],
    projectContext: {
      smartrouter: '모델 비교·검증과 평가 기준을 다뤄본 경험을 금융 AI의 품질 개선으로 이어가고 싶습니다.',
      defect: '모델에 앞서 안정적인 입력 데이터가 필요하다는 점을 현장에서 배웠습니다.',
    },
    studyIds: ['korean-char-lm', 'screen-tracker'],
  },
  general: {
    slug: 'general', theme: 'cobalt', label: 'AI / LLM ENGINEERING',
    description: '유선종의 개발 포트폴리오. Python, 언어모델 학습·평가, 센서 데이터 수집 프로젝트.',
    introduction: '데이터에서 모델까지,\n직접 만들고 확인하며 배웁니다.',
    focusTitle: '지금 집중하는 방향',
    focus: 'Python으로 도구를 만들고, PyTorch로 모델의 동작을 이해하는 연습을 병행합니다. 언어모델을 학습·평가·개선해 텍스트를 다루는 일의 번거로움을 줄이는 엔지니어로 성장하고 싶습니다.',
    projectIds: ['smartrouter', 'defect'],
    projectContext: {
      smartrouter: '데이터 구성부터 분류 모델 학습·평가, 그리고 좋은 지표를 다시 의심하는 재검증까지 경험했습니다.',
      defect: '하드웨어 통신의 병목을 해결하고 모델 실험에 필요한 데이터를 직접 확보했습니다.',
    },
    studyIds: ['korean-char-lm', 'screen-tracker'],
  },
};

export const experience = [
  { period: '2025.02 — 2025.12', title: '이어드림스쿨 5기', category: 'AI 기술인력 양성 · DS 트랙', detail: '데이터 분석·머신러닝·딥러닝을 학습하고, 스타트업 연계 SmartRouter 프로젝트를 수행했습니다.', result: '스타트업 연계 프로젝트 장려상(3등)' },
  { period: '2024.04 — 2024.07', title: '포스코 AI·Big Data 아카데미 26기', category: 'AI · Big Data 교육', detail: 'Python, 데이터 분석, 컴퓨터 비전과 AIoT를 학습하고 주택 하자 탐지 프로젝트에 참여했습니다.', result: '최종 프로젝트 우수상' },
  { period: 'INTERNSHIP', title: '코드비전', category: '데이터 라벨링 · 품질 기준 개선', detail: '컴퓨터 비전 데이터의 모호한 객체 경계 기준을 발견했습니다. 산업 표준 자료를 조사해 가이드라인 개선안을 문서화하고 작업 일관성을 높였습니다.', result: '' },
];

export const skills = [
  { title: '모델 학습 · 평가', items: 'PyTorch / Transformers / scikit-learn', detail: '이진 분류기 학습, 정밀도·재현율과 임계값 분석, 소형 Causal LM 직접 조립' },
  { title: '데이터 · 구현', items: 'Python / Pandas / 표준 라이브러리', detail: '서비스 로그 분석과 라벨 전처리, ctypes·tomllib·argparse 기반 CLI 도구' },
  { title: '현장 데이터 수집', items: 'Raspberry Pi / SPI / OpenCV', detail: '열화상 센서 통신, 이미지 수집과 데이터 구성' },
];
