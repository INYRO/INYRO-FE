import axiosInstance from "@/api/axiosInstance";
import Logo from "@/components/common/logo/Logo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal, resetChangeSuccess } from "@/store/modalSlice";
import type { ApiResponse } from "@/types/api";
import type { Reservation, ReservationsResult } from "@/types/reservation";
import axios from "axios";
import { useEffect, useState } from "react";

type ReservationsResponse = ApiResponse<ReservationsResult>;

export default function MyPage() {
    // 로딩, 예약 배열 변수
    const [isLoading, setIsLoading] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    // redux 선언 및 user 데이터 저장
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.authState.user);
    const { isChangeCompleted } = useAppSelector((state) => state.modal);

    // 학번, 이름, 학과 변수 선언
    const sno = user?.sno ?? "";
    const name = user?.name ?? "";
    const dept = user?.dept ?? "";

    // 예약정보 불러오는 함수
    const getReservations = async () => {
        setIsLoading(true);
        try {
            const response =
                await axiosInstance.get<ReservationsResponse>(
                    "/reservations/my"
                );
            if (response.data.isSuccess)
                setReservations(response.data.result.content);
        } catch (err) {
            if (axios.isAxiosError<ReservationsResponse>(err)) {
                console.warn(
                    "예약 목록 불러오기 실패",
                    err.response?.data || err.message
                );
            } else {
                console.warn("알 수 없는 에러", err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // 페이지 입장시 예약정보를 불러옴
    useEffect(() => {
        void getReservations();
    }, []);

    // 예약에 변경사항 있을시 예약 정보 갱신
    useEffect(() => {
        if (isChangeCompleted) {
            void getReservations().then(() => {
                dispatch(resetChangeSuccess());
            });
        }
    }, [isChangeCompleted, dispatch]);

    return (
        <div className="v-stack w-full">
            <div className="mb-11">
                <Logo />
            </div>
            <div className="flex flex-col gap-[30px]">
                <section className="flex flex-col gap-[15px]">
                    <p className="body-t1">내 정보</p>
                    <article className="flex flex-col gap-[5px]">
                        <p className="body-t1">{name}</p>
                        <div className="flex gap-1.5 body-t3">
                            <div className="flex gap-1">
                                <span className="text-background-300">
                                    학번
                                </span>
                                <span>{sno}</span>
                            </div>
                            <span className="text-background-300">&#183;</span>
                            <div className="flex gap-1">
                                <span className="text-background-300">
                                    학과
                                </span>
                                <span>{dept}</span>
                            </div>
                        </div>
                    </article>
                </section>
                {!isLoading && (
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
                                {reservations.length > 0 ? (
                                    <tbody className="w-full">
                                        {reservations.map((data) => (
                                            <tr
                                                key={data.reservationId}
                                                className="body-t6 *:py-1.5 text-center border-b border-background-300 last:border-none"
                                            >
                                                <td>{data.date}</td>
                                                <td className="border-r border-l border-background-300">
                                                    <span>
                                                        {data.startTime}
                                                    </span>
                                                    <span>{" ~ "}</span>
                                                    <span>{data.endTime}</span>
                                                </td>
                                                <td className="flex items-center justify-evenly">
                                                    {data.reservationStatus ===
                                                        "COMPLETED" && (
                                                        <div className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] bg-background-200 cursor-not-allowed">
                                                            완료
                                                        </div>
                                                    )}
                                                    {data.reservationStatus ===
                                                        "CANCELLED" && (
                                                        <div className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] bg-background-200 cursor-not-allowed">
                                                            취소됨
                                                        </div>
                                                    )}
                                                    {data.reservationStatus ===
                                                        "UPCOMING" && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    dispatch(
                                                                        openModal(
                                                                            {
                                                                                modalType:
                                                                                    "changeReservation",
                                                                                reservationId:
                                                                                    data.reservationId,
                                                                            }
                                                                        )
                                                                    )
                                                                }
                                                                className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 cursor-pointer"
                                                            >
                                                                변경
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    dispatch(
                                                                        openModal(
                                                                            {
                                                                                modalType:
                                                                                    "deleteReservation",
                                                                                reservationId:
                                                                                    data.reservationId,
                                                                                reservationDate:
                                                                                    data.date,
                                                                            }
                                                                        )
                                                                    )
                                                                }
                                                                className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 cursor-pointer"
                                                            >
                                                                취소
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody className="w-full h-[145px]">
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="text-center body-t5 text-background-300"
                                            >
                                                예약된 기록이 없습니다
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </article>
                    </section>
                )}

                <section className="flex justify-between">
                    <span className="body-t1">비밀번호 변경</span>
                    <button
                        id="change"
                        onClick={() =>
                            dispatch(openModal({ modalType: "changePassword" }))
                        }
                        className="cursor-pointer btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 "
                    >
                        변경하기
                    </button>
                </section>
                <section className="flex justify-between">
                    <span className="body-t1">회원 탈퇴</span>
                    <button
                        id="delete"
                        onClick={() =>
                            dispatch(openModal({ modalType: "deleteAccount" }))
                        }
                        className="cursor-pointer btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 "
                    >
                        탈퇴하기
                    </button>
                </section>
            </div>
        </div>
    );
}
