/*
 * 인증, 본인 확인, 비밀번호 재설정/변경 등 계정 보안과 관련된 API 통신 함수들을 모아둔 파일입니다.
 */

import type { ApiResponse } from "@/types/api";
import axiosInstance from "./axiosInstance";
import type { RegisterResult } from "@/types/member";
import type { StudentVerificationType } from "@/schema/authSchema";

export type StudentVerificationResponse = ApiResponse<RegisterResult>;

/*
 * [학생 인증 API]
 * 사용자가 입력한 학번과 비밀번호를 통해 학교 포털 시스템과 연동하여 재학생 여부를 검증합니다.
 */
export const verifyStudentApi = async (data: StudentVerificationType) => {
    const response = await axiosInstance.post<StudentVerificationResponse>(
        "/auth/smul",
        data
    );
    return response.data;
};
