import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// modal state Type
interface ModalState {
    isOpen: boolean;
    modalType: ModalType | null; // 어떤 모달을 띄울지 식별 (ex: 'login', 'confirmDelete')
}
type ModalType =
    | "findPassword"
    | "changePassword"
    | "deleteAccount"
    | "reserveComplete";

// state의 초기값 설정
const initialState: ModalState = {
    isOpen: false,
    modalType: null,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    // state를 변경하는 함수(리듀서)들을 reducers 객체 안에 정의
    reducers: {
        // openModal 액션
        // PayloadAction<modalType>은 action.payload의 타입이 modalType임을 의미
        openModal: (state, action: PayloadAction<ModalType>) => {
            state.isOpen = true;
            state.modalType = action.payload; // payload로 받은 모달 타입을 state에 저장
        },
        // closeModal 액션
        closeModal: (state) => {
            state.isOpen = false;
            state.modalType = null;
        },
    },
});

// 생성된 액션 생성자(action creators)들을 export
// 컴포넌트에서 이 액션들을 dispatch(실행)할 수 있음
export const { openModal, closeModal } = modalSlice.actions;

// store.ts에서 reducer를 등록할 수 있도록 default로 export
export default modalSlice.reducer;
