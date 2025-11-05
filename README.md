# 🚀 이니로 동방 예약 웹앱 (React + Vite + TypeScript)

이니로 동방 예약 서비스 Front-end 레포지토리입니다. Vite 기반의 React + TypeScript 프로젝트이며, 폼/검증, 라우팅, 스타일링을 위한 최소 스택으로 구성되어 있습니다.

## 📍 라우팅

**다음과 같은 페이지를 제공합니다:**

- `/` — 메인 페이지
- `/login` — 로그인 페이지
- `/register` — 회원가입 페이지
- `/reserve` — 예약 페이지
- `/my_page` - 마이 페이지
- `/admin` — 어드민 메인
- `/admin/user` — 어드민 유저 관리
- `/admin/reserve` — 어드민 예약 관리

## 🛠️ 기술 스택

- **Main**: React + Vite (TypeScript, SWC)
- **State Management**: Redux Toolkit, React Redux
- **Routing**: react-router-dom
- **Styling**: Tailwind CSS
- **Forms**: react-hook-form, Zod, @hookform/resolvers
- **Linting & Formatting**: ESLint, Prettier, Husky, lint-staged

## 🏃 빠른 시작

**사전 요구사항**

- Node.js 18 이상 권장
- npm 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# TypeScript 타입 체크 + 프로덕션 빌드
npm run build

# ESLint로 코드 검사
npm run lint

# 프로덕션 빌드 미리보기
npm run preview

# Husky 설정 (자동 실행됨)
npm run prepare
```

## 💻 개발 환경 설정 (필수!)

프로젝트의 코드 품질과 일관성을 위해 모든 팀원은 아래 개발 환경을 반드시 설정해야 합니다.

-   1. **VS Code 확장 프로그램 설치**
       VS Code의 'Extensions' 탭에서 아래 두 개의 확장 프로그램을 검색하여 설치합니다.
       ESLint (게시자: Microsoft)
       Prettier - Code formatter (게시자: Prettier)

-   2. **VS Code 설정 적용**
       이 프로젝트에는 .vscode/settings.json 파일이 포함되어 있습니다.
       VS Code가 "이 작업 영역의 설정을 신뢰합니까?"라고 물으면 **'예(Yes)'**를 선택하세요. 이 파일을 통해 모든 팀원에게 아래 설정이 자동으로 적용됩니다.
       파일 저장 시 Prettier로 자동 포맷 (editor.formatOnSave)
       ESLint/Prettier 규칙 자동 인식

-   3. **설정 파일 (참고)**
       .prettierrc: 우리 팀의 코드 스타일 규칙 (들여쓰기, 따옴표 등)이 정의되어 있습니다.
       eslint.config.js: 우리 팀의 코드 품질 규칙 (버그 방지, React 훅 규칙 등)이 정의되어 있습니다.
       결론: 팀원은 1번의 확장 프로그램 2개만 설치하면, .vscode/settings.json과 프로젝트 설정 파일(eslint.config.js, .prettierrc)에 의해 모든 규칙이 자동으로 적용됩니다.

## 📜 프로젝트 규약 (Conventions)

**우리 팀은 일관성 있는 코드를 위해 아래 규칙을 준수합니다.**

- **Git 협업 전략**

```bash
   main: 🛎️ 배포용 브랜치 (안정 버전)
   develop: 🏗️ 개발 메인 브랜치 (다음 배포 버전)
   feature/[기능이름]: 👩‍💻 기능 개발 브랜치 (예: feature/login)
   fix/[수정내용]: 🐛 버그 수정 브랜치 (예: fix/button-layout)
   chore/[작업내용]: ⚙️ 설정 및 환경 구성 브랜치 (예: chore/setup-eslint)
```

- **작업 순서:**

1. develop 브랜치에서 feature/[기능이름] 브랜치를 생성합니다.
2. 기능 개발 완료 후, develop 브랜치로 Pull Request (PR)를 생성합니다.
3. 코드 리뷰 후 develop 브랜치에 병합(Merge)합니다.

- **커밋 메시지 컨벤션**
    1. 커밋 메시지는 Conventional Commits 규칙을 따릅니다.

```bash
   feat: 새로운 기능 추가
   fix: 버그 수정
   docs: 문서 수정 (README 등)
   style: 코드 스타일 수정 (포맷팅, 세미콜론 등 로직 변경 없음)
   refactor: 코드 리팩토링
   chore: 빌드 설정, 패키지 매니저 설정 등 (코드 로직 변경 없음)
   예시: "feat: 로그인 페이지 UI 구현, fix: 메인페이지 레이아웃 깨짐 수정"
```

- **디렉토리 구조**
    1. 참고: '데이터 관리' 전략에 따라 api와 store 폴더를 사용합니다.

```bash
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
```

- **네이밍 컨벤션**
    1. 컴포넌트: PascalCase (예: MyButton.tsx)
    2. 그 외 (훅, 유틸, 변수): camelCase (예: useMyHook.ts, formatDate.ts)

- **절대 경로**
    1. '지옥의 상대경로'(../../...)를 방지하기 위해 절대 경로를 사용합니다.
    2. @/는 src/ 폴더를 가리킵니다.
    3. 예시: `import Button from '@/components/common/Button';`
    4. **설정 완료**: tsconfig.app.json과 vite.config.ts에 이미 설정되어 있습니다.
    5. **주의**: VS Code를 처음 열면 TypeScript 서버 재시작 필요 (Ctrl+Shift+P → "TypeScript: Restart TS Server")

## 🗂️ Redux 상태 관리

프로젝트는 Redux Toolkit을 사용하여 전역 상태를 관리합니다.

### 폴더 구조

- `src/store/store.ts` - Redux 스토어 설정
- `src/store/hooks.ts` - 타입이 지정된 커스텀 훅
- `src/store/*Slice.ts` - 각 기능별 슬라이스

## 🔒 Git Hooks (자동 코드 검사)

이 프로젝트는 **Husky**와 **lint-staged**를 사용하여 커밋 전 자동으로 코드를 검사합니다.

### 작동 방식

- `git commit` 실행 시 자동으로:
    1. 변경된 파일에 대해 ESLint 자동 수정
    2. Prettier로 코드 포맷팅
    3. 에러가 있으면 커밋 실패

### 만약 커밋이 실패한다면?

1. 에러 메시지를 확인하고 수정
2. 다시 `git add .`
3. 다시 `git commit`

### 주의사항

- 처음 clone 후 `npm install` 실행 시 Husky가 자동 설치됨
- 커밋 전 자동 검사는 코드 품질 유지를 위한 필수 과정

## 🔧 트러블슈팅

### 절대 경로(@/)가 인식되지 않아요

→ VS Code 명령 팔레트(`Ctrl+Shift+P`)에서 "TypeScript: Restart TS Server" 실행

### ESLint 에러가 너무 많이 떠요

→ 파일 저장(`Ctrl+S`)하면 자동으로 수정됩니다

### Husky git hooks가 작동하지 않아요

→ `npm install` 또는 `npm run prepare` 실행

### 타입 에러가 발생해요

→ `npm run build`로 TypeScript 에러 확인
