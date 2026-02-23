import axiosInstance from "@/api/axiosInstance";
import type { ApiResponse } from "@/types/api";
import type { MemberResult } from "@/types/member";
import axios from "axios";

type MemberResponse = ApiResponse<MemberResult>;

export const fetchUser = async (): Promise<MemberResult | null> => {
    try {
        // 유저 정보 요청
        const response = await axiosInstance.get<MemberResponse>("/members/my");

        // 실패시 null 반환
        if (!response.data.isSuccess) return null;

        // 성공시 유저 정보 반환
        return response.data.result;
    } catch (err) {
        // axios-error 처리
        if (axios.isAxiosError(err)) {
            console.warn(
                "유저 데이터 불러오기 실패",
                err.response?.data || err.message
            );
        } else {
            console.warn("알 수 없는 에러", err);
        }
        return null;
    }
};
