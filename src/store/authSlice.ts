import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/*
 * 앱의 유저 인증 상태와 정보를 관리하는 Redux Slice 파일입니다.
 *
 * 이니로 앱의 핵심 인증 방식은 다음과 같습니다.
 * 1) accessToken은 XSS 공격 방지를 위해 메모리(Redux state)에만 저장합니다.
 * 2) refreshToken은 서버에서 HttpOnly 쿠키로 관리하며 프론트에서 직접 접근하지 않습니다.
 * 3) isLogin 여부는 유저 정보 조회가 완전히 성공한 시점에만 true로 전환됩니다.
 * 4) authInitialized는 앱 초기 로딩 시 인증 복구(reissue)가 끝났는지를 나타내며, 화면 깜빡임을 방지합니다.
 */

// 구조(설계도)는 interface 사용
interface AuthState {
    accessToken: string | null;
    isLogin: boolean;
    user: UserProfile | null;
    authInitialized: boolean;
}

// 값 혹은 페이로드는 type 사용
type UserProfile = { sno: string; name: string; dept: string };

/* state의 초기값 설정 */
// - 1) 앱 시작 시에는 로그인되지 않은 상태
// - 2) 인증 복구 여부 또한 아직 판단되지 않은 상태
const initialState: AuthState = {
    accessToken: null,
    isLogin: false,
    user: null,
    authInitialized: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /* 로그인 처리 */
        // - 유저 정보 조회(/members/my)가 성공한 이후에만 호출됨
        // - 이 액션이 호출되는 시점을 기준으로 isLogin을 true로 설정
        login: (state, action: PayloadAction<UserProfile>) => {
            state.isLogin = true;
            // payload 전체를 그대로 할당(user 정보를 payload로 받음)
            state.user = action.payload;
        },
        /* 로그아웃 처리 */
        // - 인증 관련 state를 초기화
        // - authInitialized는 부팅 여부이므로 변경하면 안됨
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
            state.accessToken = null;
        },
        /* accessToken 저장 */
        // - 토큰을 메모리에 저장
        // - 로그인 여부(isLogin)는 여기서 변경하면 안됨
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        /* 인증 부팅 여부 처리 */
        // - App.tsx에서 reissue 시도 및 사용자 정보 조회가 끝난 이후 true
        setAuthInitialized: (state, action: PayloadAction<boolean>) => {
            state.authInitialized = action.payload;
        },
    },
});

// 액션 export
export const { login, logout, setAccessToken, setAuthInitialized } =
    authSlice.actions;

// reducer export
export default authSlice.reducer;
