/*
 * 유저 정보의 타입을 다루는 인터페이스입니다.
 * 해당 파일에는 유저의 상세 정보, 로그인 반환, 회원가입 반환, 토큰 재발급, 맴버 리스트에 관한 interface를 담고 있습니다.
 */

import type { ApiResponse } from "./api";

// 유저 상세 정보
export interface MemberResult {
    id: number;
    sno: string;
    name: string;
    dept: string;
    status: MemberStatus;
}

// 로그인 성공
export interface LoginResult {
    accessToken: string;
    refreshToken: string;
}

// 회원가입 결과
export interface RegisterResult {
    sno: string;
    name: string;
    dept: string;
    registered: boolean;
}

// 토큰 재발급
export interface ReissueResult {
    accessToken: string;
}

// 페이징 처리가 포함된 맴버 목록
// ApiResponse Generic을 재사용 해 중복 제거
/*
export interface MemberListResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        content: MemberResult[];
        pageNumber: number;
        pageSize: number;
        totalElements: number;
        totalPages: number;
        last: boolean;
    };
}
*/
export type MemberListResponse = ApiResponse<{
    content: MemberResult[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}>;

// 멤버의 재학 상태를 나타내는 유니온 타입
export type MemberStatus = "ENROLLED" | "LEAVE" | "WITHDRAWN";
