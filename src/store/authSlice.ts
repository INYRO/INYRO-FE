import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isLogin: boolean;
}

// state의 초기값 설정
const initialState: AuthState = {
    isLogin: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        },
    },
});

// 액션 export
export const { login, logout } = authSlice.actions;

// reducer export
export default authSlice.reducer;
