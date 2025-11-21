import axiosInstance from "@/api/axiosInstance";
import { login } from "@/store/authSlice";
import { store, type AppDispatch } from "@/store/store";
import type { ApiResponse } from "@/types/api";
import type { MemberResult } from "@/types/auth";
import axios from "axios";

type MemberResponse = ApiResponse<MemberResult>;

export const fetchAndStoreUser = async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get<MemberResponse>("/members/my");
        if (response.data.isSuccess) {
            const currentAccessToken = store.getState().authState.accessToken;

            dispatch(
                login({
                    accessToken: currentAccessToken || "",
                    sno: response.data.result.sno,
                    name: response.data.result.name,
                    dept: response.data.result.dept,
                })
            );
        }
        return response;
    } catch (err) {
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
