/**
 * ReserveComplete는 예약자 정보 및 목적을 입력하고 예약을 확정하는 페이지입니다.
 *
 * 주요 로직 흐름은 다음과 같습니다.
 * - 1단계(Reserve)에서 전달받은 location.state(날짜, 시간 배열)가 없으면 이전 페이지로 쫓아냅니다.
 * - React Hook Form과 Zod를 사용하여 예약자 명단과 사용 목적을 검증합니다.
 * - createReservationApi를 호출하여 예약을 확정합니다.
 * - 성공 시에만 'reserveComplete' 모달을 띄웁니다.
 *
 * RHF의 handleSubmit이 만든 onSubmit 함수는 브라우저가 멋대로 새로고침되는 걸 막기 위해 이벤트 객체(e)를 꼭 받아야 합니다.
 * e.preventDefault()를 내부적으로 실행하기 때문입니다.
 */

import { createReservationApi } from "@/api/reservationApi";
import FormButton from "@/components/common/button/FormButton";
import FormTextarea from "@/components/common/input/FormTextarea";
import Logo from "@/components/common/logo/Logo";
import {
    type ReserveCompleteType,
    reserveCompleteSchema,
} from "@/schema/reservationSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import { handleApiError } from "@/utils/errorHandler";
import { calculateEndTime } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
    time: string[];
    date: string;
}

export default function ReserveComplete() {
    const location = useLocation();
    const state = location.state as LocationState | null;
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.authState.user);

    // 초기값 세팅 (user?.name이 undefined일 수 있으므로 빈 문자열 fallback)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ReserveCompleteType>({
        resolver: zodResolver(reserveCompleteSchema),
        // 초기값 세팅
        defaultValues: {
            participantList: user?.name ?? "",
            purpose: "",
        },
    });

    // state나 시간이 없으면 예약 첫 화면으로 강제 이동
    useEffect(() => {
        if (!state || !state.time || state.time.length === 0) {
            void navigate("/", { replace: true });
        }
    }, [state, navigate]);

    // 첫 렌더에서도 state 없으면 아예 렌더 중단 (크래시 방지)
    if (!state || !state.time || state.time.length === 0) return null;

    const startTime = state.time[0];
    const endTime = calculateEndTime(state.time[state.time.length - 1]);

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        try {
            const result = await createReservationApi({
                date: state.date,
                participantList: data.participantList,
                purpose: data.purpose,
                timeSlots: state.time,
            });
            if (result.isSuccess) {
                dispatch(openModal({ modalType: "reserveComplete" }));
            } else {
                setError("root", {
                    message: result.message || "예약에 실패했습니다.",
                });
            }
        } catch (error) {
            handleApiError(
                error,
                setError,
                "예약 처리 중 오류가 발생했습니다."
            );
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div className="v-stack w-full gap-[35px]">
            <Logo variant="sub" />
            <form
                onSubmit={(e) => void onSubmit(e)}
                className="flex flex-col gap-[30px]"
            >
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        대표 예약자 정보
                    </span>
                    <div className="flex flex-col gap-[5px]">
                        <span className="body-t1">{user?.name}</span>
                        <div className="flex body-t3 gap-1">
                            <span className="text-background-300">일정</span>
                            <span>{state?.date}</span>
                            <span>|</span>
                            <span>
                                {startTime} ~ {endTime}
                            </span>
                        </div>
                    </div>
                </section>
                <FormTextarea
                    label="예약자 명단"
                    error={errors.participantList?.message}
                    placeholder="예: 홍길동, 가나디, ..."
                    {...register("participantList")}
                />
                <FormTextarea
                    label="사용 목적"
                    error={errors.purpose?.message}
                    placeholder="예: 스터디 목적..."
                    {...register("purpose")}
                />
                {/* Root 에러 (API 통신 실패 등) */}
                <div>
                    {errors.root?.message && (
                        <span className="body-t5 text-accent">
                            {errors.root.message}
                        </span>
                    )}
                </div>
                <FormButton
                    text="예약하기"
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </div>
    );
}
