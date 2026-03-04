/*
 * 관리자 페이지의 예약 관리 컴포넌트입니다.
 * 예약 목록을 조회하고 여러 건의 예약을 선택하여 일괄 삭제하는 기능을 제공합니다.
 */

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Reservation } from "@/types/reservation";
import FormButton from "@/components/common/button/FormButton";
import Logo from "@/components/common/logo/Logo";
import {
    deleteAdminReservationApi,
    getAdminReservationList,
} from "@/api/admin";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";

export default function AdminReserveManagement() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [reservationIdList, setReservationIdList] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    // 예약 리스트
    const fetchReservations = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await getAdminReservationList();
            if (!result.isSuccess) {
                console.warn("예약 불러오기에 실패했습니다.");
            }
            setReservations(result.result.reservations);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 예약 삭제
    const deleteReservation = async () => {
        if (reservationIdList.length === 0) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const result = await deleteAdminReservationApi({
                reservationIdList,
            });
            if (!result.isSuccess) {
                console.warn("삭제에 실패했습니다.");
                return;
            }
            setReservationIdList([]);
            void fetchReservations();
            dispatch(openModal({ modalType: "changeComplete" }));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void deleteReservation();
    };

    // 개별 행 선택 토글 함수
    const toggleSelection = (id: number) => {
        setReservationIdList((prev) =>
            prev.includes(id)
                ? prev.filter((reserveId) => reserveId !== id)
                : [...prev, id]
        );
    };

    // reservation fetch useEffect
    useEffect(() => {
        void fetchReservations();
    }, [fetchReservations]);

    return (
        <div className="v-stack w-full gap-6">
            <Logo />
            <h2 className="inline-block body-t2 font-bold text-main underline underline-offset-[6px] decoration-2">
                예약 리스트
            </h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="border border-background-300 rounded-[10px] overflow-hidden">
                    <table className="w-full rounded-xl">
                        <thead className="bg-background-200">
                            <tr className="body-t6 text-main text-center *:border-background-300">
                                <th className="px-3 py-2 border-r border-b"></th>
                                <th className="px-3 py-2 border-r border-b">
                                    예약자
                                </th>
                                <th className="px-3 py-2 border-r border-b">
                                    날짜
                                </th>
                                <th className="px-3 py-2 border-b">시간대</th>
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
                                        onClick={() =>
                                            toggleSelection(r.reservationId)
                                        }
                                        className={`border-t border-background-200 cursor-pointer body-t6 *:border-background-300 not-last:border-b not-last:border-background-300`}
                                    >
                                        <td className="py-1.5 body-t6 text-center border-r">
                                            <input
                                                id="select"
                                                type="checkbox"
                                                checked={reservationIdList.includes(
                                                    r.reservationId
                                                )}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                onChange={() =>
                                                    toggleSelection(
                                                        r.reservationId
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="py-1.5 body-t6 text-center border-r">
                                            {r.name}
                                        </td>
                                        <td className="py-1.5 body-t6 text-center border-r">
                                            {r.date.replace(/-/g, ".")}
                                        </td>
                                        <td className="py-1.5 body-t6 text-center">
                                            {r.startTime.substring(0, 5)} ~{" "}
                                            {r.endTime.substring(0, 5)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <FormButton
                    text="선택삭제"
                    type="submit"
                    variant="accent"
                    isLoading={isLoading}
                />
            </form>
        </div>
    );
}
