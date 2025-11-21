import { logout, setAccessToken } from "@/store/authSlice";
import { store } from "@/store/store";
import type { ApiResponse } from "@/types/api";
import type { ReissueResult } from "@/types/auth";
import axios, { type InternalAxiosRequestConfig } from "axios";

type ReissueResponse = ApiResponse<ReissueResult>;

const axiosInstance = axios.create({
    baseURL: "/api/v1",
    withCredentials: true, // 쿠키 전송
    timeout: 10000, // 10초 넘어가면 timeouts
});

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const accessToken = state.authState.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (res) => res, // 성공 시 그냥 통과
    async (error: unknown) => {
        // Axios 에러인지 확인
        if (!axios.isAxiosError(error)) {
            return Promise.reject(new Error("Unknown error occurred"));
        }

        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean; // 타입 설정
        };

        // 401이고, 재시도 안했을 때
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 루프 방지 플래그
            try {
                const response = await axios.post<ReissueResponse>(
                    "/api/v1/auth/reissue",
                    {},
                    { withCredentials: true }
                );
                const newAccessToken = response.data.result.accessToken;
                store.dispatch(setAccessToken(newAccessToken));
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest); // 원래 요청 재실행
            } catch (err) {
                store.dispatch(logout());
                if (axios.isAxiosError<ReissueResponse>(err)) {
                    console.warn(
                        "로그인 실패",
                        err.response?.data || err.message
                    );
                    return Promise.reject(err);
                } else {
                    console.warn("알 수 없는 에러", err);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
