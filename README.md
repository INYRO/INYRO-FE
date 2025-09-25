# 이니로 동방 예약 웹앱 (React + Vite + TypeScript)

이니로 동방 예약 서비스 Front-end입니다. Vite 기반의 React + TypeScript 프로젝트이며, 폼/검증, 라우팅, 스타일링을 위한 최소 스택으로 구성되어 있습니다.

## 라우팅

다음과 같은 페이지를 제공합니다:

-   `/` — 메인 페이지
-   `/login` — 로그인 페이지
-   `/register` — 회원가입 페이지
-   `/reserve` — 예약 페이지
-   `/admin` — 어드민 메인
-   `/admin/user` — 어드민 유저 관리
-   `/admin/reserve` — 어드민 예약 관리

## 기술 스택

-   **빌드/런타임**: React + Vite (TypeScript, SWC)
-   **라우팅**: react-router-dom
-   **폼 상태**: react-hook-form
-   **검증**: zod, @hookform/resolvers
-   **스타일링**: Tailwind CSS (with `@tailwindcss/vite`)
-   **쿠키/세션**: js-cookie (검토 중) — JWT 전략 논의 필요

## 빠른 시작

### 사전 요구사항

-   Node.js 18 이상 권장
-   npm 또는 pnpm 중 택1

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```
