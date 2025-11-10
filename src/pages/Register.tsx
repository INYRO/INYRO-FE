import axiosInstance from "@/api/axiosInstance";
import FormButton from "@/components/common/button/formButton";
import SubLogo from "@/components/common/logo/subLogo";
import FormInput from "@/components/input/formInput";
import type { LoginType } from "@/schema/loginSchema";
import { type RegisterType, registerSchema } from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface RegisterResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        sno: string;
        name: string;
        dept: string;
        registered: boolean;
    };
}

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
    });
    const onSubmit = handleSubmit(async (data: LoginType) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post<RegisterResponse>(
                "/auth/smul",
                data
            );
            console.log(response);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn("로그인 실패", err.response?.data || err.message);
                // 에러 상태 코드별 처리 가능
                if (err.response?.status === 401) {
                    // 인증 실패 처리
                    alert("학번 또는 비밀번호가 일치하지 않습니다.");
                }
            }
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div className="v-stack w-full gap-9">
            <SubLogo />
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
                <form className="ml-[5px] flex gap-[3px] items-center">
                    <input type="checkbox" className="size-2.5" />
                    <label className="body-t7">다음 약관에 동의합니다.</label>
                </form>
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
                    <form className="flex flex-col">
                        <div className="flex flex-col gap-3 mb-[9px]">
                            <FormInput
                                type="text"
                                {...register("sno")}
                                required
                            />
                            <FormInput
                                type="password"
                                {...register("password")}
                                required
                            />
                        </div>
                        <span className="body-t7 text-accent">
                            재학생 인증에 실패하였습니다. 정확한 정보를
                            입력해주세요.
                        </span>
                        <div className="mt-[9px]">
                            <FormButton
                                text="인증"
                                bgColor="bg-secondary"
                                isBorder={false}
                                textColor="text-white"
                            />
                        </div>
                    </form>
                </article>
            </section>
        </div>
    );
}
