/*
 * 예약 정보의 타입을 다루는 인터페이스입니다.
 * 해당 파일에는 예약 상세 정보, 로그인 반환, 예약 결과, 관리자 예약 목록에 관한 interface를 담고 있습니다.
 */

import type { ApiResponse } from "./api";

// 예약 정보 interface
export interface Reservation {
    reservationId: number;
    name?: string; // 관리자 조회에는 name이 존재, 다만, 내 예약 조회에는 없어서 optional로 넣음
    date: string;
    startTime: string;
    endTime: string;
    reservationStatus: ReservationStatus;
}

// 예약 result interface
export interface ReservationsResult {
    content: Reservation[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
}

// 관리자 예약 response interface
export type ReservationListResponse = ApiResponse<{
    reservations: Reservation[];
}>;

// 예약 상태 유니온 타입
export type ReservationStatus = "UPCOMING" | "COMPLETED" | "CANCELLED";
