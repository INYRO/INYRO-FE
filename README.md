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
    1. '상대경로 중첩'(../../...)을 방지하기 위해 절대 경로를 사용합니다.
    2. @/는 src/ 폴더를 가리킵니다.
    3. 예시: `import Button from '@/components/common/Button';`

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

## 🔧 각 파일 및 코드 설명

- **main.tsx**

* Inyro 앱의 entry point인 main.tsx 입니다.
*
* main.tsx는 앱 구동에 필요한 최상위 전역 설정들을 초기화하며,
* DOM(root)에 렌더링 됩니다.
*
* 주요 설정 사항:
*   - Provider에 redux store를 연결해 앱 전체에 전역 상태(유저 정보 등)를 사용하게 합니다.
*   - RouteProvider에 router.tsx를 연결해 해당 라우팅 규칙을 사용합니다.
*   - global.css를 연결해 전역 스타일을 앱 전체에 적용합니다.
*   - StrictMode를 연결해 개발 환경의 잠재적인 버그를 탐색합니다.

-
- **router.tsx**

* router.tsx는 홈페이지의 라우팅을 총괄하는 라우팅 코드입니다.
* 여기서 정의된 router는 main.tsx의 RouterProvider의 router로 적용됩니다.
*
* Inyro 동아리방 예약 홈페이지의 라우트 url은 다음으로 구성되어 있습니다.
*   - '/': 메인 랜딩 페이지
*   - '/login': 로그인 페이지
*   - '/register': 회원가입 중 재학생 인증 페이지
*   - '/register/complete': 회원가입 중 실질 계정 생성 페이지
*   - '/reserve': 동아리방 예약 날짜 선택 페이지
*   - '/reserve/complete': 동아리 방 예약 확정 페이지
*   - '/mypage': 마이(유저정보) 페이지
*   - '/admin': 어드민 랜딩 페이지
*   - '/admin/user': 어드민 유저 관리 페이지
*   - '/admin/reserve': 어드민 예약 관리 페이지
*
* 'ProtectedRoute'는 부팅중이거나 로그인 상태가 아닌 유저의 접근을 막는 라우팅 페이지입니다.
* 이 중 다음 페이지들은 'ProtectedRoute'로 보호됩니다.
*   - '/mypage'
*   - '/reserve'
*   - '/reserve/complete'
*
* 'ProtectedAdminRoute'는 부팅중이거나 'Bossisme'가 아닌 유저의 접근을 막는 라우팅 페이지입니다.
*   - '/admin'
*   - '/admin/user'
*   - '/admin/reserve'

- **ProtectedRoute.tsx**

* ProtectedRoute는 로그인하지 않은 사용자의 접근을 제한하는 라우트 컴포넌트입니다.
*
* 앱이 로딩되지 않은 상태에선 로딩 화면을 띄워 불쾌한 깜빡임을 방지하며,
* 비 로그인 상태의 유저가 접근 시 '/login' 페이지로 리디렉션 시킵니다.

- **ProtectedAdminRoute.tsx**

* ProtectedAdminRoute는 관리자 권한이 없는 사용자의 접근을 제한하는 라우트 컴포넌트입니다.
* ProtectedRoute와 다르게 유저가 'Bossisme'가 아닌 경우 접근을 제한합니다.
*
* 앱이 로딩되지 않은 상태에선 로딩 화면을 띄워 불쾌한 깜빡임을 방지하며,
* 비 로그인 상태의 유저가 접근 시 '/login' 페이지로 리디렉션 시킵니다.
* 또한, 로그인 상태여도 유저의 이름이 'Bossisme'가 아닌 경우 '/' 메인 랜딩 페이지로 리디렉션 시킵니다.

- **store.ts**

* 앱 전체의 전역 상태를 관리하는 Redux Store 설정 파일입니다.
*
* 주요 전역 상태:
*   - modal: 전역 modal 창의 열림/닫힘 및 내부 데이터 상태를 관리합니다.
*   - authState: 유저의 로그인 여부, 토큰 상태를 관리합니다.
*
* store 자체에서 RootState와 AppDispatch 타입을 추론해 그 결과를 hooks.ts에서 참조합니다.
* 따라서 useSelector와 useDispatch 대신 hooks.ts에 있는 useAppDispatch과 useAppSelector를 사용합니다.

- **hook.ts**

