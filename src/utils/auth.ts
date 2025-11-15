import axiosInstance from "@/api/axiosInstance";
import { login } from "@/store/authSlice";
import type { AppDispatch } from "@/store/store";
import type { ApiResponse } from "@/types/api";
import type { MemberResult } from "@/types/auth";
import axios from "axios";
import Cookies from "js-cookie";

export const clearAuthToken = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
};

type MemberResponse = ApiResponse<MemberResult>;

export const fetchAndStoreUser = async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) return null;

    try {
        const user = await axiosInstance.get<MemberResponse>("/members/my");
        if (user.data.isSuccess) {
            dispatch(
                login({
                    sno: user.data.result.sno,
                    name: user.data.result.name,
                    dept: user.data.result.dept,
                })
            );
        }
        return user;
    } catch (err) {
        if (axios.isAxiosError<MemberResponse>(err)) {
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
