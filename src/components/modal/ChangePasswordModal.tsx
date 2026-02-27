/*
 * 새 비밀번호를 입력받아 비밀번호를 변경하는 모달입니다.
 * 변경 성공 시 완료 안내 모달(CompleteModal)로 전환합니다.
 */

// ChangePasswordModal.tsx의 RHF의 errors 객체는 다음과 같이 생겼습니다.
/*
{
  // 1. newPassword 에러 (from Zod)
  newPassword: {
    message: "비밀번호는 4자 이상이어야 합니다.", // 우리가 화면에 띄우는 그 글자!
    type: "too_small",                         // Zod가 분류한 에러 종류
    ref: <input name="newPassword" ... />      // 실제 HTML input 태그 (자동 포커스용)
  },

  //  newPasswordConfirmation 에러 (from Zod)
  newPasswordConfirmation: {
    message: "비밀번호가 일치하지 않습니다.", 
    type: "custom", 
    ref: <input name="newPasswordConfirmation" ... /> 
  },

  // 서버 에러 (setError 수동 지정)
  root: {
    message: "기존 비밀번호와 동일하여 변경할 수 없습니다.",
    type: "server" 
  }
}
*/

import axiosInstance from "@/api/axiosInstance";
import {
    type ChangePasswordType,
    changePasswordSchema,
} from "@/schema/authSchema";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import type { ApiResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormButton from "../common/button/FormButton";
import FormInput from "../common/input/FormInput";

type ChangePasswordResponse = ApiResponse<string>;

export default function ChangePasswordModal() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ChangePasswordType>({
        resolver: zodResolver(changePasswordSchema),
    });
    const onSubmit = handleSubmit(async (data: ChangePasswordType) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post<ChangePasswordResponse>(
                "/auth/password/change",
                data
            );
            // POST 성공/실패 처리
            if (response.data.isSuccess) {
                dispatch(openModal({ modalType: "changeComplete" }));
            } else {
                setError("root", {
                    message: response.data.message || "인증에 실패했습니다.",
                });
            }
        } catch (err) {
            if (axios.isAxiosError<ChangePasswordResponse>(err)) {
                console.warn(
                    "비밀번호 변경 실패",
                    err.response?.data || err.message
                );
                setError("root", {
                    message:
                        err.response?.data.message ||
                        "요청 처리 중 오류가 발생했습니다.",
                });
            } else {
                console.warn("알 수 없는 에러", err);
                setError("root", {
                    message: "알 수 없는 오류가 발생했습니다.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <>
            <div className="flex items-end gap-[5px]">
                <span className="body-t2">비밀번호 변경</span>
                <span className="body-t3 text-background-300">
                    4자 이상 입력
                </span>
            </div>
            <form
                onSubmit={(e) => void onSubmit(e)}
                className="flex flex-col gap-[15px]"
            >
                <article className="flex flex-col gap-[5px]">
                    <FormInput
                        required
                        {...register("newPassword")}
                        error={errors.newPassword?.message}
                        label="새 비밀번호 입력"
                        type="password"
                        isPlaceholder
                    />
                    <FormInput
                        required
                        label="비밀번호 재확인"
                        {...register("newPasswordConfirmation")}
                        error={errors.newPasswordConfirmation?.message}
                        type="password"
                        isPlaceholder
                    />
                </article>
                <span
                    className={`${
                        errors.root?.message ? "flex" : "hidden"
                    } body-t5 text-accent`}
                >
                    {errors.root?.message}
                </span>
                <FormButton
                    text="변경하기"
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </>
    );
}
