import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLogin = useAppSelector((state) => state.authState.isLogin);

    if (!isLogin) return <Navigate to="/login" replace />;

    return children;
};
