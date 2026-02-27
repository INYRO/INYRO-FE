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

- **vite.config.ts**

* Inyro 프론트엔드의 빌드 및 개발 서버 환경을 설정하는 Vite 설정 파일입니다.
* 플러그인 적용, 절대 경로 매핑, 로컬 개발 시 CORS 에러 우회를 위한 프록시 등을 관리합니다.
*
* 프록시는 백엔드에서 api를 호출할 때, 주소에 '/api'를 항상 포함하기 때문에, '/api' 주소를 가로채 백엔드에 요청을 보냅니다.
* 이는 'https://api.inyro.com/'의 백엔드 주소를 할당시킵니다.
*
* 타겟 백엔드 주소는 환경 변수(.env)의 VITE_API_URL 값을 최우선으로 사용합니다.

- **tsconfig.json**

* Inyro 프로젝트의 최상위 TypeScript 설정 파일입니다.
* Vite 템플릿의 'Solution Style'을 사용하여, 환경에 따라 설정을 두 갈래로 나눕니다.
*
* 자기 자신은 직접 파일을 컴파일하지 않고("files": []), 아래 두 파일로 역할을 위임합니다.
* 따라서, 다음 두 개 파일이 할당 되어있습니다.
*   - tsconfig.app.json는 브라우저에서 실행되는 실제 React 앱 코드용 (src/)
*   - tsconfig.node.json는 Node.js 환경에서 실행되는 설정 파일용 (vite.config.ts 등)

- **tsconfig.node.json**

* Node.js 환경에서 실행되는 설정 파일(vite.config.ts 등)을 위한 TypeScript 설정 파일입니다.
* tsconfig.app.json는 브라우저용 코드(src/)를 검사하며,
* tsconfig.node.json은 프로젝트 루트의 빌드/설정 파일들을 검사합니다.

- **axiosIntance.ts**

* Inyro 프로젝트의 HTTP 통신 관리 axiosInstance입니다.
* axios의 fetch 요청을 가로채 instance에서 관리 후 사용합니다.
*
* instance의 주요 기능은 다음과 같습니다.
*   - BaseURL 및 타임아웃 등 공통 Axios 설정 관리
*   - 요청 인터셉터를 통해 accessToken 관리 Redux Store에서 Access Token을 추출하여 Authorization 헤더에 자동 첨부
*   - 응답 인터셉터: 401(Unauthorized) 에러 발생 시 토큰 재발급(Reissue) 로직 수행
*   - 동시성 제어: 여러 API가 동시에 401을 반환할 경우, reissue 요청이 중복되지 않도록 Promise 락킹 메커니즘 적용
*   - 인증 예외 처리: 로그인, 회원가입 등 특정 엔드포인트는 인증 헤더 첨부 및 재발급 로직에서 제외
*
* 요청 인터셉터는 다음과 같이 작동합니다.
*   - axios request시 요청을 가로챕니다.
*   - Redux Store에 저장된 accessToken을 추출합니다.
*   - 예외 url에 해당되지 않으면, 추출한 accessToken을 요청 헤더(Authorization Header)에 자동 첨부합니다.
*
* 응답 인터셉터는 다음과 같이 작동합니다.
*   - 요청 성공 시 무시합니다.
*   - 요청 실패 시 에러처리를 합니다. 에러처리는 다음과 같이 진행됩니다.
*   - axios 에러가 아닐 시, 경고를 띄웁니다.
*   - 만약 axios 에러일 시, 실패한 요청의 originalRequest 속 config 추출한 후, \_retry를 boolean 형으로 삽입합니다.
*   - 단, originalRequest가 없으면 일반 에러로 처리하고 종료합니다.
*   - originalRequest가 존재할 경우, status와 url을 추출한 후,
*   - 예외 url이 아닌 경우, reissue를 진행합니다.
*
* reissue는 다음과 같이 진행됩니다.
*   - 이미 reissue 진행 중이면 그 Promise를 기다립니다.
*   - refreshPromise가 진행되면, 백엔드 서버에 reissue를 요청을 하며,
*   - 토큰을 재발급 받고, newAccessToken을 할당받습니다.
*   - 그리고 이를 redux store에 저장해 토큰을 갱신하며 reissue를 종료합니다.

- **api.ts**

* Inyro 프로젝트의 모든 API 응답을 위한 공통 TS interface입니다.
* 백엔드 서버와 약속된 표준 응답 포맷(Common Response)을 정의합니다.
*
* 여기서 '@template T'는 응답의 결과물(result)로 들어올 데이터의 타입을 의미합니다.
* 실 사용 시에 T에 타입을 지정해 사용합니다(예: ApiResponse<ReissueResult>).
*
* 해당 interface의 필드는 다음으로 구성되어 있습니다.
*   - isSuccess: API 처리의 성공 여부 (true/false)
*   - code: 서비스 고유 응답 코드 (예: "COMMON200", "AUTH4001")
*   - message: 응답 관련 상세 메시지 (에러 시 사유 등)
*   - result: 실제 반환되는 데이터 알맹이 (제네릭 T를 통해 동적 지정)

