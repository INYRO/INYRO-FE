export interface Reservation {
    reservationId: number;
    date: string;
    startTime: string;
    endTime: string;
    reservationStatus: ReservationStatus;
}
export interface ReservationsResult {
    content: Reservation[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
}
export type ReservationStatus = "UPCOMING" | "COMPLETED" | "CANCELLED";
