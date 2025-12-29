export interface MemberResult {
    id: number;
    sno: string;
    name: string;
    dept: string;
    status: string;
}

export interface LoginResult {
    accessToken: string;
    refreshToken: string;
}

export interface RegisterResult {
    sno: string;
    name: string;
    dept: string;
    registered: boolean;
}

export interface ReissueResult {
    accessToken: "string";
}

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

export type MemberStatus = "ENROLLED" | "LEAVE" | "WITHDRAWN";
