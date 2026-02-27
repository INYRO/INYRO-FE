/*
 * 프로젝트의 코드 문법과 품질, 스타일 일관성을 검사하는 ESLint 설정 파일입니다.
 * 최신 ESLint 9의 Flat Config 방식을 사용하고 있습니다.
 * Flat Config 방식은 하나의 배열 안에 모든 설정을 다 때려 넣는 방식입니다.
 *
 * 주요 설정 사항은 다음과 같습니다.
 * - TypeScript & React: 타입 안정성 검사 및 React 추천 규칙을 적용합니다.
 * - JSX a11y: 웹 접근성 관련 필수 규칙들을 자동으로 검사합니다.
 * - Prettier: 코드 포매터인 Prettier와 충돌하는 ESLint 스타일 규칙을 모두 비활성화합니다(마지막에 선언).
 * - React Refresh: Vite 환경에서 빠른 화면 새로고침(HMR)이 정상 작동하도록 돕습니다.
 *
 * js.configs.recommended는 다음을 제공합니다.
 * - no-undef: 선언하지 않은 변수를 사용하는 것
 * - no-unreachable: return 밑에 도달할 수 없는 쓸모없는 코드를 작성하는 것
 * - no-dupe-keys: 객체 안에 똑같은 키를 두 번 쓰는 것 (예: { name: "김철수", name: "홍길동" })
 * - use-isnan: NaN을 오용하는 것(예: foo === NaN 처럼 잘못 비교하는 것)
 *
 * ...tseslint.configs.recommendedTypeChecked는 TypeScript 컴파일러를 빌려 타입성 체크 검사를 제공합니다.
 * 여러개의 설정 객체들의 모음이므로, '...'로 풀어야합니다.
 * ...tseslint.configs.recommendedTypeChecked는 다음을 제공합니다.
 * - 의미없는 await 방지
 * - 잘못된 조건문 필터링(예: if(array === true), 즉, 항상 참인 변수를 조건문에 사용할 경우 경고를 줌)
 * - 배열이 아닌데 메서드 사용 방지
 *
 * react.configs.flat.recommended는 다음을 제공합니다.
 * - react/jsx-key: map() 함수의 key를 빼멱은 경우 에러를 발생시킵니다.
 * - react/no-unescaped-entities: '>'나 '""'의 일반 사용을 방지합니다(예: <div> > </div>를 &gt;로 변경 경고)
 * - react/no-unknown-property: HTML 태그의 오사용을 고쳐줍니다(예: class="..." -> className, onclick -> onClick).
 *
 * jsxA11y.flatConfigs.recommended는 다음을 제공합니다.
 * - <img> 태그의 alt 속성 누락
 * - 잘못된 Form 라벨링(예: <input> 태그에 <label>이 제대로 안 붙어있을 때 경고)
 */

import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    // 전역 무시 설정
    {
        ignores: ["dist", "build", "node_modules", ".cache"],
    },

    // 메인 설정 (TypeScript, React)
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended, // ESLint 기본 추천 규칙
            ...tseslint.configs.recommendedTypeChecked, // TypeScript 추천 규칙
            react.configs.flat.recommended, // React 핵심 추천 규칙
            jsxA11y.flatConfigs.recommended, // jsx 추천 규칙
            prettierConfig, // Prettier와 충돌하는 스타일 규칙 모두 비활성화
        ],
        // 플러그인 등록
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        languageOptions: {
            ecmaVersion: "latest", // 항상 최신 EcmaScript 버전 사용
            sourceType: "module",
            globals: globals.browser, // 브라우저 환경
            parser: tseslint.parser, // TypeScript 파서 지정
            parserOptions: {
                projectService: true, // 타입 인식 규칙 활성화 (tsconfig.json 경로 필요)
                tsconfigRootDir: import.meta.dirname, // config 파일 기준 tsconfig.json 검색, 최상단 검색
            },
        },
        settings: {
            react: {
                version: "detect", // 설치된 React 버전 자동 감지
            },
        },
        // 커스텀 규칙
        rules: {
            // --- React 규칙 ---
            "react/react-in-jsx-scope": "off", // 최신 React는 import React 불필요
            "react/prop-types": "off", // TypeScript를 사용하므로 prop-types 불필요

            // --- React hooks 규칙 ---
            "react-hooks/rules-of-hooks": "error", // 훅스 규칙 위반 시 오류
            "react-hooks/exhaustive-deps": "warn", // 의존성 배열 경고

            // --- TypeScript 규칙 ---
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ], // 사용 안 한 변수 경고 (단, _로 시작하면 무시)

            // JSX A11y 핵심 규칙
            // "jsx-a11y/alt-text": "warn",
            // "jsx-a11y/aria-props": "warn",
            // "jsx-a11y/aria-role": "warn",
            // 당장 수정하기 번거로운 a11y 규칙들 임시로 끔
            "jsx-a11y/click-events-have-key-events": "off", // div에 onClick 쓸 때 키보드 이벤트 없어도 봐줌
            "jsx-a11y/no-static-element-interactions": "off", // div를 버튼처럼 써도 봐줌

            // React Refresh 규칙
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true }, // 상수 export 허용 옵션 추가
            ],

            // --- 기타 ---
            "no-var": "error", // var 대신 const/let 사용
            "no-console": ["warn", { allow: ["warn", "error"] }], // console.log 경고
        },
    },
    // JS 설정 파일용 (eslint.config.js, tailwind.config.js 등)
    {
        files: ["**/*.{js,cjs}"],
        extends: [js.configs.recommended, prettierConfig],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.node, // Node.js 환경
        },
    }
);
