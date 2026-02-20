/*
 * ProtectedRoute는 로그인하지 않은 사용자의 접근을 제한하는 라우트 컴포넌트입니다.
 *
 */

import { useAppSelector } from "@/store/hooks";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLogin, authInitialized } = useAppSelector(
        (state) => state.authState
    );
    const location = useLocation();

    // 부팅 중이면 로딩(깜빡임 방지)
    if (!authInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                로딩중...
            </div>
        );
    }

    // 부팅 이후 로그인 상태가 아니면, 로그인 페이지로 이동
    if (!isLogin) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};
