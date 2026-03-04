import type { ReservationListResponse } from "@/types/reservation";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "@/types/api";
import type { MemberListResponse } from "@/types/member";

// 어드민 예약 목록 불러오기 api
export const getAdminReservationList = async () => {
    const response = await axiosInstance.get<ReservationListResponse>(
        "/admin/reservations"
    );
    return response.data;
};

// 어드민 예약 삭제 api
export interface DeleteReservationPayload {
    reservationIdList: number[];
}
export const deleteAdminReservationApi = async (
    data: DeleteReservationPayload
) => {
    const response = await axiosInstance.delete<ApiResponse<string>>(
        "/admin/reservations",
        { data }
    );
    return response.data;
};

// 어드민 유저 리스트 불러오기 api
export interface GetAdminUserListPayload {
    sortType: string;
    order: string;
    pages: number;
    sizes: number;
}
export const getAdminUserList = async ({
    sortType,
    order,
    pages,
    sizes,
}: GetAdminUserListPayload) => {
    const response = await axiosInstance.get<MemberListResponse>(
        "/admin/members",
        {
            params: { sortType, order, page: pages, size: sizes },
        }
    );
    return response.data;
};

// 어드민 유저 삭제 api
export interface DeleteUserPayload {
    snoList: string[];
}
export const deleteAdminUserApi = async (data: DeleteUserPayload) => {
    const response = await axiosInstance.delete<ApiResponse<string>>(
        "/admin/members/withdrawal",
        { data }
    );
    return response.data;
};
