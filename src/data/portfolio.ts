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
    role: '팀장 · 데이터 구성, 분류 모델 학습, 임계값 분석, 서빙 구조 참여',
    summary: '모든 문장을 같은 경량 모델에 보내던 교정 서비스에서 출발했습니다. 문장과 교정 의도를 함께 분류하고, 난이도에 따라 경량·고성능 모델로 요청을 나누는 파이프라인을 만들었습니다.',
    contribution: [
      '원문·교정 결과를 분석하고, 교정 강도와 문서 분야를 분류 입력에 반영했습니다.',
      'klue/roberta-base 이진 분류기를 학습하고, 정밀도·재현율을 비교해 라우팅 임계값을 분석했습니다.',
      'FastAPI 기반 서빙 구조에 참여해 분류 결과가 실제 모델 선택으로 이어지도록 연결했습니다.',
    ],
    outcome: '분류 모델 F1 0.78을 확인했고, 실제 기본 라우팅 임계값은 0.25로 설정했습니다. 이어드림스쿨 스타트업 연계 프로젝트 장려상(3등)을 수상했습니다.',
    limitation: '오프라인 검증 결과입니다. 실제 서비스의 사용자 수락률이나 이탈률 변화까지 검증하지는 못했습니다.',
    stack: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'Pandas'],
    metric: { value: '0.78', label: '분류 모델 F1' },
    award: '이어드림스쿨 · 장려상(3등)',
    repository: 'https://github.com/tryfasting/yds-dmdp-smart-router',
    steps: ['원문 + 교정 의도', 'RoBERTa 난이도 분류', '경량 / 고성능 모델 선택'],
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
  },
  general: {
    slug: 'general', theme: 'cobalt', label: 'AI / LLM ENGINEERING',
    description: '유선종의 개발 포트폴리오. Python, 언어모델 학습·평가, 센서 데이터 수집 프로젝트.',
    introduction: '데이터에서 모델까지,\n직접 만들고 확인하며 배웁니다.',
    focusTitle: '지금 집중하는 방향',
    focus: 'Python으로 도구를 만들고, PyTorch로 모델의 동작을 이해하는 연습을 병행합니다. 언어모델을 학습·평가·개선해 텍스트를 다루는 일의 번거로움을 줄이는 엔지니어로 성장하고 싶습니다.',
    projectIds: ['smartrouter', 'defect'],
    projectContext: {
      smartrouter: '데이터 구성부터 분류 모델 학습, 평가와 서빙 연결까지 경험했습니다.',
      defect: '하드웨어 통신의 병목을 해결하고 모델 실험에 필요한 데이터를 직접 확보했습니다.',
    },
  },
};

export const experience = [
  { period: '2025.02 — 2025.12', title: '이어드림스쿨 5기', category: 'AI 기술인력 양성 · DS 트랙', detail: '데이터 분석·머신러닝·딥러닝을 학습하고, 스타트업 연계 SmartRouter 프로젝트를 수행했습니다.', result: '스타트업 연계 프로젝트 장려상(3등)' },
  { period: '2024.04 — 2024.07', title: '포스코 AI·Big Data 아카데미 26기', category: 'AI · Big Data 교육', detail: 'Python, 데이터 분석, 컴퓨터 비전과 AIoT를 학습하고 주택 하자 탐지 프로젝트에 참여했습니다.', result: '최종 프로젝트 우수상' },
  { period: 'INTERNSHIP', title: '코드비전', category: '데이터 라벨링 · 품질 기준 개선', detail: '컴퓨터 비전 데이터의 모호한 객체 경계 기준을 발견했습니다. 산업 표준 자료를 조사해 가이드라인 개선안을 문서화하고 작업 일관성을 높였습니다.', result: '' },
];

export const skills = [
  { title: '모델 학습 · 평가', items: 'PyTorch / Transformers / scikit-learn', detail: '이진 분류기 학습, F1 평가, 정밀도·재현율과 임계값 분석' },
  { title: '데이터 · 구현', items: 'Python / Pandas / FastAPI', detail: '로그 분석과 전처리, 분류 결과의 API 서빙 연결' },
  { title: '현장 데이터 수집', items: 'Raspberry Pi / SPI / OpenCV', detail: '열화상 센서 통신, 이미지 수집과 데이터 구성' },
];
