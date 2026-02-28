import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import type { Reservation } from "@/types/reservation";

interface ReservationTableProps {
    isLoading: boolean;
    reservations: Reservation[];
}

export default function ReservationTable({
    isLoading,
    reservations,
}: ReservationTableProps) {
    const dispatch = useAppDispatch();

    const renderStatusButtons = (data: Reservation) => {
        switch (data.reservationStatus) {
            case "COMPLETED":
                return (
                    <div className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] bg-background-200 cursor-not-allowed">
                        완료
                    </div>
                );
            case "CANCELLED":
                return (
                    <div className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] bg-background-200 cursor-not-allowed">
                        취소됨
                    </div>
                );
            case "UPCOMING":
                return (
                    <div className="flex gap-2">
                        <button
                            onClick={() =>
                                dispatch(
                                    openModal({
                                        modalType: "changeReservation",
                                        reservationId: data.reservationId,
                                    })
                                )
                            }
                            className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 cursor-pointer"
                        >
                            변경
                        </button>
                        <button
                            onClick={() =>
                                dispatch(
                                    openModal({
                                        modalType: "deleteReservation",
                                        reservationId: data.reservationId,
                                        reservationDate: data.date,
                                    })
                                )
                            }
                            className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 cursor-pointer"
                        >
                            취소
                        </button>
                    </div>
                );
        }
    };

    return (
        <section className="flex flex-col gap-[15px]">
            <p className="body-t1">예약 기록</p>
            <article className="w-full rounded-[5px] border overflow-hidden border-background-300">
                <table className="w-full">
                    <thead className="bg-background-200">
                        <tr className="border-b border-background-300 *:py-1.5 text-center body-t5">
                            <th scope="col">날짜</th>
                            <th
                                scope="col"
                                className="border-r border-l border-background-300"
                            >
                                시간대
                            </th>
                            <th scope="col">상태</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {isLoading ? (
                            /* 로딩 중일 때 */
                            <tr>
                                <td
                                    colSpan={3}
                                    className="text-center py-10 body-t5 text-background-300"
                                >
                                    예약 기록을 불러오는 중입니다...
                                </td>
                            </tr>
                        ) : reservations.length > 0 ? (
                            /* 데이터가 있을 때 */
                            reservations.map((data) => (
                                <tr
                                    key={data.reservationId}
                                    className="body-t6 *:py-1.5 text-center border-b border-background-300 last:border-none hover:bg-background-100 transition-colors"
                                >
                                    <td>{data.date}</td>
                                    <td className="border-x border-background-300">
                                        <span>{data.startTime}</span>
                                        <span className="mx-1">~</span>
                                        <span>{data.endTime}</span>
                                    </td>
                                    <td className="flex items-center justify-center">
                                        {renderStatusButtons(data)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            /* 데이터가 비어있을 때 */
                            <tr>
                                <td
                                    colSpan={3}
                                    className="text-center py-10 body-t5 text-background-300"
                                >
                                    예약된 기록이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </article>
        </section>
    );
}
