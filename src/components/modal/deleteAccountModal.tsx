import axiosInstance from "@/api/axiosInstance";
import { logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import type { ApiResponse } from "@/types/api";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../common/button/FormButton";

type DeleteAccountResponse = ApiResponse<string>;

export default function DeleteAccountModal() {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response =
                await axiosInstance.delete<DeleteAccountResponse>("/members");
            if (response.data.isSuccess) {
                localStorage.removeItem("accessToken");
                dispatch(logout());
                dispatch(closeModal());
                await navigate("/");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn(
                    "계정 삭제 실패",
                    err.response?.data || err.message
                );
                // 에러 상태 코드별 처리 가능
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <p className="body-t1 text-accent text-center">탈퇴안내</p>
            <div className="flex flex-col body-t3 text-center">
                <span>탈퇴 버튼 선택 시,</span>
                <span>계정은 삭제되며 복구되지 않습니다.</span>
            </div>
            <form onSubmit={(e) => void handleSubmit(e)}>
                <FormButton
                    text="탈퇴하기"
                    bgColor="bg-accent"
                    isBorder={false}
                    textColor="text-white"
                    isLoading={isLoading}
                />
            </form>
        </>
    );
}
