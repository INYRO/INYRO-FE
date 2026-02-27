/*
 * ProtectedAdminRoute는 관리자 권한이 없는 사용자의 접근을 제한하는 라우트 컴포넌트입니다.
 * ProtectedRoute와 다르게 유저가 'Bossisme'가 아닌 경우 접근을 제한합니다.
 *
 * 앱이 로딩되지 않은 상태에선 로딩 화면을 띄워 불쾌한 깜빡임을 방지하며,
 * 비 로그인 상태의 유저가 접근 시 '/login' 페이지로 리디렉션 시킵니다.
 * 또한, 로그인 상태여도 유저의 이름이 'Bossisme'가 아닌 경우 '/' 메인 랜딩 페이지로 리디렉션 시킵니다.
 */

import { useAppSelector } from "@/store/hooks";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedAdminRoute = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { isLogin, authInitialized, user } = useAppSelector(
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

    // 부팅 이후 로그인 상태가 아니면 로그인 페이지로 이동
    if (!isLogin) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    // Bossisme가 아니면 메인 페이지로 이동
    if (user?.sno !== "Bossisme") {
        return <Navigate to="/" replace />;
    }

    return children;
};
