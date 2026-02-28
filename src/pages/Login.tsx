/**
 * 사용자 로그인을 페이지입니다.
 *
 * 주요 로직은 다음과 같습니다.
 * - React Hook Form과 Zod를 사용하여 FormInput에 입력한 학번과 비밀번호 입력값을 검증합니다.
 * - loginApi를 호출하여 AT(액세스 토큰(accessToken))을 발급받고 Redux에 저장합니다.
 * - 토큰 발급에 성공하면 getMyInfoApi를 호출하여 유저 상세 정보를 가져와 Redux에 저장합니다.
 * - 모든 인증 과정이 완료되면, 사용자가 원래 접근하려던 페이지(또는 메인 화면)로 리다이렉트합니다.
 *
 * 에러 처리는 다음과 같습니다.
 * - Early Return 패턴을 사용하여 실패 시 로직을 빠르게 종료합니다.
 * - API 통신 에러 및 401(인증 실패) 에러는 handleApiError 유틸리티를 통해 RHF의 root 에러로 화면에 출력합니다.
 *
 * 에러 처리에 관해서 throw new error로 catch문에 넘기지 않은 이유는,
 * catch로 들어가는 err은 axios server error에 해당하며,
 * 그 외 error들은 유저 개인의 과실의 error기 때문에, if문 안에서 처리합니다.
 */

import { loginApi } from "@/api/authApi";
import { getMyInfoApi } from "@/api/memberApi";
import FormButton from "@/components/common/button/FormButton";
import LinkButton from "@/components/common/button/LinkButton";
import FormInput from "@/components/common/input/FormInput";
import Logo from "@/components/common/logo/Logo";
import { type LoginType, loginSchema } from "@/schema/authSchema";
import { setAccessToken, login } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import { handleApiError } from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

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
            const loginRes = await loginApi(form);

            // 로그인 요청 실패시 처리
            if (!loginRes.isSuccess) {
                console.warn("로그인에 실패했습니다.");
                setError("root", {
                    message: loginRes.message || "로그인에 실패했습니다.",
                });
            }

            // 로그인 응답에서 accessToken을 받아 Redux에 저장
            const accessToken = loginRes.result.accessToken;
            dispatch(setAccessToken(accessToken));

            /* 유저 정보 조회 */
            // 성공시에만 login 확정
            const userRes = await getMyInfoApi();

            // 유저 정보 불러오기 실패시 처리
            if (!userRes.isSuccess) {
                console.warn("유저 정보 조회에 실패했습니다.");
                setError("root", {
                    message:
                        userRes.message || "유저 정보 조회에 실패했습니다.",
                });
            }

            // 성공시 redux store에 유저 데이터 저장
            dispatch(
                login({
                    sno: userRes.result.sno,
                    name: userRes.result.name,
                    dept: userRes.result.dept,
                })
            );
            // 원래 가려던 페이지로 복귀(없으면 "/"로)
            const from =
                (location.state as { from?: Location })?.from?.pathname || "/";
            void navigate(from, { replace: true });
        } catch (err) {
            handleApiError(err, setError, "로그인 실패: 다시 시도해주세요.");
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
                        label="학번"
                        isPlaceholder={false}
                    />
                    <FormInput
                        type="password"
                        label="비밀번호"
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
                        type="submit"
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
                    dispatch(
                        openModal({ modalType: "studentVerificationModal" })
                    )
                }
                className="-m-5 body-t6 underline underline-offset-2 cursor-pointer"
            >
                비밀번호 찾기
            </button>
        </div>
    );
}
