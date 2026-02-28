/**
 * 마이페이지 하단에 위치한 계정 관리(비밀번호 변경, 회원 탈퇴) 컴포넌트입니다.
 *
 * 주요 로직은 다음과 같습니다.
 * - 각 버튼 클릭 시 Redux의 dispatch를 통해 전역 모달 상태를 변경합니다.
 * - '변경하기' 클릭 시 비밀번호 변경 모달을 켭니다.
 * - '탈퇴하기' 클릭 시 회원 탈퇴 모달을 켭니다.
 */

import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";

export default function AccountActions() {
    const dispatch = useAppDispatch();
    return (
        <>
            <section className="flex justify-between">
                <span className="body-t1">비밀번호 변경</span>
                <button
                    id="change"
                    onClick={() =>
                        dispatch(openModal({ modalType: "changePassword" }))
                    }
                    className="cursor-pointer btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 "
                >
                    변경하기
                </button>
            </section>
            <section className="flex justify-between">
                <span className="body-t1">회원 탈퇴</span>
                <button
                    id="delete"
                    onClick={() =>
                        dispatch(openModal({ modalType: "deleteAccount" }))
                    }
                    className="cursor-pointer btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 "
                >
                    탈퇴하기
                </button>
            </section>
        </>
    );
}
