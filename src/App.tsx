import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import ModalLayout from "./components/modal/modalLayout";
import { login, logout, setAccessToken } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { ApiResponse } from "./types/api";
import { fetchAndStoreUser } from "./utils/auth";

type LogoutResponse = ApiResponse<string>;

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
                localStorage.removeItem("accessToken"); // 추가
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

    useEffect(() => {
        const loadUser = async () => {
            setIsLoading(true);
            const storedToken = localStorage.getItem("accessToken");
            if (storedToken) {
                dispatch(setAccessToken(storedToken)); // Redux에 토큰 먼저 저장
                const user = await fetchAndStoreUser(dispatch);
                if (user) {
                    dispatch(
                        login({
                            accessToken: storedToken,
                            dept: user.data.result.dept,
                            name: user.data.result.name,
                            sno: user.data.result.sno,
                        })
                    );
                }
            }

            setIsLoading(false);
        };
        void loadUser();
    }, [dispatch]);

    return (
        <>
            <main className="relative v-stack max-w-sm mx-auto items-center justify-center gap-5 min-h-screen p-9">
                {/* 세션 로그아웃 버튼 */}
                {isLogin && (
                    <button
                        onClick={() => void handleLogout()}
                        disabled={isLoading}
                        className="cursor-pointer top-0 right-0 absolute btn-sub2 m-5 px-2 py-1 border border-background-200 rounded-md"
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
