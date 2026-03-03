import type { ReservationListResponse } from "@/types/reservation";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "@/types/api";

export const getAdminReservationList = async () => {
    const response = await axiosInstance.get<ReservationListResponse>(
        "/admin/reservations"
    );
    return response.data;
};

export const deleteAdminReservationApi = async (reservationId: number) => {
    const response = await axiosInstance.delete<ApiResponse<string>>(
        `/admin/reservations/${reservationId}`
    );
    return response.data;
};
