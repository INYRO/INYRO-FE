import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/home";

// 라우트 정의
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // 공통 레이아웃
        // errorElement: <ErrorPage />, // 에러 페이지
        children: [
            {
                index: true, // path: '/'와 동일한 경로
                element: <Home />,
            },
        ],
    },
]);
