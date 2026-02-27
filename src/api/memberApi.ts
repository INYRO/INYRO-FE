/*
 * 회원 정보 조회, 수정, 탈퇴 등 'member' 도메인과 관련된 API 통신 함수들을 모아둔 파일입니다.
 */

import type { ApiResponse } from "@/types/api";
import axiosInstance from "./axiosInstance";

/**
 * [회원 탈퇴 API]
 * 현재 로그인된 사용자의 계정을 삭제(탈퇴 처리)합니다.
 */
export type DeleteAccountResponse = ApiResponse<string>;

export const deleteAccountApi = async () => {
    const response =
        await axiosInstance.delete<DeleteAccountResponse>("/members");
    return response.data;
};
