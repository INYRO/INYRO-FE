/**
 * 실질 회원가입 완료 페이지입니다.
 *
 * 주요 로직 흐름은 다음과 같습니다.
 * - 1단계 회원가입(/register)에서 전달받은 location.state(userData)가 없거나 이미 가입된 유저라면 메인으로 쫓아냅니다.
 * - 전달받은 학번은 수정할 수 없도록(readOnly) 고정하고, 사용할 비밀번호를 입력받습니다.
 * - signupApi를 호출하여 최종 회원가입을 승인받습니다.
 * - 가입 성공 시 로그인 페이지(/login)로 리다이렉트합니다.
 *
 * 주요 에러 처리는 다음과 같습니다.
 * - API 통신 에러 및 가입 실패 에러는 handleApiError 유틸리티를 통해 RHF의 root 에러로 일괄 출력합니다.
 */

import FormButton from "@/components/common/button/FormButton";
import Logo from "@/components/common/logo/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
    type RegisterCompleteType,
    registerCompleteSchema,
} from "@/schema/authSchema";
import FormInput from "@/components/common/input/FormInput";
import { signupApi } from "@/api/authApi";
import { handleApiError } from "@/utils/errorHandler";

interface LocationState {
    userData?: {
        sno: string;
        name: string;
        dept: string;
        registered: boolean;
    };
}

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
            const result = await signupApi({
                password: data.password,
                sno: userData.sno,
                dept: userData.dept,
                name: userData.name,
                enrolled: true, // 1단계를 통과했으므로 재학생 인증됨
            });

            // 회원가입 실패 처리
            if (!result.isSuccess) {
                setError("root", {
                    message: result.message || "회원가입 실패",
                });
                return;
            }

            void navigate("/login");
        } catch (err) {
            handleApiError(err, setError, "회원가입 실패: 다시 시도해주세요.");
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
                        readOnly
                        defaultValue={userData.sno}
                        {...register("sno")}
                        required
                        label="학번"
                        error={errors.sno?.message}
                        isPlaceholder={false}
                    />
                    <FormInput
                        type="password"
                        required
                        label="새 비밀번호 입력"
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
                    <FormButton text="회원가입" isLoading={isLoading} />
                </article>
            </form>
        </div>
    );
}
