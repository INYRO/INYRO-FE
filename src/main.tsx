/*
 * Inyro 앱의 entry point인 main.tsx 입니다.
 *
 * main.tsx는 앱 구동에 필요한 최상위 전역 설정들을 초기화하며,
 * DOM(root)에 렌더링 됩니다.
 *
 * 주요 설정 사항:
 * - Provider에 redux store를 연결해 앱 전체에 전역 상태(유저 정보 등)를 사용하게 합니다.
 * - RouteProvider에 router.tsx를 연결해 해당 라우팅 규칙을 사용합니다.
 * - global.css를 연결해 전역 스타일을 앱 전체에 적용합니다.
 * - StrictMode를 연결해 개발 환경의 잠재적인 버그를 탐색합니다.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { store } from "./store/store";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
