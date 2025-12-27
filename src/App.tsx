import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import ModalLayout from "./components/modal/modalLayout";
import {
    login,
    logout,
    setAccessToken,
    setAuthInitialized,
} from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { ApiResponse } from "./types/api";
import { fetchUser } from "./utils/auth";
import type { ReissueResult } from "./types/auth";

type LogoutResponse = ApiResponse<string>;
type ReissueResponse = ApiResponse<ReissueResult>;

function App() {
    const dispatch = useAppDispatch(); // isLogin 상태를 업데이트하기 위한 dispatch 선언

    // redux store에서 isLogin state와 authInitialized state 가져옴
    const isLogin = useAppSelector((state) => state.authState.isLogin);
    const authInitialized = useAppSelector(
        (state) => state.authState.authInitialized
    );

    const navigate = useNavigate(); // navigate

    // 로딩여부 저장 state
    const [isLoading, setIsLoading] = useState(false);

    /* 로그아웃 handling function */
    // - 서버에 로그아웃 요청시 성공/실패와 무관하게 프론트 인증 상태 정리
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const response =
                await axiosInstance.post<LogoutResponse>("/auth/logout");

            if (!response.data.isSuccess) {
                console.warn("서버 로그아웃 실패", response.data);
            }
        } catch (err) {
            /* 서버 요청이 실패한 경우 */
            // axios-error 처리
            if (axios.isAxiosError(err)) {
                console.warn(
                    "로그아웃 실패",
                    err.response?.data || err.message
                );
            } else {
                console.warn("알 수 없는 에러", err);
            }
        } finally {
            // 어떤 경우든 프론트에서 로그아웃 상태로 정리
            dispatch(setAccessToken(null));
            dispatch(logout());
            await navigate("/");
            setIsLoading(false);
        }
    };

    /* 앱 부팅 시 */
    // 1) refreshToken 쿠키 기반으로 AT 재발급
    // 2) 유저 정보 조회
    // 3) 로그인 상태 복구
    useEffect(() => {
        const bootstrapAuth = async () => {
            setIsLoading(true);
            try {
                /* refreshToken-Cookie로 accessToken 재발급 */
                // - Authorization 헤더 없이, 쿠키만으로 발급
                const reissueRes =
                    await axiosInstance.post<ReissueResponse>("/auth/reissue");
                if (!reissueRes.data.isSuccess) {
                    throw new Error("재발급 실패");
                }

                const newAccessToken = reissueRes.data.result.accessToken;
                dispatch(setAccessToken(newAccessToken));

                /* 유저 정보 조회 */
                // 성공 시 login 확정
                const user = await fetchUser();
                if (!user) throw new Error("유저 정보 불러오기 실패");

                dispatch(
                    login({
                        sno: user.sno,
                        name: user.name,
                        dept: user.dept,
                    })
                );
            } catch (err) {
                // 부팅 중 인증 복구 실패 시 로그아웃 상태로 정리
                dispatch(setAccessToken(null));
                dispatch(logout());

                // axios-error 처리
                if (axios.isAxiosError(err)) {
                    console.warn(
                        "인증 부팅 실패",
                        err.response?.data || err.message
                    );
                } else {
                    console.warn("인증 부팅 실패", err);
                }
            } finally {
                // 부팅 시도는 성공/실패와 관계없이 완료 처리
                dispatch(setAuthInitialized(true));
                setIsLoading(false);
            }
        };

        // 이미 부팅이 끝난 상태면 다시 실행하지 않음
        if (!authInitialized) {
            void bootstrapAuth();
        }
    }, [dispatch, authInitialized]);

    return (
        <>
            <main className="relative v-stack max-w-sm mx-auto items-center justify-center gap-5 min-h-screen p-9 *:animate-fade-in-out">
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
