import axiosInstance from "@/api/axiosInstance";
import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../common/button/formButton";

interface DeleteAccountResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
}

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
                dispatch(closeModal());
                await navigate("/");
                window.location.reload();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn(
                    "비밀번호 변경 실패",
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
