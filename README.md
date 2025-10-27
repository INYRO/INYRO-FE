🚀 이니로 동방 예약 웹앱 (React + Vite + TypeScript)
이니로 동방 예약 서비스 Front-end 레포지토리입니다. Vite 기반의 React + TypeScript 프로젝트이며, 폼/검증, 라우팅, 스타일링을 위한 최소 스택으로 구성되어 있습니다.

📍 라우팅
다음과 같은 페이지를 제공합니다:
/ — 메인 페이지
/login — 로그인 페이지
/register — 회원가입 페이지
/reserve — 예약 페이지
/my_page - 마이 페이지
/admin — 어드민 메인
/admin/user — 어드민 유저 관리
/admin/reserve — 어드민 예약 관리

🛠️ 기술 스택
Main: React + Vite (TypeScript, SWC)
Routing: react-router-dom
Styling: Tailwind CSS
Forms: react-hook-form, Zod, @hookform/resolvers
Linting & Formatting: ESLint, Prettier
Auth (TBD): js-cookie (JWT 전략 논의 필요)

🏃 빠른 시작
사전 요구사항
Node.js 18 이상 권장
npm 설치 및 실행

# 의존성 설치

npm install

# 개발 서버 실행

npm run dev

# 프로덕션 빌드

npm run build

💻 개발 환경 설정 (필수!)
프로젝트의 코드 품질과 일관성을 위해 모든 팀원은 아래 개발 환경을 반드시 설정해야 합니다.

1. VS Code 확장 프로그램 설치
   VS Code의 'Extensions' 탭에서 아래 두 개의 확장 프로그램을 검색하여 설치합니다.
   ESLint (게시자: Microsoft)
   Prettier - Code formatter (게시자: Prettier)

2. VS Code 설정 적용
   이 프로젝트에는 .vscode/settings.json 파일이 포함되어 있습니다.
   VS Code가 "이 작업 영역의 설정을 신뢰합니까?"라고 물으면 **'예(Yes)'**를 선택하세요. 이 파일을 통해 모든 팀원에게 아래 설정이 자동으로 적용됩니다.
   파일 저장 시 Prettier로 자동 포맷 (editor.formatOnSave)
   ESLint/Prettier 규칙 자동 인식

3. 설정 파일 (참고)
   .prettierrc: 우리 팀의 코드 스타일 규칙 (들여쓰기, 따옴표 등)이 정의되어 있습니다.
   eslint.config.js: 우리 팀의 코드 품질 규칙 (버그 방지, React 훅 규칙 등)이 정의되어 있습니다.
   결론: 팀원은 1번의 확장 프로그램 2개만 설치하면, .vscode/settings.json과 프로젝트 설정 파일(eslint.config.js, .prettierrc)에 의해 모든 규칙이 자동으로 적용됩니다.

📜 프로젝트 규약 (Conventions)
우리 팀은 일관성 있는 코드를 위해 아래 규칙을 준수합니다.

1. Git 협업 전략
   main: 🛎️ 배포용 브랜치 (안정 버전)
   develop: 🏗️ 개발 메인 브랜치 (다음 배포 버전)
   feature/[기능이름]: 👩‍💻 기능 개발 브랜치 (예: feature/login)
   fix/[수정내용]: 🐛 버그 수정 브랜치 (예: fix/button-layout)

작업 순서:
develop 브랜치에서 feature/[기능이름] 브랜치를 생성합니다.
기능 개발 완료 후, develop 브랜치로 Pull Request (PR)를 생성합니다.
코드 리뷰 후 develop 브랜치에 병합(Merge)합니다.

2. 커밋 메시지 컨벤션
   커밋 메시지는 Conventional Commits 규칙을 따릅니다.
   feat: 새로운 기능 추가
   fix: 버그 수정
   docs: 문서 수정 (README 등)
   style: 코드 스타일 수정 (포맷팅, 세미콜론 등 로직 변경 없음)
   refactor: 코드 리팩토링
   chore: 빌드 설정, 패키지 매니저 설정 등 (코드 로직 변경 없음)
   예시: "feat: 로그인 페이지 UI 구현, fix: 메인페이지 레이아웃 깨짐 수정"

3. 디렉토리 구조
   참고: '데이터 관리' 전략에 따라 api와 store 폴더를 사용합니다.

src/
├── api/ # API 요청 함수
├── assets/ # 이미지, 폰트 등 정적 파일
├── components/
│ ├── common/ # 1. 공통 컴포넌트 (Button, Input, Modal...)
│ └── feature/ # 2. 특정 기능(도메인) 컴포넌트 (ProfileEditor...)
├── constants/ # 공통 상수 (API URL, 키 값 등)
├── hooks/ # 공통 커스텀 훅 (useToggle, useDebounce...)
├── pages/ # 라우팅되는 페이지 컴포넌트 (`react-router-dom` 연동)
├── styles/ # 전역 CSS, tailwind.css
└── utils/ # 순수 유틸 함수 (formatDate, validators...)

4. 네이밍 컨벤션
   컴포넌트: PascalCase (예: MyButton.tsx)
   그 외 (훅, 유틸, 변수): camelCase (예: useMyHook.ts, formatDate.ts)

5. 절대 경로
   '지옥의 상대경로'(../../...)를 방지하기 위해 절대 경로를 사용합니다.
   @/는 src/ 폴더를 가리킵니다.
   예시: import Button from '@/components/common/Button';