* Redux Store에 접근하기 위한 Custom Hooks 설정 파일입니다.
*
* 기본 useDispatch와 useSelector 대신, 타입이 지정된 이 훅들을 사용합니다.
* 이를 통해 각 컴포넌트에서 매번 RootState나 AppDispatch 타입을 불러올 필요 없이,
* 타입 추론과 자동 완성 기능을 사용할 수 있습니다.

- **modalSlice.ts**

* 전역 모달(Modal)의 상태를 관리하는 Redux Slice 파일입니다.
*
* 모달의 열림/닫힘, 예약 ID, 예약 날짜, 변경 토글의 상태를 통합 관리합니다.
* 컨텍스트 데이터도 함께 관리하여 어떤 컴포넌트에서든 쉽게 모달을 띄울 수 있게 합니다.

- **Logo.tsx**

* 서비스의 로고를 렌더링하는 공용 컴포넌트입니다.
*
* variant prop을 통해 로고의 크기를 결정합니다.
*   - 'main': 메인 페이지용 (h1, h3 사용)
*   - 'sub': 서브 페이지용 (h2, h4 사용)
*
* 기본값은 'main'입니다.

- **FormButton.tsx**

* Form의 submit을 담당하는 공용 버튼 컴포넌트 입니다.
*
* LinkButton과 동일한 디자인 방식(variant)를 공유합니다.
*
* 버튼의 추가 스타일 레이아웃인 variant는 'primary'와 'outline'으로 정의됩니다.
*   - 'primary'는 초록 색상과 흰색 텍스트를 사용하는 시그니처 버튼이며,
*   - 'outline'은 흰 배경에 검은색 글씨, border를 쓰는 secondary 버튼입니다.
*
* 버튼의 variant 기본값은 'primary'이며,
* 처음에 정의된 commonStyle + variant + 추가 className으로 버튼의 스타일이 결정됩니다.
*
* FormButton은 다음과 같은 props를 받습니다.
*   - text: 버튼 속 글자
*   - variant: 버튼의 타입
*   - isLoading: 로딩 판별 boolean
*   - type: button의 HTML type('button', 'submit', 'reset' 타입을 받음)
*   - onClick: 클릭 이벤트
*   - className: 추가 className

- **LinkButton.tsx**

* Link의 url 이동을 담당하는 공용 버튼 컴포넌트 입니다.
*
* FormButton과 동일한 디자인 방식(variant)를 공유합니다.
*
* 버튼의 추가 스타일 레이아웃인 variant는 'primary'와 'outline'으로 정의됩니다.
*   - 'primary'는 초록 색상과 흰색 텍스트를 사용하는 시그니처 버튼이며,
*   - 'outline'은 흰 배경에 검은색 글씨, border를 쓰는 secondary 버튼입니다.
*
* 버튼의 variant 기본값은 'primary'이며,
* 처음에 정의된 commonStyle + variant + 추가 className으로 버튼의 스타일이 결정됩니다.

- **global.css**

* 홈페이지 전체의 기반 스타일을 정의하는 global.css 파일입니다.
*
* Inyro 홈페이지는 tailwind v4.2를 사용합니다.
*
* global.css에서는 테마와 베이스, 유틸리티를 정의합니다.
*   - 테마에서는 색상들과 폰트, 애니메이션을 정의합니다.
*   - 베이스에서는 테마 리셋과 전체 스타일, h1 ~ h4, p(본문) 스타일을 정의합니다.
*   - 유틸리티에서는 figma에서 설정된 body-t1 ~ body-t7 그리고 btn의 스타일 조합을 정의합니다.

- **Home.tsx**

* Home.tsx 파일은 reserve.inyro.com의 메인 랜딩 페이지를 담고 있습니다.
*
* 로그인 시 '동방 예약'과 '마이페이지' 버튼이 보이며,
* 비 로그인 시 '로그인' 버튼만 보입니다.

- **authSlice.ts**

* 앱의 유저 인증 상태와 정보를 관리하는 Redux Slice 파일입니다.
*
* 이니로 앱의 핵심 인증 방식은 다음과 같습니다.
*   1. accessToken은 XSS 공격 방지를 위해 메모리(Redux state)에만 저장합니다.
*   2. refreshToken은 서버에서 HttpOnly 쿠키로 관리하며 프론트에서 직접 접근하지 않습니다.
*   3. isLogin 여부는 유저 정보 조회가 완전히 성공한 시점에만 true로 전환됩니다.
*   4. authInitialized는 앱 초기 로딩 시 인증 복구(reissue)가 끝났는지를 나타내며, 화면 깜빡임을 방지합니다.

