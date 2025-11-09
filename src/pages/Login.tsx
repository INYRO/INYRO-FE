import FormButton from "@/components/common/button/formButton";
import LinkButton from "@/components/common/button/linkButton";
import MainLogo from "@/components/common/logo/mainLogo";
import FormInput from "@/components/input/formInput";
import { loginSchema, type LoginType } from "@/schema/loginSchema";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: null;
}

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = handleSubmit(async (data: LoginType) => {
        setIsLoading(true);
        try {
            // fetch-POST('/api/v1/auth/login', data) [데이터를 로그인 검증 API로 전송]
            const response = await fetch(
                "https://api.inyro.com/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = (await response.json()) as LoginResponse;
            console.log(result);
        } catch (err) {
            console.warn("로그인 실패", err);
        } finally {
            setIsLoading(false);
        }
    });

    const dispatch = useAppDispatch();

    const handleModalOpen = () => {
        dispatch(openModal("findPassword"));
    };
    return (
        <div className="v-stack w-full gap-10">
            <MainLogo />
            <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col">
                <article className="flex flex-col gap-2.5 mb-[15px]">
                    <FormInput type="text" {...register("sno")} required />
                    <FormInput
                        type="password"
                        {...register("password")}
                        required
                    />
                </article>
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
                onClick={handleModalOpen}
                className="-m-5 body-t6 underline underline-offset-2 cursor-pointer"
            >
                비밀번호 찾기
            </button>
        </div>
    );
}
