/*
 * App.tsx는 Inyro 앱의 최상위 레이아웃이자 인증 부팅(Bootstrap)을 담당하는 컴포넌트입니다.
 *
 * 앱이 처음 켜질 때(새로고침 포함) 다음의 작업들이 진행됩니다.
 * - refreshToken(쿠키)을 기반으로 서버에 accessToken 재발급을 요청합니다.
 * - 재발급 성공 시 유저 정보를 조회하여 Redux store에 로그인 상태를 복구합니다.
 * - 모든 과정이 끝나면(성공/실패 무관) Redux Auth store의 authInitialized를 true로 변경하여 화면 깜박임을 방지합니다.
 */

import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import {
    login,
    logout,
    setAccessToken,
    setAuthInitialized,
} from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { ApiResponse } from "./types/api";
import { fetchUser } from "./utils/auth";
import type { ReissueResult } from "./types/member";
import ModalLayout from "./components/modal/ModalLayout";
import { logoutApi } from "./api/authApi";

/* ReissueResponse는 다음과 같은 형태입니다. */
/*
    {
        isSuccess: boolean;
        code: string;
        message: string;
        result: {
            accessToken: string;
        }
    }
*/
type ReissueResponse = ApiResponse<ReissueResult>;

function App() {
    /* 기본 변수 선언 */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    /* Redux store 접근 */
    // 로그인 상태를 판단할 변수인 isLogin을 authStore에서 가져옴
    const isLogin = useAppSelector((state) => state.authState.isLogin);
    // 부팅 여부를 판단할 authInitialized를 authStore에서 가져옴
    // authInitialized의 경우 false일 경우 아직 부팅중인 상태
    const authInitialized = useAppSelector(
        (state) => state.authState.authInitialized
    );

    /*
     * 로그아웃 작업을 진행하는 handleLogout 함수입니다.
     * 로그아웃 요청 시 서버의 성공/실패 응답과 무관하게 프론트 인증 상태를 정리합니다.
     */
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            /* 로그아웃 작업 시작 */
            const result = await logoutApi();
            if (!result.isSuccess) {
                console.warn("로그아웃 실패", result.message);
            }
        } catch (err) {
            /* 서버 요청 실패 처리입니다. */
            if (axios.isAxiosError(err)) {
                console.error(
                    "로그아웃 요청 중 서버 에러가 발생했습니다.",
                    err
                );
            } else {
                console.error("알 수 없는 에러가 발생했습니다.", err);
            }
        } finally {
            /* 어떤 경우든 프론트에서 로그아웃 상태로 정리합니다. */
            dispatch(setAccessToken(null));
            dispatch(logout());
            await navigate("/");
            setIsLoading(false);
        }
    };

    /*
     * 앱 부팅 시 처리하는 내용입니다.
     *
     * 다음과 같은 절차로 진행됩니다.
     * 1) refreshToken 쿠키 기반으로 AT 재발급
     * 2) 유저 정보 조회
     * 3) 로그인 상태 복구
     */
    useEffect(() => {
        const bootstrapAuth = async () => {
            setIsLoading(true);
            try {
                /* AT 재발급 부분입니다. */
                // Authorization 헤더 없이, RT 쿠키만으로 accessToken 발급
                const reissueRes =
                    await axiosInstance.post<ReissueResponse>("/auth/reissue");
                if (!reissueRes.data.isSuccess) {
                    console.warn("AT 재발급 실패", reissueRes.data.message);
                    return;
                }

                // 재발급된 AT를 authStore의 저장
                dispatch(setAccessToken(reissueRes.data.result.accessToken));

                /* 유저 정보 조회 부분입니다. */
                const user = await fetchUser();
                if (!user) {
                    console.warn("유저 정보 조회 실패");
                    return;
                }

                // 반환된 user 객체를 바탕으로 로그인
                dispatch(login(user));
            } catch (err) {
                /* 부팅 중 인증 복구 실패 처리입니다.  */
                // 실패 시 항상 AT 초기화와 logout 실행
                dispatch(setAccessToken(null));
                dispatch(logout());

                /* 서버 요청 실패 처리입니다. */
                if (axios.isAxiosError(err)) {
                    console.warn("인증 부팅 중 서버 에러가 발생했습니다.", err);
                } else {
                    console.warn("알 수 없는 에러가 발생했습니다.", err);
                }
            } finally {
                /* 부팅 시도는 성공/실패 관계 없이 완료 처리합니다. */
                dispatch(setAuthInitialized(true));
                setIsLoading(false);
            }
        };

        /* 이미 부팅이 끝난 상태면 로직을 타지 않습니다. */
        if (!authInitialized) {
            void bootstrapAuth();
        }
    }, [dispatch, authInitialized]);

    return (
        <>
            <main className="relative v-stack max-w-sm mx-auto items-center justify-center gap-5 min-h-dvh p-9 *:animate-fade-in-out">
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
