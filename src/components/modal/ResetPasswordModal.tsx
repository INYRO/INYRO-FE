/**
 * 학생 인증을 마친 유저의 비밀번호를 초기화하는 모달입니다.
 * Redux store에 저장된 유저 정보 중 학번(sno)를 이용해 API를 호출하며,
 * 성공 시 완료 모달(CompleteModal)로 전환됩니다.
 */

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormButton from "../common/button/FormButton";
import FormInput from "../common/input/FormInput";
import {
    type ChangePasswordType,
    changePasswordSchema,
} from "@/schema/authSchema";
import { resetPasswordApi, type ResetPasswordResponse } from "@/api/authApi";

export default function ResetPasswordModal() {
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
    const user = useAppSelector((state) => state.authState.user);

    const onSubmit = handleSubmit(async (data: ChangePasswordType) => {
        if (!user) return;
        try {
            setIsLoading(true);
            const result = await resetPasswordApi({
                sno: user.sno,
                newPassword: data.newPassword,
                newPasswordConfirmation: data.newPasswordConfirmation,
            });

            if (result.isSuccess) {
                dispatch(openModal({ modalType: "changeComplete" }));
            } else {
                console.warn("비밀번호 재설정에 실패했습니다.");
                setError("root", {
                    message:
                        result.message || "비밀번호 재설정에 실패했습니다.",
                });
            }
        } catch (err) {
            if (axios.isAxiosError<ResetPasswordResponse>(err)) {
                console.warn(
                    "비밀번호 재설정 실패",
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
                <span className="body-t2">비밀번호 재설정</span>
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
                        type="password"
                        label="새 비밀번호 입력"
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
