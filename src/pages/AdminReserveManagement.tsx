import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import MainLogo from "@/components/common/logo/mainLogo";

type ReservationStatus = "UPCOMING" | "COMPLETED" | "CANCELLED";

interface Reservation {
    reservationId: number;
    date: string;
    startTime: string;
    endTime: string;
    reservationStatus: ReservationStatus;
}

interface ReservationListResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        reservations: Reservation[];
    };
}

interface ReservationDetailResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: Reservation;
}

export default function AdminReserveManagement() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [detail, setDetail] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);

    const fetchReservations = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get<ReservationListResponse>(
                "/admin/reservations"
            );
            if (res.data.isSuccess) {
                setReservations(res.data.result.reservations);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDetail = useCallback(async (id: number) => {
        setDetailLoading(true);
        try {
            const res = await axiosInstance.get<ReservationDetailResponse>(
                `/admin/reservations/${id}`
            );
            if (res.data.isSuccess) {
                setDetail(res.data.result);
            }
        } finally {
            setDetailLoading(false);
        }
    }, []);

    const deleteReservation = useCallback(async () => {
        if (!selectedId) return;
        await axiosInstance.delete(`/admin/reservations/${selectedId}`);
        setReservations((prev) =>
            prev.filter((r) => r.reservationId !== selectedId)
        );
        setDetail(null);
        setSelectedId(null);
    }, [selectedId]);

    useEffect(() => {
        void fetchReservations();
    }, [fetchReservations]);

    return (
        <div className="v-stack w-full gap-6">
            <MainLogo />

            <span className="body-t2 text-primary">예약 리스트</span>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                <div className="border border-background-200 rounded-[10px] bg-background-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-background-200">
                            <tr className="body-t6 text-main">
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">날짜</th>
                                <th className="px-3 py-2">시간</th>
                                <th className="px-3 py-2">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
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
                                            void fetchDetail(r.reservationId);
                                        }}
                                        className={`border-t border-background-200 cursor-pointer ${
                                            selectedId === r.reservationId
                                                ? "bg-stroke"
                                                : "hover:bg-stroke"
                                        }`}
                                    >
                                        <td className="px-3 py-2 body-t3">
                                            {r.reservationId}
                                        </td>
                                        <td className="px-3 py-2 body-t3">
                                            {r.date}
                                        </td>
                                        <td className="px-3 py-2 body-t3">
                                            {r.startTime} ~ {r.endTime}
                                        </td>
                                        <td className="px-3 py-2 body-t3">
                                            {r.reservationStatus}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border border-background-200 rounded-[10px] bg-stroke px-4 py-3 min-h-[180px]">
                    <h3 className="body-t3 mb-2 text-main">예약 상세</h3>
                    {detailLoading ? (
                        <div className="body-t4 text-background-300">
                            상세 정보를 불러오는 중입니다...
                        </div>
                    ) : !detail ? (
                        <div className="body-t4 text-background-300">
                            왼쪽에서 예약을 선택하세요.
                        </div>
                    ) : (
                        <div className="space-y-2 body-t3">
                            <div className="flex justify-between">
                                <span className="text-background-300">
                                    예약 ID
                                </span>
                                <span>{detail.reservationId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-background-300">
                                    날짜
                                </span>
                                <span>{detail.date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-background-300">
                                    시간
                                </span>
                                <span>
                                    {detail.startTime} ~ {detail.endTime}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-background-300">
                                    상태
                                </span>
                                <span>{detail.reservationStatus}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={() => void deleteReservation()}
                disabled={!selectedId}
                className="w-full h-[44px] rounded-[10px] bg-accent text-background-100 btn-main disabled:opacity-40"
            >
                선택삭제
            </button>
        </div>
    );
}
