/*
 * 사용자 인증 및 유저 정보와 관련된 공통 유틸리티 함수들을 관리하는 auth.ts 파일입니다.
 *
 * 주요 기능은 다음과 같습니다.
 * - fetchUser: 백엔드 서버(/members/my)에 현재 로그인된 유저의 상세 정보를 요청합니다.
 * - 성공 시: MemberResult 타입의 유저 데이터를 반환하여 전역 상태(Redux) 업데이트 등에 활용합니다.
 * - 실패 시: (응답 실패 또는 에러 발생) 콘솔에 디버깅용 에러 로그를 남기고 `null`을 반환합니다.
 */

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
        // data가 없거나, isSuccess가 false인 경우 null return
        if (!response.data?.isSuccess) return null;

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
