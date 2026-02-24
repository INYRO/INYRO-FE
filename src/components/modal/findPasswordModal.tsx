import axiosInstance from "@/api/axiosInstance";
import { type FindPasswordType, findPasswordSchema } from "@/schema/authSchema";
import { login } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { closeModal, openModal } from "@/store/modalSlice";
import type { ApiResponse } from "@/types/api";
import type { RegisterResult } from "@/types/member";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormButton from "../common/button/FormButton";
import FormInput from "../common/input/FormInput";

type FindPasswordResponse = ApiResponse<RegisterResult>;

export default function FindPasswordModal() {
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
                dispatch(closeModal());
                dispatch(openModal({ modalType: "changePasswordReset" }));
                dispatch(
                    login({
                        sno: response.data.result.sno,
                        name: response.data.result.name,
                        dept: response.data.result.dept,
                    })
                );
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
                <FormButton text="인증" type="submit" isLoading={isLoading} />
            </form>
        </>
    );
}
