import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import FormButton from "../common/button/FormButton";
import type { ApiResponse } from "@/types/api";
import axiosInstance from "@/api/axiosInstance";
import { notifyChangeSuccess, closeModal, openModal } from "@/store/modalSlice";
import axios from "axios";

interface ChangeReservationModalProps {
    reservationId?: number;
    reservationDate?: string;
}

type ChangeReservationResponse = ApiResponse<string>;

export default function ChangeReservationModal({
    reservationId,
    reservationDate,
}: ChangeReservationModalProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const [participantList, setParticipantList] = useState("");
    const [purpose, setPurpose] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!reservationId) return;
            const response =
                await axiosInstance.patch<ChangeReservationResponse>(
                    `/reservations/${reservationId}`,
                    {
                        participantList,
                        purpose,
                        timeSlots: reservationDate,
                    }
                );
            if (response.data.isSuccess) {
                dispatch(notifyChangeSuccess());
                dispatch(closeModal());
                dispatch(openModal({ modalType: "changeComplete" }));
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn(
                    "예약 변경 실패",
                    err.response?.data || err.message
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-end gap-[5px]">
                <span className="body-t2">예약 변경</span>
            </div>
            <form
                onSubmit={(e) => void handleSubmit(e)}
                className="flex flex-col gap-[15px]"
            >
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        예약자 명단
                    </span>
                    <input
                        value={participantList}
                        onChange={(e) => setParticipantList(e.target.value)}
                        className="border rounded-[10px] h-[60px] bg-stroke border-background-200 body-t6 p-2"
                    ></input>
                </section>
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        사용 목적
                    </span>
                    <input
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="border rounded-[10px] h-[60px] bg-stroke border-background-200 body-t6 p-2"
                    />
                </section>
                <FormButton
                    text="변경하기"
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </>
    );
}
