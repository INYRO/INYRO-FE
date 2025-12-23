import axiosInstance from "@/api/axiosInstance";
import FormButton from "@/components/common/button/formButton";
import MainLogo from "@/components/common/logo/mainLogo";
import FormInput from "@/components/input/formInput";
import {
    registerCompleteSchema,
    type RegisterCompleteType,
} from "@/schema/registerCompleteSchema";
import type { ApiResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
    userData?: {
        sno: string;
        name: string;
        dept: string;
        registered: boolean;
    };
}

type RegisterResponse = ApiResponse<string>;

export default function RegisterComplete() {
    const location = useLocation();
    const state = location.state as LocationState | null;
    const userData = state?.userData;

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterCompleteType>({
        resolver: zodResolver(registerCompleteSchema),
    });

    useEffect(() => {
        if (!userData || userData.registered) {
            void navigate("/", { replace: true });
        }
    }, [userData, navigate]);

    // 첫 렌더에서도 userData 없으면 아예 렌더 중단 (크래시 방지)
    if (!userData || userData.registered) {
        return null;
    }

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post<RegisterResponse>(
                "/auth/signup",
                {
                    ...data,
                    sno: userData.sno,
                    dept: userData.dept,
                    name: userData.name,
                    enrolled: true,
                }
            );

            // 회원가입 실패 처리
            if (!response.data.isSuccess) {
                setError("root", {
                    message: response.data.message || "회원가입 실패",
                });
                return;
            }

            void navigate("/login");
        } catch (err) {
            if (axios.isAxiosError<RegisterResponse>(err)) {
                console.warn(
                    "회원가입 실패",
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
        <div className="v-stack w-full gap-10">
            <MainLogo />
            <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col">
                <article className="flex flex-col gap-2.5 mb-[15px]">
                    <FormInput
                        type="text"
                        readOnly
                        {...register("sno")}
                        value={userData.sno}
                        required
                        error={errors.sno?.message}
                        isPlaceholder={false}
                    />
                    <FormInput
                        type="password"
                        required
                        {...register("password")}
                        error={errors.password?.message}
                        isPlaceholder={false}
                    />
                </article>
                <span
                    className={`${errors.root?.message ? "flex" : "hidden"} body-t5 text-accent`}
                >
                    {errors.root?.message}
                </span>
                <article className="flex flex-col gap-[7px] mt-[15px]">
                    <FormButton
                        text="회원가입"
                        bgColor="bg-secondary"
                        isBorder={false}
                        textColor="text-white"
                        isLoading={isLoading}
                    />
                </article>
            </form>
        </div>
    );
}
