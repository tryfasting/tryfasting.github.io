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
  nextStep: string;
}

export const projects: Record<string, Project> = {
  smartrouter: {
    id: 'smartrouter', year: '2025', name: 'SmartRouter',
    subtitle: '사용자 의도와 문장을 함께 보는 LLM 라우팅',
    role: '팀장 · 학습 데이터 구축(메타데이터 역공학·난이도 라벨), 임계값·라우팅 설계, 교정 생성과 Judge 평가',
    summary: '사용자가 고른 교정 강도·문서 분야와 상관없이 대부분의 요청이 경량 모델로 가던 한국어 문장 교정 서비스에서 출발했습니다. 강도·분야 태그와 문장을 함께 입력해 난이도를 판단하고, 결과에 따라 경량·고성능 모델로 요청을 나누는 라우팅 모델을 만들었습니다.',
    contribution: [
      '서비스 로그가 약 1,000건뿐이라, 스타트업의 교정 문장 쌍 6,648건에 원문·교정문 유사도로 강도 태그를 역산해 붙이고 Gemini 채점으로 난이도 라벨을 만들었습니다.',
      '팀원과 함께 klue/roberta-base 기반 라우팅 모델을 학습하고, 정밀도·재현율을 비교해 기본 라우팅 임계값을 0.25로 정했습니다.',
      '경량 모델 단독·상위 모델 단독·라우팅 모델 경유 세 시나리오의 교정 결과를 LLM Judge로 비교했습니다.',
    ],
    outcome: '라우팅 모델 F1 0.788(임계값 0.25)을 확인했고, 이어드림스쿨 스타트업 연계 프로젝트 장려상(3등)을 수상했습니다.',
    limitation: '이후 학습 데이터를 다시 보니 강도별 난이도 분포가 크게 치우쳐 있었습니다(STRONG 약 72% Hard, WEAK 2%). AI 도구의 보조를 받아 재검증한 결과 모델 결정의 99.65%가 교정 강도 규칙과 같았습니다. 역산한 강도와 난이도 라벨이 같은 교정 결과에서 나와 생긴 태그 의존이었고, 모델 선택과 평가에 같은 test 분할을 쓴 한계도 함께 기록했습니다. 공개 저장소는 AI 보조로 재구성한 평가 감사본입니다.',
    stack: ['Python', 'PyTorch', 'Transformers', 'Pandas', 'Gemini API'],
    metric: { value: '0.788', label: '라우팅 모델 F1' },
    award: '이어드림스쿨 · 장려상(3등)',
    repository: 'https://github.com/tryfasting/yds-dmdp-smart-router',
    steps: ['강도·분야 + 문장', 'RoBERTa 난이도 분류', '경량 / 고성능 모델 선택'],
    nextStep: '데이터 구성부터 분류 모델 학습·평가, 그리고 좋은 지표를 다시 의심하는 재검증까지 경험했습니다.',
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
    nextStep: '하드웨어 통신의 병목을 해결하고 모델 실험에 필요한 데이터를 직접 확보했습니다.',
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

export interface Learning {
  id: string;
  kind: 'book' | 'course';
  title: string;
  author: string;
  progress: string;
  takeaways: string[];
  cover?: string;
  coverLines?: string[];
  repository: string;
}

export const learnings: Record<string, Learning> = {
  'tiny-python-projects': {
    id: 'tiny-python-projects', kind: 'book', title: 'Tiny Python Projects',
    author: 'Ken Youens-Clark · Manning',
    progress: '2026.07 · 21장 중 14장',
    takeaways: [
      'argparse·정규표현식·pathlib·파일 입출력으로 작은 CLI를 만들고, 장마다 주어진 pytest 테스트를 통과시켰습니다.',
      '원본 저장소를 fork해 uv 환경으로 옮기고, 테스트 스크립트를 Windows·macOS 양쪽에서 돌도록 고쳤습니다.',
    ],
    cover: '/covers/tiny-python-projects.webp',
    repository: 'https://github.com/tryfasting/tiny_python_projects',
  },
  'deep-learning-pytorch-textbook': {
    id: 'deep-learning-pytorch-textbook', kind: 'book', title: '딥 러닝 파이토치 교과서',
    author: '위키독스 공개 도서',
    progress: '1~13장 실습 노트북',
    takeaways: [
      '선형·로지스틱 회귀부터 MLP, CNN, RNN/LSTM까지 PyTorch로 직접 따라 치며 구현했습니다.',
      '토큰화·정제 같은 NLP 전처리와 Word2Vec·nn.Embedding, RNN 텍스트 분류까지 이어서 실습했습니다.',
    ],
    cover: '/covers/deep-learning-pytorch-textbook.webp',
    repository: 'https://github.com/tryfasting/deeplearning-pytorch-textbook',
  },
  'karpathy-zero-to-hero': {
    id: 'karpathy-zero-to-hero', kind: 'course', title: 'Neural Networks: Zero to Hero',
    author: 'Andrej Karpathy · 강의',
    progress: '전 시리즈 9강 따라 구현',
    takeaways: [
      'micrograd로 자동 미분과 역전파를 직접 만들고, makemore 시리즈에서 MLP·BatchNorm·WaveNet 구조를 따라 구현했습니다.',
      'GPT, BPE 토크나이저, GPT-2 재현까지 강의를 따라가며 Transformer 학습 코드를 한 줄씩 옮겨 봤습니다.',
    ],
    coverLines: ['micrograd', 'makemore', 'GPT', 'GPT-2'],
    repository: 'https://github.com/tryfasting/karpathy-zero-to-hero-clone',
  },
};

// Page copy is shared by every company page on purpose; campaigns only change color and eyebrow.
export const profile = {
  description: '유선종의 개발 포트폴리오. Python, 언어모델 학습·평가, 센서 데이터 수집 프로젝트.',
  introduction: '데이터에서 모델까지,\n직접 만들고 확인하며 배웁니다.',
  focusTitle: '지금 집중하는 방향',
  focus: 'Python으로 도구를 만들고, PyTorch로 모델의 동작을 이해하는 연습을 병행합니다. 언어모델을 학습·평가·개선해 텍스트를 다루는 일의 번거로움을 줄이는 엔지니어로 성장하고 싶습니다.',
  projectIds: ['smartrouter', 'defect'],
  studyIds: ['korean-char-lm', 'screen-tracker'],
  learningIds: ['tiny-python-projects', 'deep-learning-pytorch-textbook', 'karpathy-zero-to-hero'],
};

export interface Campaign {
  slug: string;
  theme: PortfolioTheme;
  label: string;
  indexable?: boolean;
}

export const campaigns: Record<string, Campaign> = {
  hanwha: { slug: 'hanwha', theme: 'hanwha', label: 'HANWHA FINANCE · AI / DATA' },
  'hanwha-ocean': { slug: 'hanwha-ocean', theme: 'hanwhaOcean', label: 'HANWHA OCEAN · AX' },
  'cj-olivenetworks': { slug: 'cj-olivenetworks', theme: 'cj', label: 'CJ OLIVENETWORKS · AI / DATA' },
  'naver-cloud': { slug: 'naver-cloud', theme: 'naver', label: 'NAVER CLOUD · HYPERCLOVA X DATA' },
  'db-group': { slug: 'db-group', theme: 'db', label: 'DB GROUP · AI / DATA' },
  general: { slug: 'general', theme: 'cobalt', label: 'AI / LLM ENGINEERING', indexable: true },
};

export const experience = [
  { period: '2025.03 — 2025.12', title: '이어드림스쿨 5기', category: 'AI 기술인력 양성 · DS 트랙', detail: '데이터 분석·머신러닝·딥러닝을 학습하고, 스타트업 연계 SmartRouter 프로젝트를 수행했습니다.', result: '스타트업 연계 프로젝트 장려상(3등)' },
  { period: '2024.04 — 2024.07', title: '포스코 AI·Big Data 아카데미 26기', category: 'AI · Big Data 교육', detail: 'Python, 데이터 분석, 컴퓨터 비전과 AIoT를 학습하고 주택 하자 탐지 프로젝트에 참여했습니다.', result: '최종 프로젝트 우수상' },
  { period: 'INTERNSHIP', title: '코드비전', category: '데이터 라벨링 · 품질 기준 개선', detail: '컴퓨터 비전 데이터의 모호한 객체 경계 기준을 발견했습니다. 산업 표준 자료를 조사해 가이드라인 개선안을 문서화하고 작업 일관성을 높였습니다.', result: '' },
];

export const skills = [
  { title: '모델 학습 · 평가', items: 'PyTorch / Transformers / scikit-learn', detail: '라우팅 모델(이진 분류) 학습, 정밀도·재현율과 임계값 분석, 소형 Causal LM 직접 조립' },
  { title: '데이터 · 구현', items: 'Python / Pandas / 표준 라이브러리', detail: '서비스 로그 분석과 라벨 전처리, ctypes·tomllib·argparse 기반 CLI 도구' },
  { title: '현장 데이터 수집', items: 'Raspberry Pi / SPI / OpenCV', detail: '열화상 센서 통신, 이미지 수집과 데이터 구성' },
];
