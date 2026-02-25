/**
 * 비밀번호 찾기를 위한 재학생 인증 모달입니다.
 * 학교 학번으로 인증하며, 성공 시 임시 로그인 세션을 생성하고
 * 비밀번호 재설정하는 모달인 'ChangePasswordResetModal'로 스와핑합니다.
 */

import axiosInstance from "@/api/axiosInstance";
import { type FindPasswordType, findPasswordSchema } from "@/schema/authSchema";
import { login } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import type { ApiResponse } from "@/types/api";
import type { RegisterResult } from "@/types/member";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormButton from "../common/button/FormButton";
import FormInput from "../common/input/FormInput";

type FindPasswordResponse = ApiResponse<RegisterResult>;

export default function StudentVerificationModal() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FindPasswordType>({
        resolver: zodResolver(findPasswordSchema),
    });
    const onSubmit = handleSubmit(async (data: FindPasswordType) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post<FindPasswordResponse>(
                "/auth/smul",
                data
            );
            if (response.data.isSuccess) {
                dispatch(openModal({ modalType: "resetPasswordModal" }));
                dispatch(
                    login({
                        sno: response.data.result.sno,
                        name: response.data.result.name,
                        dept: response.data.result.dept,
                    })
                );
            } else {
                setError("root", {
                    message:
                        response.data.message || "학생 인증에 실패했습니다.",
                });
            }
        } catch (err) {
            if (axios.isAxiosError<FindPasswordResponse>(err)) {
                console.warn(
                    "비밀번호 찾기 실패",
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
                <span className="body-t2">비밀번호 찾기</span>
                <span className="body-t3 text-background-300">재학생 인증</span>
            </div>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={(e) => void onSubmit(e)}
            >
                <article className="flex flex-col gap-[5px]">
                    <FormInput
                        required
                        {...register("sno")}
                        error={errors.sno?.message}
                        type="text"
                        label="학번"
                        isPlaceholder
                    />
                    <FormInput
                        required
                        {...register("password")}
                        label="비밀번호"
                        error={errors.password?.message}
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
                <FormButton text="인증" type="submit" isLoading={isLoading} />
            </form>
        </>
    );
}
