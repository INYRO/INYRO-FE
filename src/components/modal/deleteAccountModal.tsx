/**
 * 사용자 계정 탈퇴를 처리하는 모달 컴포넌트입니다.
 * 탈퇴 성공 시 전역 상태(로그인 상태, 모달)를 초기화하고 메인 화면으로 리다이렉트합니다.
 *
 * 로직은 다음과 같습니다.
 * - '/members'에 delete 요청을 합니다.
 * - 성공 시 Redux store의 'logout'을 실행해 인증 관련 상태를 초기화 합니다.
 * - 그 후 modal을 닫고 메인 페이지('/')로 리디렉션 합니다.
 */

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

    // 계정 삭제 함수
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const response =
                await axiosInstance.delete<DeleteAccountResponse>("/members");
            if (response.data.isSuccess) {
                dispatch(logout()); // 로그인 상태 초기화
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
            <FormButton
                text="탈퇴하기"
                type="button"
                variant="accent"
                onClick={() => void handleDelete()}
                isLoading={isLoading}
            />
        </>
    );
}
