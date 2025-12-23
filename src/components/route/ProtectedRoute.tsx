import { useAppSelector } from "@/store/hooks";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLogin, authInitialized } = useAppSelector(
        (state) => state.authState
    );
    const location = useLocation();

    // 부팅(인증 복구) 중이면 판단하지 말고 잠깐 대기(깜빡임 방지)
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
