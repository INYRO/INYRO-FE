/*
 * Reserve 컴포넌트는 사용자가 동아리방 예약 날짜와 시간을 선택하는 메인 페이지입니다.
 *
 * 주요 로직 흐름은 다음과 같습니다.
 * - 날짜 선택: react-calendar를 사용하여 날짜를 선택하며, 과거 날짜는 비활성화 처리됩니다.
 * - 가능 시간 조회: 날짜가 선택되거나 변경될 때마다 API를 호출하여 해당 날짜의 30분 단위 예약 가능 상태를 불러옵니다.
 * - 시간 선점: 클릭한 시간을 화면에 반영하고, 백엔드에 선택/반납 API를 비동기로 요청합니다. 통신 실패 시 원래 상태로 롤백됩니다.
 * - 시간 반납: 사용자가 같은 날짜를 다시 클릭하면, 해당 시간을 서버에 반납하여 상태를 동기화합니다.
 */

import FormButton from "@/components/common/button/FormButton";
import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/customCalendar.css";
import { formatDate, formatToMonthYear } from "@/utils/utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/common/logo/Logo";
import {
    getAvailableTimesApi,
    returnTimeApi,
    selectTimeApi,
} from "@/api/reservationApi";
import TimeSlotGrid from "@/components/reserve/TimeSlotGrid";

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

type FormValues = {
    time: string[];
};

