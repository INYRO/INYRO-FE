import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isLogin: boolean;
    sno: string | null;
    name: string | null;
    dept: string | null;
}

interface User {
    sno: string;
    name: string;
    dept: string;
}

// state의 초기값 설정
const initialState: AuthState = {
    isLogin: false,
    sno: null,
    name: null,
    dept: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.isLogin = true;
            state.sno = action.payload.sno;
            state.name = action.payload.name;
            state.dept = action.payload.dept;
        },
        logout: (state) => {
            state.isLogin = false;
            state.sno = null;
            state.name = null;
            state.dept = null;
        },
    },
});

// 액션 export
export const { login, logout } = authSlice.actions;

// reducer export
export default authSlice.reducer;
