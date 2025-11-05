import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";

export const store = configureStore({
    // reducer 객체에 slice들을 추가
    reducer: {
        modal: modalReducer,
        // 다른 slice가 있다면 추가
    },
});

// store 자체에서 RootState와 AppDispatch 타입을 추론
// 이 타입들은 앱 전체에서 사용됨
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
