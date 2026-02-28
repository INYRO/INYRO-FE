/*
 * Inyro 프로젝트의 HTTP 통신 관리 axiosInstance입니다.
 * axios의 fetch 요청을 가로채 instance에서 관리 후 사용합니다.
 *
 * instance의 주요 기능은 다음과 같습니다.
 * - BaseURL 및 타임아웃 등 공통 Axios 설정 관리
 * - 요청 인터셉터를 통해 accessToken 관리 Redux Store에서 Access Token을 추출하여 Authorization 헤더에 자동 첨부
 * - 응답 인터셉터: 401(Unauthorized) 에러 발생 시 토큰 재발급(Reissue) 로직 수행
 * - 동시성 제어: 여러 API가 동시에 401을 반환할 경우, reissue 요청이 중복되지 않도록 Promise 락킹 메커니즘 적용
 * - 인증 예외 처리: 로그인, 회원가입 등 특정 엔드포인트는 인증 헤더 첨부 및 재발급 로직에서 제외
 *
 * 요청 인터셉터는 다음과 같이 작동합니다.
 * - axios request시 요청을 가로챕니다.
 * - Redux Store에 저장된 accessToken을 추출합니다.
 * - 예외 url에 해당되지 않으면, 추출한 accessToken을 요청 헤더(Authorization Header)에 자동 첨부합니다.
 *
 * 응답 인터셉터는 다음과 같이 작동합니다.
 * - 요청 성공 시 무시합니다.
 * - 요청 실패 시 에러처리를 합니다. 에러처리는 다음과 같이 진행됩니다.
 * - axios 에러가 아닐 시, 경고를 띄웁니다.
 * - 만약 axios 에러일 시, 실패한 요청의 originalRequest 속 config 추출한 후, _retry를 boolean 형으로 삽입합니다.
 * - 단, originalRequest가 없으면 일반 에러로 처리하고 종료합니다.
 * - originalRequest가 존재할 경우, status와 url을 추출한 후,
 * - 예외 url이 아닌 경우, reissue를 진행합니다.
 *
 * reissue는 다음과 같이 진행됩니다.
 * - 이미 reissue 진행 중이면 그 Promise를 기다립니다.
 * - refreshPromise가 진행되면, 백엔드 서버에 reissue를 요청을 하며,
 * - 토큰을 재발급 받고, newAccessToken을 할당받습니다.
 * - 그리고 이를 redux store에 저장해 토큰을 갱신하며 reissue를 종료합니다.
 */

import { logout, setAccessToken } from "@/store/authSlice";
import { store } from "@/store/store";
import type { ApiResponse } from "@/types/api";
import type { ReissueResult } from "@/types/member";
import axios, { type InternalAxiosRequestConfig } from "axios";

type ReissueResponse = ApiResponse<ReissueResult>;

// 인증 관련 예외 URL 목록을 상단에 배열로 분리
// 또한, 읽기 전용 상수로 선언해 변경 불가하게 함
// 즉, 토큰 첨부를 생략할 API 목록
const NO_TOKEN_PATHS = [
    "/auth/login",
    "/auth/reissue",
    "/auth/signup",
    "/auth/smul",
] as const;

// 단, logout의 경우 좀비세션을 막기 위해 분리
// 401 에러 시 재발급(reissue) 로직을 타지 않을 API 목록
const NO_REISSUE_PATHS = [
    ...NO_TOKEN_PATHS,
    "/auth/logout", // 로그아웃 중 401이 뜨면 굳이 재발급하지 않고 쿨하게 프론트 단만 초기화
] as const;

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
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

    // 💡 NO_TOKEN_PATHS 로 검사
    // 배열의 some 메서드를 사용해 예외 URL과 매칭
    const isNoTokenEndpoint = NO_TOKEN_PATHS.some((path) => url.includes(path));

    // 토큰이 있는 경우 요청 헤더에 토큰 삽입
    if (accessToken && !isNoTokenEndpoint) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 config로 요청을 진행
    return config;
});

// * 응답 인터셉터 *
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
        // 배열의 some 메서드를 사용해 예외 URL과 매칭
        const isNoReissueEndpoint = NO_REISSUE_PATHS.some((path) =>
            url.includes(path)
        );

        // status가 401이고, 재시도 안 한 요청이며, login/reissue/logout이 아닌 경우
        if (status === 401 && !originalRequest._retry && !isNoReissueEndpoint) {
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
