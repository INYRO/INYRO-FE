/*
 * 예약 생성, 조회, 수정, 취소 등 'reserve' 도메인과 관련된 API 통신 함수들을 모아둔 파일입니다.
 */

import type { ApiResponse } from "@/types/api";
import axiosInstance from "./axiosInstance";
import type { ReservationsResult } from "@/types/reservation";

/**
 * [예약 변경 API]
 * 특정 예약(reservationId)의 참여자 명단, 사용 목적, 예약 시간 등을 수정합니다.
 */

export type ChangeReservationResponse = ApiResponse<string>;

// 서버로 보낼 데이터 타입 정의
export interface ChangeReservationPayload {
    reservationId: number;
    participantList: string;
    purpose: string;
    timeSlots?: string;
}

export const changeReservationApi = async ({
    reservationId,
    participantList,
    purpose,
    timeSlots,
}: ChangeReservationPayload) => {
    const response = await axiosInstance.patch<ChangeReservationResponse>(
        `/reservations/${reservationId}`,
        {
            participantList,
            purpose,
            timeSlots,
        }
    );
    return response.data;
};

/**
 * [예약 삭제 API]
 * 특정 예약(reservationId)을 삭제합니다.
 */
export type DeleteReservationResponse = ApiResponse<string>;

export const deleteReservationApi = async (reservationId: number) => {
    const response = await axiosInstance.delete<DeleteReservationResponse>(
        `/reservations/${reservationId}`
    );
    return response.data;
};

/**
 * [내 예약 목록 조회 API]
 * 로그인된 유저의 모든 예약 기록을 불러옵니다.
 */
export type ReservationsResponse = ApiResponse<ReservationsResult>;
export const getMyReservationsApi = async () => {
    const response =
        await axiosInstance.get<ReservationsResponse>("/reservations/my");
    return response.data;
};

/**
 * [예약 생성 API]
 * 날짜, 시간대, 예약자 명단, 사용 목적을 받아 새로운 예약을 생성합니다.
 */
export interface CreateReservationPayload {
    date: string;
    participantList: string;
    purpose: string;
    timeSlots: string[];
}
export const createReservationApi = async (data: CreateReservationPayload) => {
    // 응답 데이터가 딱히 없다면 ApiResponse<null> 이나 <string>을 사용합니다.
    const response = await axiosInstance.post<ApiResponse<null>>(
        "/reservations",
        data
    );
    return response.data;
};
