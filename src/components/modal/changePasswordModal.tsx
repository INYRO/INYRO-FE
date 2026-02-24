import axiosInstance from "@/api/axiosInstance";
import {
    type ChangePasswordType,
    changePasswordSchema,
} from "@/schema/authSchema";
import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
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
            if (response.data.isSuccess) {
                dispatch(closeModal());
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
                    className={`${errors.root?.message ? "flex" : "hidden"} body-t5 text-accent`}
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
