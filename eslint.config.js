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
            prettierConfig, // Prettier와 충돌하는 스타일 규칙 모두 비활성화
        ],
        // 플러그인 등록
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "jsx-a11y": jsxA11y,
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
            "jsx-a11y/alt-text": "warn",
            "jsx-a11y/aria-props": "warn",
            "jsx-a11y/aria-role": "warn",

            // React Refresh 규칙
            "react-refresh/only-export-components": "warn", // Vite HMR을 위한 규칙

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
