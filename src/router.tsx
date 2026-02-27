/*
 * router.tsx는 홈페이지의 라우팅을 총괄하는 라우팅 코드입니다.
 * 여기서 정의된 router는 main.tsx의 RouterProvider의 router로 적용됩니다.
 *
 * Inyro 동아리방 예약 홈페이지의 라우트 url은 다음으로 구성되어 있습니다.
 * - '/': 메인 랜딩 페이지
 * - '/login': 로그인 페이지
 * - '/register': 회원가입 중 재학생 인증 페이지
 * - '/register/complete': 회원가입 중 실질 계정 생성 페이지
 * - '/reserve': 동아리방 예약 날짜 선택 페이지
 * - '/reserve/complete': 동아리 방 예약 확정 페이지
 * - '/mypage': 마이(유저정보) 페이지
 * - '/admin': 어드민 랜딩 페이지
 * - '/admin/user': 어드민 유저 관리 페이지
 * - '/admin/reserve': 어드민 예약 관리 페이지
 *
 * 'ProtectedRoute'는 부팅중이거나 로그인 상태가 아닌 유저의 접근을 막는 라우팅 페이지입니다.
 * 이 중 다음 페이지들은 'ProtectedRoute'로 보호됩니다.
 * - '/mypage'
 * - '/reserve'
 * - '/reserve/complete'
 *
 * 'ProtectedAdminRoute'는 부팅중이거나 'Bossisme'가 아닌 유저의 접근을 막는 라우팅 페이지입니다.
 * - '/admin'
 * - '/admin/user'
 * - '/admin/reserve'
 */

import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import AdminHome from "./pages/AdminHome";
import AdminReserveManagement from "./pages/AdminReserveManagement";
import AdminUserManagement from "./pages/AdminUserManagement";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";
import RegisterComplete from "./pages/RegisterComplete";
import Reserve from "./pages/Reserve";
import ReserveComplete from "./pages/ReserveComplete";
import { ProtectedAdminRoute } from "./components/route/ProtectedAdminRoute";

// 라우트 정의
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // 공통 레이아웃
        // errorElement: <ErrorPage />, // 에러 페이지
        children: [
            // 일반 사용자 페이지
            {
                index: true, // path: '/'
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Outlet />,
                children: [
                    {
                        index: true, // path: '/register'
                        element: <Register />,
                    },
                    {
                        path: "complete", // path: '/register/complete'
                        element: <RegisterComplete />,
                    },
                ],
            },
            {
                path: "reserve",
                element: (
                    <ProtectedRoute>
                        <Outlet />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Reserve />,
                    },
                    {
                        path: "complete",
                        element: <ReserveComplete />,
                    },
                ],
            },
            {
                path: "mypage",
                element: (
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                ),
            },

            // 관리자 페이지
            {
                path: "admin",
                element: (
                    <ProtectedAdminRoute>
                        <Outlet />
                    </ProtectedAdminRoute>
                ),
                children: [
                    {
                        index: true, // path: '/admin'
                        element: <AdminHome />,
                    },
                    {
                        path: "user", // path: '/admin/user'
                        element: <AdminUserManagement />,
                    },
                    {
                        path: "reserve", // path: '/admin/reserve'
                        element: <AdminReserveManagement />,
                    },
                ],
            },
        ],
    },
]);
