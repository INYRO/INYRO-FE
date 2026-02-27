/**
 * 동아리방 예약을 삭제하는 모달 컴포넌트입니다.
 * 예약 ID를 받아 삭제 API를 호출하고, 성공 시 전역 상태를 업데이트하여 화면을 갱신합니다.
 *
 * 예약 삭제가 성공했을 때, redux의 notifyChangeSuccess()를 실행해
 * 예약 목록을 다시 불러오도록 합니다.
 */

import FormButton from "../common/button/FormButton";
import axios from "axios";
import { closeModal, notifyChangeSuccess } from "@/store/modalSlice";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { deleteReservationApi } from "@/api/reservationApi";

interface DeleteReservationModalProps {
    reservationId?: number;
}

export default function DeleteReservationModal({
    reservationId,
}: DeleteReservationModalProps) {
    // init
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // 예약 삭제 submit
    const handleDelete = async () => {
        if (!reservationId) return;
        setIsLoading(true);
        try {
            const result = await deleteReservationApi(reservationId);
            if (result.isSuccess) {
                dispatch(notifyChangeSuccess()); // 예약 목록 갱신 트리거
                dispatch(closeModal());
            } else {
                console.warn("예약 삭제 중 에러가 발생했습니다.");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn(
                    "예약 삭제 실패",
                    err.response?.data || err.message
                );
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <p className="body-t1 text-accent text-center">삭제안내</p>
            <div className="flex flex-col body-t3 text-center">
                <span>삭제 버튼 선택 시,</span>
                <span>예약은 삭제되며 복구되지 않습니다.</span>
            </div>
            <FormButton
                text="삭제하기"
                type="button"
                variant="accent"
                onClick={() => void handleDelete()}
                isLoading={isLoading}
            />
        </>
    );
}
