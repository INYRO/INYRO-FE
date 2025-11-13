import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import ModalLayout from "./components/modal/modalLayout";
import { login, logout } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

interface LogoutResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
}

interface MemberResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        id: number;
        sno: string;
        name: string;
        dept: string;
        status: string;
    };
}

function App() {
    const dispatch = useAppDispatch(); // isLogin 상태를 업데이트하기 위한 dispatch 선언
    const isLogin = useAppSelector((state) => state.authState.isLogin); // redux store에서 isLogin state 가져옴
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    /* 로그아웃 handling function */
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const response =
                await axiosInstance.post<LogoutResponse>("/auth/logout");

            if (response.data.isSuccess) {
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                dispatch(logout());
                await navigate("/");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn(
                    "로그아웃 실패",
                    err.response?.data || err.message
                );
                // 에러 상태 코드별 처리 가능
            } else {
                console.warn("알 수 없는 에러", err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getUserData = useCallback(async () => {
        setIsLoading(true);
        try {
            const accessToken = Cookies.get("accessToken");
            if (!accessToken) {
                return;
            }
            const user = await axiosInstance.get<MemberResponse>("/members/my");
            if (user.data.isSuccess) {
                dispatch(
                    login({
                        sno: user.data.result.sno,
                        name: user.data.result.name,
                        dept: user.data.result.dept,
                    })
                );
                await navigate("/");
            } else {
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
            }
        } catch (err) {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            if (axios.isAxiosError<MemberResponse>(err)) {
                console.warn("로그인 실패", err.response?.data || err.message);
            } else {
                console.warn("알 수 없는 에러", err);
            }
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        void getUserData();
    }, [getUserData]);

    return (
        <>
            <main className="relative v-stack max-w-sm mx-auto items-center justify-center gap-5 min-h-screen p-9">
                {/* 세션 로그아웃 버튼 */}
                {isLogin && (
                    <button
                        onClick={() => void handleLogout()}
                        disabled={isLoading}
                        className="top-0 right-0 absolute btn-sub2 m-5 px-2 py-1 border border-background-200 rounded-md"
                    >
                        로그아웃
                    </button>
                )}
                {/* children element */}
                <Outlet />
            </main>
            <ModalLayout />
        </>
    );
}

export default App;
