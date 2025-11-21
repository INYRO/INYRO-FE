import axiosInstance from "@/api/axiosInstance";
import FormButton from "@/components/common/button/formButton";
import LinkButton from "@/components/common/button/linkButton";
import MainLogo from "@/components/common/logo/mainLogo";
import FormInput from "@/components/input/formInput";
import { loginSchema, type LoginType } from "@/schema/loginSchema";
import { login } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import type { ApiResponse } from "@/types/api";
import type { LoginResult, MemberResult } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginResponse = ApiResponse<LoginResult>;
type MemberResponse = ApiResponse<MemberResult>;

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = handleSubmit(async (data: LoginType) => {
        setIsLoading(true);
        try {
            // fetch-POST('/api/v1/auth/login', data) [데이터를 로그인 검증 API로 전송]
            const response = await axiosInstance.post<LoginResponse>(
                "/auth/login",
                data
            );
            if (response.data.isSuccess && response.data.code === "200") {
                const accessToken = response.data.result.accessToken;
                localStorage.setItem("accessToken", accessToken);
                const user =
                    await axiosInstance.get<MemberResponse>("/members/my");
                dispatch(
                    login({
                        accessToken: accessToken || "",
                        sno: user.data.result.sno,
                        name: user.data.result.name,
                        dept: user.data.result.dept,
                    })
                );
                await navigate("/");
            }
        } catch (err) {
            if (axios.isAxiosError<LoginResponse>(err)) {
                console.warn("로그인 실패", err.response?.data || err.message);
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
                        {...register("sno")}
                        required
                        error={errors.sno?.message}
                        isPlaceholder={false}
                    />
                    <FormInput
                        type="password"
                        {...register("password")}
                        required
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
                        text="로그인"
                        bgColor="bg-secondary"
                        isBorder={false}
                        textColor="text-white"
                        isLoading={isLoading}
                    />
                    <LinkButton
                        text="회원가입"
                        bgColor="bg-white"
                        isBorder={true}
                        textColor="text-black"
                        url="/register"
                    />
                </article>
            </form>
            <button
                onClick={() => dispatch(openModal("findPassword"))}
                className="-m-5 body-t6 underline underline-offset-2 cursor-pointer"
            >
                비밀번호 찾기
            </button>
        </div>
    );
}
