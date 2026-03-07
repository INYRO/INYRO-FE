/**
 * 사용자 계정 탈퇴를 처리하는 모달 컴포넌트입니다.
 * 탈퇴 성공 시 전역 상태(로그인 상태, 모달)를 초기화하고 메인 화면으로 리다이렉트합니다.
 *
 * 로직은 다음과 같습니다.
 * - '/members'에 delete 요청을 합니다.
 * - 성공 시 Redux store의 'logout'을 실행해 인증 관련 상태를 초기화 합니다.
 * - 그 후 modal을 닫고 메인 페이지('/')로 리디렉션 합니다.
 */

import { logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteAccountApi } from "@/api/memberApi";
import DeleteConfirmModalLayout from "./DeleteConfirmModalLayout";

export default function DeleteAccountModal() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // 계정 삭제 함수
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const result = await deleteAccountApi();
            if (result.isSuccess) {
                dispatch(logout()); // 로그인 상태 초기화
                dispatch(closeModal());
                await navigate("/");
            } else {
                console.warn("회원 탈퇴에 실패했습니다.");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn(
                    "계정 삭제 실패",
                    err.response?.data || err.message
                );
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <DeleteConfirmModalLayout
            isLoading={isLoading}
            messageType="계정"
            onClick={() => void handleDelete()}
        />
    );
}
