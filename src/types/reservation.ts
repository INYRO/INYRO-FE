// 예약 정보 interface
export interface Reservation {
    reservationId: number;
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
export interface ReservationListResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        reservations: Reservation[];
    };
}

export type ReservationStatus = "UPCOMING" | "COMPLETED" | "CANCELLED";