- **App.tsx**

* App.tsx는 Inyro 앱의 최상위 레이아웃이자 인증 부팅(Bootstrap)을 담당하는 컴포넌트입니다.
*
* 앱이 처음 켜질 때(새로고침 포함) 다음의 작업들이 진행됩니다.
*   - refreshToken(쿠키)을 기반으로 서버에 accessToken 재발급을 요청합니다.
*   - 재발급 성공 시 유저 정보를 조회하여 Redux store에 로그인 상태를 복구합니다.
*   - 모든 과정이 끝나면(성공/실패 무관) Redux Auth store의 authInitialized를 true로 변경하여 화면 깜박임을 방지합니다.

- **eslint.config.js**

* 프로젝트의 코드 문법과 품질, 스타일 일관성을 검사하는 ESLint 설정 파일입니다.
* 최신 ESLint 9의 Flat Config 방식을 사용하고 있습니다.
* Flat Config 방식은 하나의 배열 안에 모든 설정을 다 때려 넣는 방식입니다.
*
* 주요 설정 사항은 다음과 같습니다.
*   - TypeScript & React: 타입 안정성 검사 및 React 추천 규칙을 적용합니다.
*   - JSX a11y: 웹 접근성 관련 필수 규칙들을 자동으로 검사합니다.
*   - Prettier: 코드 포매터인 Prettier와 충돌하는 ESLint 스타일 규칙을 모두 비활성화합니다(마지막에 선언).
*   - React Refresh: Vite 환경에서 빠른 화면 새로고침(HMR)이 정상 작동하도록 돕습니다.
*
* js.configs.recommended는 다음을 제공합니다.
*   - no-undef: 선언하지 않은 변수를 사용하는 것
*   - no-unreachable: return 밑에 도달할 수 없는 쓸모없는 코드를 작성하는 것
*   - no-dupe-keys: 객체 안에 똑같은 키를 두 번 쓰는 것 (예: { name: "김철수", name: "홍길동" })
*   - use-isnan: NaN을 오용하는 것(예: foo === NaN 처럼 잘못 비교하는 것)
*
* ...tseslint.configs.recommendedTypeChecked는 TypeScript 컴파일러를 빌려 타입성 체크 검사를 제공합니다.
* 여러개의 설정 객체들의 모음이므로, '...'로 풀어야합니다.
* ...tseslint.configs.recommendedTypeChecked는 다음을 제공합니다.
*   - 의미없는 await 방지
*   - 잘못된 조건문 필터링(예: if(array === true), 즉, 항상 참인 변수를 조건문에 사용할 경우 경고를 줌)
*   - 배열이 아닌데 메서드 사용 방지
*
* react.configs.flat.recommended는 다음을 제공합니다.
*   - react/jsx-key: map() 함수의 key를 빼멱은 경우 에러를 발생시킵니다.
*   - react/no-unescaped-entities: '>'나 '""'의 일반 사용을 방지합니다(예: <div> > </div>를 &gt;로 변경 경고)
*   - react/no-unknown-property: HTML 태그의 오사용을 고쳐줍니다(예: class="..." -> className, onclick -> onClick).
*
* jsxA11y.flatConfigs.recommended는 다음을 제공합니다.
*   - <img> 태그의 alt 속성 누락
*   - 잘못된 Form 라벨링(예: <input> 태그에 <label>이 제대로 안 붙어있을 때 경고)

- **tsconfig.app.json**

- Inyro 앱의 메인 소스 코드(src/)를 위한 TypeScript 컴파일러 설정 파일입니다.
- Vite 빌드 설정 자체를 검사하는 tsconfig.node.json과 분리되어 있습니다.
-
- 주요 설정은 다음과 같습니다.
-   - Target & Env: 최신 자바스크립트 문법(ES2022)과 브라우저 환경(DOM)을 기준으로 타입을 검사합니다.
-   - Bundler Mode: 실제 코드 빌드는 Vite의 esbuild가 담당하므로, TypeScript는 코드 생성 없이 타입 검사만 수행합니다(noEmit: true).
-   - Linting: strict 모드를 켜서 가장 엄격하게 코드를 검사합니다.
-   - Paths: 상대 경로(../../) 대신, 절대 경로(@/components/...)를 사용할 수 있게 합니다.
