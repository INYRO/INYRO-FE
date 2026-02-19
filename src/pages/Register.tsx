import axiosInstance from "@/api/axiosInstance";
import FormButton from "@/components/common/button/formButton";
import Logo from "@/components/common/logo/Logo";
import FormInput from "@/components/input/formInput";
import { type RegisterType, registerSchema } from "@/schema/registerSchema";
import type { ApiResponse } from "@/types/api";
import type { RegisterResult } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type RegisterResponse = ApiResponse<RegisterResult>;

export default function Register() {
    const [agreed, setAgreed] = useState(false);
    const [agreedError, setAgreedError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = handleSubmit(async (data: RegisterType) => {
        if (!agreed) {
            setAgreedError("약관에 동의해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.post<RegisterResponse>(
                "/auth/smul",
                data
            );

            // 회원가입 실패 처리
            if (!response.data.isSuccess) {
                setError("root", {
                    message:
                        response.data.message || "회원가입에 실패했습니다.",
                });
                return;
            }

            // 회원가입 성공 처리
            if (response.data.isSuccess) {
                void navigate("/register/complete", {
                    state: {
                        userData: response.data.result,
                    },
                });
            }
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
        <div className="v-stack w-full gap-9">
            <Logo variant="sub" />
            <section className="flex flex-col gap-[5px]">
                <article className="bg-background-200 rounded-[10px] p-5 flex flex-col gap-2">
                    <h2 className="underline underline-offset-4 body-t1">
                        약관
                    </h2>
                    <div className="flex flex-col body-t5">
                        <span>
                            본 서비스는 회원가입 시 재학생 인증을 위하여,
                        </span>
                        <span>사용자가 입력한 학번과 비밀번호를 기반으로</span>
                        <span>
                            상명대학교 샘물포털시스템에 대리 로그인 과정을
                            진행합니다.
                        </span>
                    </div>
                    <ol className="list-decimal list-inside body-t7">
                        <li className="flex flex-col">
                            <span>
                                대리 로그인은 오직 재학생 인증 목적에 한하여
                                사용되며,
                            </span>
                            <span>인증 완료 후 별도로 저장되지 않습니다.</span>
                        </li>
                        <li className="flex flex-col">
                            <span>사용자는 본 서비스의 회원가입 절차가</span>
                            <span>
                                이러한 대리 로그인 과정을 포함함을 이해하고 이에
                                동의합니다.
                            </span>
                        </li>
                    </ol>
                </article>
                <article className="flex gap-1">
                    <form className="ml-[5px] flex gap-[3px] items-center">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => {
                                setAgreed(e.target.checked);
                                setAgreedError("");
                            }}
                            className="size-2.5"
                        />
                        <label className="body-t7">
                            다음 약관에 동의합니다.
                        </label>
                    </form>
                    <span
                        className={`${agreedError !== "" ? "flex" : "hidden"} body-t5 text-accent`}
                    >
                        {agreedError}
                    </span>
                </article>
            </section>
            <section>
                <article className="bg-background-200 rounded-[10px] p-5 flex flex-col gap-2">
                    <h2 className="underline underline-offset-4 body-t1">
                        재학생 인증
                    </h2>
                    <div className="flex flex-col">
                        <span className="body-t7">
                            샘물 통합로그인을 통해 재학생 인증을 진행합니다.
                        </span>
                        <span className="body-t5">
                            상명대학교 샘물포털시스템 학번/비밀번호
                        </span>
                    </div>
                    <form
                        onSubmit={(e) => void onSubmit(e)}
                        className="flex flex-col"
                    >
                        <div className="flex flex-col gap-3 mb-[9px]">
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
                        </div>
                        <span
                            className={`${errors.root?.message ? "flex" : "hidden"} body-t5 text-accent`}
                        >
                            {errors.root?.message}
                        </span>
                        <div className="mt-[9px]">
                            <FormButton
                                text="회원가입"
                                bgColor="bg-secondary"
                                isBorder={false}
                                textColor="text-white"
                                isLoading={isLoading}
                            />
                        </div>
                    </form>
                </article>
            </section>
        </div>
    );
}
