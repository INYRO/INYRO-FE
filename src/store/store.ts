/*
 * 앱 전체의 전역 상태를 관리하는 Redux Store 설정 파일입니다.
 *
 * 주요 전역 상태:
 * - modal: 전역 modal 창의 열림/닫힘 및 내부 데이터 상태를 관리합니다.
 * - authState: 유저의 로그인 여부, 토큰 상태를 관리합니다.
 *
 * store 자체에서 RootState와 AppDispatch 타입을 추론해 그 결과를 hooks.ts에서 참조합니다.
 * 따라서 useSelector와 useDispatch 대신 hooks.ts에 있는 useAppDispatch과 useAppSelector를 사용합니다.
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
    // reducer 객체에 slice들을 추가
    reducer: {
        modal: modalReducer,
        authState: authReducer,
        // 다른 slice가 있다면 추가
    },
});

// store 자체에서 RootState와 AppDispatch 타입을 추론
// 이 타입들은 앱 전체에서 사용됨
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
