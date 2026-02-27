/**
 * 각종 작업(변경, 예약 등)이 완료되었을 때 띄워주는 공용 확인 모달입니다.
 * props로 텍스트와 이동할 경로를 받아 동적으로 렌더링합니다.
 *
 * props는 다음을 받습니다.
 * - message: modal에 출력될 메세지입니다.
 * - redirectPath: 완료 버튼을 클릭 시 리디렉션 될 경로입니다. 미작성 시 modal만 닫힙니다.
 *
 * 'onClick={() => void handleDelete()}'을 사용한 이유는
 * 버튼의 onClick은 반환값이 없는(void) 함수를 원하는데,
 * async 함수는 무조건 Promise를 뱉어내니까,
 * 둘이 타입(계약)이 안 맞아서 에러가 발생합니다.
 * 따라서, () => void 비동기함수() 모양의 화살표 함수를 써서
 * 함수가 뱉어내는 반환값(Promise)은 없는 셈(void) 치는 효과를 줘, 타입을 맞춰주게 됩니다.
 */

import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import { useNavigate } from "react-router-dom";
import FormButton from "../common/button/FormButton";
import checkIcon from "@/assets/icons/icon_check.svg";

interface CompleteModalProps {
    message: string; // 화면에 보여줄 메시지 (예: "예약 되었습니다.")
    redirectPath?: string; // 확인 클릭 시 이동할 경로
}

export default function CompleteModal({
    message,
    redirectPath,
}: CompleteModalProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleConfirm = async () => {
        dispatch(closeModal());

        // 경로 이동
        if (redirectPath) {
            await navigate(redirectPath);
        }
    };

    return (
        <>
            <img
                src={checkIcon}
                alt="완료 확인"
                className="size-9 rounded-full bg-background-200 mx-auto"
            />
            <p className="body-t2 text-center">{message}</p>
            <FormButton
                text="확인"
                type="button"
                onClick={() => void handleConfirm()}
            />
        </>
    );
}
