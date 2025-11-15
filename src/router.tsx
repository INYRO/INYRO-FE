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
                        <Reserve />
                    </ProtectedRoute>
                ),
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
                    <ProtectedRoute>
                        <Outlet />
                    </ProtectedRoute>
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