export default function Reserve() {
    // 기본 변수 선언
    const navigate = useNavigate();
    // 유저의 날짜 선택 완료 상태 (true/false)
    // 기본은 false이며, 날짜를 선택했을 때 timeTable을 보여줌
    const [hasPickedDate, setHasPickedDate] = useState(false);
    // RHF 선언
    const { register, setValue, watch, handleSubmit } = useForm<FormValues>({
        // FormValues에 time의 기본값이 빈 배열([])임을 정의
        // setValue("time", [...prev, time])를 사용하기 때문에,
        // ...undefined가 되면 안돼서 빈 배열임을 명시함
        defaultValues: { time: [] },
    });
    // time 배열 상태를 실시간으로 watch함
    // useState처럼 값이 변할 때마다 컴포넌트를 리렌더링하여 UI를 업데이트함
    const selectedTimes = watch("time", []);
    // reactCalendar가 관리하는 날짜 데이터 (원시값)
    const [date, setDate] = useState<SelectedDate>(null);
    // 서버에서 받아온 예약 가능 여부 객체 (예: {"09:00": true})
    const [availableMap, setAvailableMap] = useState<Record<string, boolean>>(
        {}
    );
    // 로딩
    const [loading, setLoading] = useState(false);

    // 전체 타임슬롯 생성 (09:00~21:30)
    // ["09:00", "09:30", ..., "21:30"]를 생성함
    // useMemo를 사용할 시 첫 랜더시 한 번만 해당 계산을 실행하여 react memory에 저장한 후
    // 재 랜더링 시 캐싱된 값을 불러와 사용함
    // useMemo가 없을 시 timeSlots을 새로 만드는데, 이는 다른 데이터라고 react가 인식하게됨,
    // 때문에, useMemo를 사용해 메모리에 저장된 값을 불러오는 방식으로 참조 무결성을 지킴
    const timeSlots = useMemo(() => {
        const slots: string[] = [];
        for (let hour = 9; hour < 22; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const h = String(hour).padStart(2, "0");
                const m = String(minute).padStart(2, "0");
                slots.push(`${h}:${m}`);
            }
        }
        return slots;
    }, []);

    // date를 항상 Date로 정규화
    // react-calendar는 날짜 하나만 선택하면 Date 객체를 주고, 범위를 선택하면 [Date, Date] 배열을 줌(안고르면 null)
    // 예약은 한 날짜의 여러 시간 범위에서 진행되므로, 해당 함수가 필요함
    // 따라서 배열일 경우 [0]만, 아닌경우 date를 반환하는 함수임
    // useMemo의 의존성배열인 date는 date 값이 바뀌면 캐싱을 초기화하고 재계산을 진행함
    const normalizedDate = useMemo(() => {
        const d = Array.isArray(date) ? date[0] : date;
        return d ?? null;
    }, [date]);

    // 날짜 바뀔 때마다 가능시간 조회
    // normalizedDate가 바뀔 때마다 진행
    useEffect(() => {
        const fetchAvailable = async () => {
            if (!normalizedDate) return;
            try {
                setLoading(true);
                const available = await getAvailableTimesApi(
                    formatDate(normalizedDate)
                );
                setAvailableMap(available ?? {});
            } catch (e) {
                console.error("가능 시간 조회 실패:", e);
                setAvailableMap({}); // 에러 발생 시 map 객체 초기화
            } finally {
                setLoading(false);
            }
        };
        void fetchAvailable();
    }, [normalizedDate]);

    // 여러 시간대 반납 로직
    // 유저가 다른 날짜로 UI를 변경했을 때, 점유했던 시간대를 반납함
    // Promise.allSettled는 다중 요청을 병렬로 처리하게 해주고, 모두 끝날때까지 기다림
    // Promise.all의 경우는 다중 요청 중 하나만 에러가 나도 전체를 fail로 처리하기 때문
    // 최종적으로는 다음의 로직을 따릅니다.
    // timesToReturn 배열에 담긴 시간들을 하나씩 반납 API 요청으로 바꿉니다.
    const returnTimes = async (dateToReturn: Date, timesToReturn: string[]) => {
        if (timesToReturn.length === 0) return;
        await Promise.allSettled(
            timesToReturn.map((time) =>
                returnTimeApi({ date: formatDate(dateToReturn), time })
            )
        );
    };

    /*
     * 특정 시간대를 클릭했을 때 선택/해제를 처리하는 함수입니다.
     *
     * 주요 로직은 다음과 같습니다.
     * - API 응답 전 UI를 미리 반영해 UX를 향상시켰습니다.
     * - 그 후, API 통신을 통해 선택 시간에 점유/반납 처리를 진행합니다.
     * - 에러 발생 시 해당 선택 시간을 강제로 반납합니다.
     */
    const handleTimeToggle = async (time: string, isSelected: boolean) => {
        if (!normalizedDate) return;

        // 실패 시 복구를 위해 현재 상태를 미리 저장
        const prev = selectedTimes;
        // 새로운 상태값 계산(선택 해제 시 필터링, 선택 시 추가)
        const next = isSelected
            ? prev.filter((t) => t !== time)
            : [...prev, time];

        // 서버와 통신하기 전에 UI 업데이트(미리 성공했다 치고 색칠하려고 함)
        setValue("time", next, { shouldValidate: true });

        try {
            const payload = { date: formatDate(normalizedDate), time };
            if (isSelected) {
                await returnTimeApi(payload); // 선택 해제(반납) API
            } else {
                await selectTimeApi(payload); // 선택(찜) API
            }
        } catch (error) {
            console.error("예약/반납 요청 실패:", error);
            // 서버 통신 실패 시 UI 롤백
            setValue("time", prev, { shouldValidate: true });
        }
    };

    /*
     * 최종 예약으로 넘어가는 onSubmit 함수입니다.
     * 선택된 시간 데이터를 state에 담아 완료 페이지로 전달합니다.
     */
    const onSubmit = (data: FormValues) => {
        if (!normalizedDate) return;
        // 텅 빈 채로 '다음' 누르는 것 방어
        if (data.time.length === 0) {
            return;
        }

        void navigate("/reserve/complete", {
            state: { time: data.time, date: formatDate(normalizedDate) },
        });
    };

    return (
        <div className="v-stack w-full gap-[35px]">
            <Logo variant="sub" />
            <Calendar
                calendarType="gregory"
                formatDay={(_, d) => d.toLocaleString("en", { day: "numeric" })}
                onChange={(nextDate) => {
                    // 날짜 바꾸기 전에, 이전 날짜에 잡아둔 시간들 반납
                    if (normalizedDate && selectedTimes.length > 0) {
                        void returnTimes(normalizedDate, selectedTimes);
                    }
                    setDate(nextDate);
                    setValue("time", [], { shouldValidate: true }); // 날짜 바뀌면 선택 초기화
                    setHasPickedDate(true);
                }}
                locale="ko-KR"
                value={date}
                formatMonthYear={(_, d) => formatToMonthYear(d)}
                tileDisabled={({ date, view }) => {
                    if (view !== "month") return false;

                    // 오늘 00:00 기준으로 "오늘 이전" 막기
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const d = new Date(date);
                    d.setHours(0, 0, 0, 0);

                    return d < today;
                }}
            />
            {hasPickedDate && (
                <form
                    className="flex flex-col gap-[30px]"
                    onSubmit={(e) => void handleSubmit(onSubmit)(e)}
                >
                    <input
                        type="hidden"
                        {...register("time", { required: true })}
                    />
                    <TimeSlotGrid
                        timeSlots={timeSlots}
                        selectedTimes={selectedTimes}
                        availableMap={availableMap}
                        loading={loading}
                        normalizedDate={normalizedDate}
                        onTimeToggle={handleTimeToggle}
                    />
                    <FormButton text="다음" type="submit" isLoading={loading} />
                </form>
            )}
        </div>
    );
}
