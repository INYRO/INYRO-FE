import axiosInstance from "@/api/axiosInstance";
import FormButton from "@/components/common/button/formButton";
import LinkButton from "@/components/common/button/linkButton";
import Logo from "@/components/common/logo/Logo";
import FormInput from "@/components/input/formInput";
import { loginSchema, type LoginType } from "@/schema/loginSchema";
import { login, setAccessToken } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import type { ApiResponse } from "@/types/api";
import type { LoginResult, MemberResult } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, type Location } from "react-router-dom";

type LoginResponse = ApiResponse<LoginResult>;
type MemberResponse = ApiResponse<MemberResult>;

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = handleSubmit(async (form: LoginType) => {
        setIsLoading(true);
        try {
            /* 로그인 요청 */
            // fetch-POST('/api/v1/auth/login', data) [데이터를 로그인 검증 API로 전송]
            const loginRes = await axiosInstance.post<LoginResponse>(
                "/auth/login",
                form
            );

            // 로그인 요청 실패시 처리
            if (!loginRes.data.isSuccess) {
                throw new Error(loginRes.data.message || "로그인 실패");
            }

            // 로그인 응답에서 accessToken을 받아 Redux에 저장
            const accessToken = loginRes.data.result.accessToken;
            dispatch(setAccessToken(accessToken));

            /* 유저 정보 조회 */
            // 성공시에만 login 확정
            const userRes =
                await axiosInstance.get<MemberResponse>("/members/my");

            // 유저 정보 불러오기 실패시 처리
            if (!userRes.data.isSuccess) {
                throw new Error(userRes.data.message || "유저 정보 조회 실패");
            }

            // 성공시 redux store에 유저 데이터 저장
            dispatch(
                login({
                    sno: userRes.data.result.sno,
                    name: userRes.data.result.name,
                    dept: userRes.data.result.dept,
                })
            );

            // 원래 가려던 페이지로 복귀(없으면 "/"로)
            const from =
                (location.state as { from?: Location })?.from?.pathname || "/";
            void navigate(from, { replace: true });
        } catch (err) {
            /* 에러 처리 */
            if (axios.isAxiosError<LoginResponse>(err)) {
                setError("root", {
                    message:
                        err.response?.data.message ||
                        "요청 처리 중 오류가 발생했습니다.",
                });
            } else {
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
            <Logo />
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
                        variant="outline"
                        url="/register"
                    />
                </article>
            </form>

            <button
                onClick={() =>
                    dispatch(openModal({ modalType: "findPassword" }))
                }
                className="-m-5 body-t6 underline underline-offset-2 cursor-pointer"
            >
                비밀번호 찾기
            </button>
        </div>
    );
}