- **member.ts**

* 유저 정보의 타입을 다루는 인터페이스입니다.
* 해당 파일에는 유저의 상세 정보, 로그인 반환, 회원가입 반환, 토큰 재발급, 맴버 리스트에 관한 interface를 담고 있습니다.

- **reservation.ts**

* 예약 정보의 타입을 다루는 인터페이스입니다.
* 해당 파일에는 예약 상세 정보, 로그인 반환, 예약 결과, 관리자 예약 목록에 관한 interface를 담고 있습니다.

- **auth.ts**

* 사용자 인증 및 유저 정보와 관련된 공통 유틸리티 함수들을 관리하는 auth.ts 파일입니다.
*
* 주요 기능은 다음과 같습니다.
*   - fetchUser: 백엔드 서버(/members/my)에 현재 로그인된 유저의 상세 정보를 요청합니다.
*   - 성공 시: MemberResult 타입의 유저 데이터를 반환하여 전역 상태(Redux) 업데이트 등에 활용합니다.
*   - 실패 시: (응답 실패 또는 에러 발생) 콘솔에 디버깅용 에러 로그를 남기고 `null`을 반환합니다.

- **utils.ts**

* 프로젝트 전반에서 사용되는 공통 유틸리티 함수(날짜 포맷팅 등)를 모아둔 파일입니다.
* 해당 파일은 다음의 유틸리티 함수들을 제공합니다.
*   - formatToMonthYear은 date 객체를 파라미터로 받아 "YYYY.MM" (예: 2026.02) 형태의 문자열로 변환합니다.
*   - formatDate는 날짜 배열을 받아 첫 번째 날짜를 "YYYY-MM-DD" 형태로 변환합니다.

- **authValidators.ts**

