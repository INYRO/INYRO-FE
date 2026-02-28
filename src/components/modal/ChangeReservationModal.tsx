/**
 * 동아리방 예약 내용을 변경하는 모달입니다.
 * React Hook Form과 Zod를 사용하여 입력값을 검증하고,
 * 완료 시 예약 목록 갱신 트리거(notifyChangeSuccess) 후 완료 모달로 스와핑합니다.
 */

import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import FormButton from "../common/button/FormButton";
import { notifyChangeSuccess, openModal } from "@/store/modalSlice";
import {
    changeReservationSchema,
    type ChangeReservationType,
} from "@/schema/reservationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../common/input/FormInput";
import { changeReservationApi } from "@/api/reservationApi";
import { handleApiError } from "@/utils/errorHandler";

interface ChangeReservationModalProps {
    reservationId?: number;
    reservationDate?: string;
}

export default function ChangeReservationModal({
    reservationId,
    reservationDate,
}: ChangeReservationModalProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ChangeReservationType>({
        resolver: zodResolver(changeReservationSchema),
    });

    const onSubmit = handleSubmit(async (data: ChangeReservationType) => {
        if (!reservationId) return;
        try {
            setIsLoading(true);
            const result = await changeReservationApi({
                reservationId,
                participantList: data.participantList,
                purpose: data.purpose,
                timeSlots: reservationDate,
            });
            if (result.isSuccess) {
                dispatch(notifyChangeSuccess()); // 예약 내역 새로고침 트리깅
                dispatch(openModal({ modalType: "changeComplete" }));
            } else {
                console.warn("예약 변경에 실패했습니다.");
                setError("root", {
                    message: result.message || "예약 변경에 실패했습니다.",
                });
            }
        } catch (err) {
            handleApiError(err, setError, "예약 변경 실패: 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <>
            <div className="flex items-end gap-[5px]">
                <span className="body-t2">예약 변경</span>
            </div>
            <form
                onSubmit={(e) => void onSubmit(e)}
                className="flex flex-col gap-[15px]"
            >
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        예약자 명단
                    </span>
                    <FormInput
                        required
                        {...register("participantList")}
                        error={errors.participantList?.message}
                        type="text"
                        className="h-[60px]"
                        isPlaceholder
                    />
                </section>
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        사용 목적
                    </span>
                    <FormInput
                        required
                        {...register("purpose")}
                        error={errors.purpose?.message}
                        type="text"
                        className="h-[60px]"
                        isPlaceholder
                    />
                </section>
                <span
                    className={`${
                        errors.root?.message ? "flex" : "hidden"
                    } body-t5 text-accent`}
                >
                    {errors.root?.message}
                </span>
                <FormButton
                    text="변경하기"
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </>
    );
}
