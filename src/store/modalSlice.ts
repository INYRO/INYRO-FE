/*
 * 전역 모달(Modal)의 상태를 관리하는 Redux Slice 파일입니다.
 *
 * 모달의 열림/닫힘, 예약 ID, 예약 날짜, 변경 토글의 상태를 통합 관리합니다.
 * 컨텍스트 데이터도 함께 관리하여 어떤 컴포넌트에서든 쉽게 모달을 띄울 수 있게 합니다.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// modal state Type
interface ModalState {
    isOpen: boolean;
    modalType: ModalType | null; // 어떤 모달을 띄울지 식별 (예: 'login', 'confirmDelete')
    reservationId?: number | null;
    reservationDate?: string | null;
    isChangeCompleted: boolean;
}

// 모달 타입
type ModalType =
    | "studentVerificationModal"
    | "changePassword"
    | "deleteAccount"
    | "reserveComplete"
    | "resetPasswordModal"
    | "deleteReservation"
    | "changeReservation"
    | "changeComplete";

// 모달을 열 때 전달받을 데이터의 타입
type OpenModalPayload = {
    modalType: ModalType;
    reservationId?: number;
    reservationDate?: string;
};

// state의 초기값 설정
const initialState: ModalState = {
    isOpen: false,
    modalType: null,
    reservationId: null,
    reservationDate: null,
    isChangeCompleted: false,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    // state를 변경하는 함수(리듀서)들을 reducers 객체 안에 정의
    reducers: {
        // openModal 액션
        // payload로 modalType, reservationId를 받음
        // reservationId가 없으면 null
        openModal: (state, action: PayloadAction<OpenModalPayload>) => {
            state.isOpen = true;
            state.modalType = action.payload.modalType;
            state.reservationId = action.payload.reservationId ?? null;
            state.reservationDate = action.payload.reservationDate ?? null;
        },
        // closeModal 액션
        // isOpen = false 해 모달을 닫고 데이터를 초기화 함
        closeModal: (state) => {
            state.isOpen = false;
            state.modalType = null;
            state.reservationId = null;
            state.reservationDate = null;
        },
        // 작업이 성공했을 때 호출할 액션
        notifyChangeSuccess: (state) => {
            state.isChangeCompleted = true;
        },
        // 데이터를 다시 불러왔으면 flag 초기화
        resetChangeSuccess: (state) => {
            state.isChangeCompleted = false;
        },
    },
});

// 생성된 액션 생성자(action creators)들을 export
// 컴포넌트에서 이 액션들을 dispatch(실행)할 수 있음
export const {
    openModal,
    closeModal,
    notifyChangeSuccess,
    resetChangeSuccess,
} = modalSlice.actions;

// store.ts에서 reducer를 등록할 수 있도록 default로 export
export default modalSlice.reducer;
