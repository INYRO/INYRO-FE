import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import MainLogo from "@/components/common/logo/mainLogo";
import type { Reservation, ReservationListResponse } from "@/types/reservation";
import FormButton from "@/components/common/button/formButton";

export default function AdminReserveManagement() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 예약 리스트
    const fetchReservations = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.get<ReservationListResponse>(
                "/admin/reservations"
            );
            if (res.data.isSuccess) {
                setReservations(res.data.result.reservations);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 예약 삭제
    const deleteReservation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (!selectedId) {
            setIsLoading(false);
            return;
        }
        try {
            await axiosInstance.delete(`/admin/reservations/${selectedId}`);
            setSelectedId(null);
            void fetchReservations();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // reservation fetch useEffect
    useEffect(() => {
        void fetchReservations();
    }, [fetchReservations]);

    return (
        <div className="v-stack w-full gap-6">
            <MainLogo />
            <h2 className="inline-block body-t2 font-bold text-main underline underline-offset-[6px] decoration-[2px]">
                예약 리스트
            </h2>

            <table className="border border-background-200 w-full text-left">
                <thead className="bg-background-200">
                    <tr className="body-t6 text-main text-center">
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2">예약자</th>
                        <th className="px-3 py-2">날짜</th>
                        <th className="px-3 py-2">시간대</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-3 py-6 text-center body-t4 text-background-300"
                            >
                                예약 목록을 불러오는 중입니다...
                            </td>
                        </tr>
                    ) : reservations.length === 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-3 py-6 text-center body-t4 text-background-300"
                            >
                                예약이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        reservations.map((r) => (
                            <tr
                                key={r.reservationId}
                                onClick={() => {
                                    setSelectedId(r.reservationId);
                                }}
                                className={`border-t border-background-200 cursor-pointer ${
                                    selectedId === r.reservationId
                                        ? "bg-stroke"
                                        : "hover:bg-stroke"
                                }`}
                            >
                                <td className="py-1.5 body-t6 text-center border">
                                    <input type="checkbox" />
                                </td>
                                <td className="py-1.5 body-t6 text-center border">
                                    {r.reservationId}
                                </td>
                                <td className="py-1.5 body-t6 text-center border">
                                    {r.date}
                                </td>
                                <td className="py-1.5 body-t6 text-center border">
                                    {r.startTime} ~ {r.endTime}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <form onSubmit={(e) => void deleteReservation(e)}>
                <FormButton
                    text="선택삭제"
                    bgColor="bg-accent"
                    isBorder={false}
                    textColor="text-white"
                    isLoading={isLoading}
                />
            </form>
        </div>
    );
}
