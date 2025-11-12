import axiosInstance from "@/api/axiosInstance";
import FormButton from "@/components/common/button/formButton";
import MainLogo from "@/components/common/logo/mainLogo";
import FormInput from "@/components/input/formInput";
import {
    registerCompleteSchema,
    type RegisterCompleteType,
} from "@/schema/registerCompleteSchema";
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

interface RegisterResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
}

export default function RegisterComplete() {
    const location = useLocation();
    const state = location.state as LocationState;
    const userData = state?.userData;
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<RegisterCompleteType>({
        resolver: zodResolver(registerCompleteSchema),
    });
    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post<RegisterResponse>(
                "/auth/signup",
                {
                    ...data,
                    dept: userData!.dept,
                    name: userData!.name,
                    enrolled: true,
                }
            );
            console.log(response);
            if (response.data.isSuccess) {
                await navigate("/login");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn(
                    "회원가입 실패",
                    err.response?.data || err.message
                );
                // 에러 상태 코드별 처리 가능
            }
        } finally {
            setIsLoading(false);
        }
    });

    useEffect(() => {
        if (!userData || userData.registered) {
            void navigate("/", { replace: true });
        }
    }, [userData, navigate]);

    return (
        <div className="v-stack w-full gap-10">
            <MainLogo />
            <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col">
                <article className="flex flex-col gap-2.5 mb-[15px]">
                    <FormInput
                        type="text"
                        readOnly
                        {...register("sno")}
                        value={userData!.sno}
                        required
                    />
                    <FormInput type="text" required {...register("password")} />
                </article>
                <span className="body-t5 text-accent">
                    비밀번호는 필수 입력입니다.
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
