import axiosInstance from "@/api/axiosInstance";
import {
    changePasswordSchema,
    type ChangePasswordType,
} from "@/schema/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormButton from "../common/button/formButton";
import FormInput from "../input/formInput";

interface ChangePasswordResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
}

export default function ChangePasswordModal() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<ChangePasswordType>({
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
                await navigate("/");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn(
                    "비밀번호 변경 실패",
                    err.response?.data || err.message
                );
                // 에러 상태 코드별 처리 가능
            } else {
                console.warn("알 수 없는 에러", err);
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
                    <FormInput required {...register("password")} />
                    <FormInput required {...register("confirmPassword")} />
                </article>
                <FormButton
                    text="변경하기"
                    bgColor="bg-secondary"
                    isBorder={false}
                    textColor="text-white"
                    isLoading={isLoading}
                />
            </form>
        </>
    );
}
