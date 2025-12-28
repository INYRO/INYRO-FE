import { logout, setAccessToken } from "@/store/authSlice";
import { store } from "@/store/store";
import type { ApiResponse } from "@/types/api";
import type { ReissueResult } from "@/types/auth";
import axios, { type InternalAxiosRequestConfig } from "axios";

type ReissueResponse = ApiResponse<ReissueResult>;

const axiosInstance = axios.create({
    baseURL: "https://api.inyro.com/api/v1",
    withCredentials: true, // 쿠키 전송
    timeout: 10000, // 10초 넘어가면 timeouts
});

// reissue를 1번만 실행하고 나머지는 기다리게 함(401 동시 발생 방지용)
let refreshPromise: Promise<string> | null = null;

// * 요청 인터셉터 *
// - axios request시 요청을 가로채서 custom 후 요청을 보냄
// - Redux의 AT를 Authorization 헤더에 자동 첨부
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // redux에 저장된 accessToken 불러옴
    const { accessToken } = store.getState().authState;

    const url = config.url ?? "";
    const isAuthEndpoint =
        url.includes("/auth/login") || url.includes("/auth/reissue");

    // 토큰이 있는 경우 요청 헤더에 토큰 삽입
    if (accessToken && !isAuthEndpoint) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 config로 요청을 진행
    return config;
});

axiosInstance.interceptors.response.use(
    // 요청 성공시 그대로 반환
    (res) => res,
    // 요청 실패시 에러 처리들
    async (error: unknown) => {
        // axios error인지 확인
        if (!axios.isAxiosError(error)) {
            return Promise.reject(new Error("알 수 없는 에러가 발생했습니다."));
        }

        // original-request 꺼내기 + _retry 확장
        // - 실패한 요청의 config를 꺼냄
        // - _retry를 boolean 형으로 추가
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // 요청 정보(original-request)가 없으면 그냥 에러 반환
        if (!originalRequest) return Promise.reject(error);

        // status와 url 추출
        // status는 HTTP 상태코드
        const status = error.response?.status;
        const url = originalRequest.url ?? "";

        // * 인증 관련 end-point includes 설정 *
        // - 인증 관련 end-point는 auth 및 reissue 로직을 타면 안 됨
        // - login: 로그인 시도 자체는 accessToken 만료와 무관
        // - reissue: reissue 요청에 reissue 로직은 무한루프
        // - logout: 로그아웃은 세션 정리 과정
        const isAuthEndpoint =
            url.includes("/auth/login") ||
            url.includes("/auth/reissue") ||
            url.includes("/auth/logout");

        // status가 401이고, 재시도 안 한 요청이며, login/reissue/logout이 아닌 경우
        if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            // _retry flag 설정
            originalRequest._retry = true;

            try {
                // 이미 reissue 진행 중이면 그 Promise를 기다림
                if (!refreshPromise) {
                    refreshPromise = (async () => {
                        const response =
                            await axiosInstance.post<ReissueResponse>(
                                "/auth/reissue",
                                {}
                            );

                        // response data가 없을 시
                        if (!response.data.isSuccess) {
                            throw new Error("토큰 재발급 실패");
                        }

                        // 성공 시 accessToken 반환
                        return response.data.result.accessToken;
                    })().finally(() => {
                        // refreshPromise 초기화(null)
                        refreshPromise = null;
                    });
                }
                // newAccessToken 값 저장
                const newAccessToken = await refreshPromise;

                // 새 accessToken 저장
                // original-request 헤더에 새로운 accessToken 삽입
                store.dispatch(setAccessToken(newAccessToken));
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // originalRequest(config)로 요청 재실행
                return axiosInstance(originalRequest);
            } catch (err) {
                // * reissue 실패 시 *
                // - accessToken 초기화
                // - 로그인 상태 초기화
                store.dispatch(setAccessToken(null));
                store.dispatch(logout());

                // axios 에러인 경우 자세한 logging 출력
                if (axios.isAxiosError<ReissueResponse>(err)) {
                    console.warn(
                        "토큰 재발급 실패",
                        err.response?.data || err.message
                    );
                    return Promise.reject(err);
                }

                // 그 외 unknown error 출력
                console.warn("알 수 없는 에러", err);
                return Promise.reject(error);
            }
        }

        // 401이 아니거나, 이미 재시도 했거나, auth-end-point면 원 에러 반환
        return Promise.reject(error);
    }
);

export default axiosInstance;
