import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/*
- 1) accessToken은 메모리에만 저장함
- 2) refreshToken은 서버에서 httpOnly cookie로 관리함
- ** 프론트에서 refreshToken을 직접 접근하면 안됨
- 3) 로그인 여부(isLogin)은 유저 정보가 확정된 시점에만 true
- 4) authInitialized는 앱 부팅 시 인증 복구 시도가 끝났는지 여부를 나타냄
*/

// 구조(설계도)는 interface 사용
interface AuthState {
    accessToken: string | null;
    isLogin: boolean;
    user: { sno: string; name: string; dept: string } | null;
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
            state.user = {
                sno: action.payload.sno,
                name: action.payload.name,
                dept: action.payload.dept,
            };
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
