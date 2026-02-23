import React, { useState } from "react";
import FormButton from "../common/button/FormButton";
import axiosInstance from "@/api/axiosInstance";
import axios from "axios";
import { closeModal, notifyChangeSuccess } from "@/store/modalSlice";
import type { ApiResponse } from "@/types/api";
import { useAppDispatch } from "@/store/hooks";

interface DeleteReservationModalProps {
    reservationId?: number;
}

type DeleteReservationResponse = ApiResponse<string>;

export default function DeleteReservationModal({
    reservationId,
}: DeleteReservationModalProps) {
    // init
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // 예약 삭제 submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!reservationId) return;
            const response =
                await axiosInstance.delete<DeleteReservationResponse>(
                    `/reservations/${reservationId}`
                );
            if (response.data.isSuccess) {
                dispatch(notifyChangeSuccess());
                dispatch(closeModal());
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
            <form onSubmit={(e) => void handleSubmit(e)}>
                <FormButton
                    text="삭제하기"
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </>
    );
}
