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
