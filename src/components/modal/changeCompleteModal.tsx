/**
 * 예약 변경 등 각종 변경 작업이 성공적으로 완료되었을 때 띄워주는 공통 확인 모달입니다.
 * 확인 버튼을 누르면 modal이 닫힙니다.
 */

import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import FormButton from "../common/button/FormButton";
import checkIcon from "@/assets/icons/icon_check.svg";

export default function ChangeCompleteModal() {
    const dispatch = useAppDispatch();

    return (
        <>
            <img
                src={checkIcon}
                alt="check"
                className="size-9 rounded-full bg-background-200 mx-auto"
            />
            <p className="body-t2 text-center">변경 되었습니다.</p>
            <FormButton
                text="확인"
                type="submit"
                onClick={() => dispatch(closeModal())}
            />
        </>
    );
}