* 사용자 인증 폼에서 사용되는 개별 입력 필드의 유효성 검사 규칙을 정의한 파일입니다.
* Zod 라이브러리와 정규식을 사용하여 검증 로직을 한 곳에서 중앙 관리합니다.
*
* 주요 유효성 검사 규칙은 다음과 같습니다.
*   - snoValidation을 통해 학번을 검증합니다.
*   - passwordValidation로 비밀번호를 검증합니다.
*
* snoValidation은 다음을 검사합니다.
*   - 숫자 9자리 형식인지 검증합니다.
*   - 단, 관리자 계정인 "Bossisme"는 예외로 통과시킵니다.
*
* passwordValidation는 다음의 규칙을 모두 만족해야 합니다.
*   - 길이: 4자 이상, 16자 이하
*   - 공백(띄어쓰기) 사용 불가
*   - 영문자, 숫자, 특수문자를 각각 최소 1개 이상 포함
*   - 보안상 위험할 수 있는 특정 특수문자( < > { } | ; ' " ) 사용 금지

- **authSchema.ts**

* 사용자 인증과 관련된 폼 데이터 검증 스키마를 모아둔 파일입니다.
* Zod 라이브러리를 사용하여 사용자 입력값의 유효성을 검사하며,
* 검사를 통과한 데이터의 TS 타입을 자동 추론(z.infer)하여 제공합니다.
*
* 중복 코드를 방지하기 위해 baseAuthSchema를 만들어 학번(sno)과 비밀번호(password)의 공통 검증 로직을 묶었습니다.
* 로그인, 회원가입, 비밀번호 찾기 등은 이 베이스 스키마를 재사용(확장)하여 관리합니다.
*
* changePasswordSchema는 새 비밀번호와 비밀번호 확인 값이 서로 일치하는지(.refine)를 추가로 검증합니다.

- **FormInput.tsx**

* 프로젝트 전반에서 사용되는 공통 FormInput 컴포넌트입니다.
* React Hook Form과의 원활한 연동을 위해 forwardRef를 사용하여 구현했습니다.
*
* 주요 기능은 다음과 같습니다.
*   - 기본 input 태그의 모든 속성(type, placeholder, disabled, onChange 등)을 그대로 상속받아 사용할 수 있습니다.
*   - label: 부모 컴포넌트에서 직접 라벨 텍스트를 주입받아 사용합니다.
*   - error: 검증 로직(Zod 등)에서 발생한 에러 메시지를 전달받아, 붉은 테두리와 함께 에러 문구를 하단에 렌더링합니다.
*   - isPlaceholder: true일 경우 label 텍스트를 placeholder로 활용하며 상단의 라벨은 숨김 처리합니다.

- **ModalLayout.tsx**

* 전역 상태(Redux)를 기반으로 앱 전체의 모달 렌더링을 담당하는 레이아웃 컴포넌트입니다.
*
* 해당 컴포넌트는 앱 최상단(App.tsx)에 한 번만 선언해두면 되며,
* 어디서든 Redux의 dispatch(openModal)로 모달을 띄울 수 있습니다.

- **DeleteAccountModal.tsx**

* 사용자 계정 탈퇴를 처리하는 모달 컴포넌트입니다.
* 탈퇴 성공 시 전역 상태(로그인 상태, 모달)를 초기화하고 메인 화면으로 리다이렉트합니다.
*
* 로직은 다음과 같습니다.
*   - '/members'에 delete 요청을 합니다.
*   - 성공 시 Redux store의 'logout'을 실행해 인증 관련 상태를 초기화 합니다.
*   - 그 후 modal을 닫고 메인 페이지('/')로 리디렉션 합니다.

- **CompleteModal.tsx**

* 각종 작업(변경, 예약 등)이 완료되었을 때 띄워주는 공용 확인 모달입니다.
* props로 텍스트와 이동할 경로를 받아 동적으로 렌더링합니다.
*
* props는 다음을 받습니다.
*   - message: modal에 출력될 메세지입니다.
*   - redirectPath: 완료 버튼을 클릭 시 리디렉션 될 경로입니다. 미작성 시 modal만 닫힙니다.
*
* 'onClick={() => void handleDelete()}'을 사용한 이유는
* 버튼의 onClick은 반환값이 없는(void) 함수를 원하는데,
* async 함수는 무조건 Promise를 뱉어내니까,
* 둘이 타입(계약)이 안 맞아서 에러가 발생합니다.
* 따라서, () => void 비동기함수() 모양의 화살표 함수를 써서
* 함수가 뱉어내는 반환값(Promise)은 없는 셈(void) 치는 효과를 줘, 타입을 맞춰주게 됩니다.

- **DeleteReservationModal.tsx**

* 동아리방 예약을 삭제하는 모달 컴포넌트입니다.
* 예약 ID를 받아 삭제 API를 호출하고, 성공 시 전역 상태를 업데이트하여 화면을 갱신합니다.
*
* 예약 삭제가 성공했을 때, redux의 notifyChangeSuccess()를 실행해
* 예약 목록을 다시 불러오도록 합니다.

- **ChangePasswordModal.tsx**

* 비밀번호 찾기를 위한 재학생 인증 모달입니다.
* 인증 성공 시 현재 모달을 닫고, 비밀번호 재설정 모달을 엽니다.

* ChangePasswordModal.tsx의 RHF의 errors 객체는 다음과 같이 생겼습니다.

```
    {
    // 1. newPassword 에러 (from Zod)
    newPassword: {
        message: "비밀번호는 4자 이상이어야 합니다.", // 우리가 화면에 띄우는 그 글자!
        type: "too_small",                         // Zod가 분류한 에러 종류
        ref: <input name="newPassword" ... />      // 실제 HTML input 태그 (자동 포커스용)
    },

    //  newPasswordConfirmation 에러 (from Zod)
    newPasswordConfirmation: {
        message: "비밀번호가 일치하지 않습니다.",
        type: "custom",
        ref: <input name="newPasswordConfirmation" ... />
    },

    // 서버 에러 (setError 수동 지정)
    root: {
        message: "기존 비밀번호와 동일하여 변경할 수 없습니다.",
        type: "server"
    }
    }
```

- **StudentVerificationModal.tsx**

* 비밀번호 찾기를 위한 재학생 인증 모달입니다.
* 학교 학번으로 인증하며, 성공 시 임시 로그인 세션을 생성하고
* 비밀번호 재설정하는 모달인 'ChangePasswordResetModal'로 스와핑합니다.

- **ResetPasswordModal.tsx**

* 학생 인증을 마친 유저의 비밀번호를 초기화하는 모달입니다.
* Redux store에 저장된 유저 정보 중 학번(sno)를 이용해 API를 호출하며,
* 성공 시 완료 모달(CompleteModal)로 전환됩니다.

- **ChangeReservationModal.tsx**

* 동아리방 예약 내용을 변경하는 모달입니다.
* React Hook Form과 Zod를 사용하여 입력값을 검증하고,
* 완료 시 예약 목록 갱신 트리거(notifyChangeSuccess) 후 완료 모달로 스와핑합니다.

- **authApi.ts**

* 인증, 본인 확인, 비밀번호 재설정/변경 등 계정 보안과 관련된 API 통신 함수들을 모아둔 파일입니다.
