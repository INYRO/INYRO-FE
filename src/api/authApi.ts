/*
 * 인증, 본인 확인, 비밀번호 재설정/변경 등 계정 보안과 관련된 API 통신 함수들을 모아둔 파일입니다.
 */

import type { ApiResponse } from "@/types/api";
import axiosInstance from "./axiosInstance";
import type { LoginResult, RegisterResult } from "@/types/member";
import type {
    ChangePasswordType,
    LoginType,
    StudentVerificationType,
} from "@/schema/authSchema";

/*
 * [학생 인증 API]
 * 사용자가 입력한 학번과 비밀번호를 통해 학교 포털 시스템과 연동하여 재학생 여부를 검증합니다.
 */
export type StudentVerificationResponse = ApiResponse<RegisterResult>;
export const verifyStudentApi = async (data: StudentVerificationType) => {
    const response = await axiosInstance.post<StudentVerificationResponse>(
        "/auth/smul",
        data
    );
    return response.data;
};

/*
 * [비밀번호 재설정 API]
 * 학생 인증이 완료된 유저의 학번과 새 비밀번호를 받아 강제로 초기화합니다.
 */
export type ResetPasswordResponse = ApiResponse<string>;
export interface ResetPasswordPayload {
    sno: string;
    newPassword: string;
    newPasswordConfirmation: string;
}

export const resetPasswordApi = async (data: ResetPasswordPayload) => {
    const response = await axiosInstance.post<ResetPasswordResponse>(
        "/auth/password/reset/smul",
        data
    );
    return response.data;
};

/**
 * [비밀번호 변경 API]
 * 마이페이지에서 로그인된 유저가 새 비밀번호를 입력하여 변경합니다.
 */
export type ChangePasswordResponse = ApiResponse<string>;
export const changePasswordApi = async (data: ChangePasswordType) => {
    const response = await axiosInstance.post<ChangePasswordResponse>(
        "/auth/password/change",
        data
    );
    return response.data;
};

/**
 * [로그인 API]
 * 학번과 비밀번호를 받아 검증하고 토큰을 반환합니다.
 */
export type LoginResponse = ApiResponse<LoginResult>;
export const loginApi = async (data: LoginType) => {
    const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        data
    );
    return response.data;
};

/**
 * [회원가입 최종 완료 API]
 * 샘물 인증을 통과한 유저의 정보와 새 비밀번호를 받아 최종 회원가입을 진행합니다.
 */
export interface SignupPayload {
    sno: string;
    password: string;
    name: string;
    dept: string;
    enrolled: boolean;
}
export const signupApi = async (data: SignupPayload) => {
    const response = await axiosInstance.post<ApiResponse<string>>(
        "/auth/signup",
        data
    );
    return response.data;
};
