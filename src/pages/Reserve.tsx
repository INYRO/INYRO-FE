import FormButton from "@/components/common/button/FormButton";
import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/customCalendar.css";
import { formatDate, formatToMonthYear } from "@/utils/utils";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/common/logo/Logo";

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

type FormValues = {
    time: string[];
};

interface AvailableTimesResponse {
    result: {
        available: Record<string, boolean>; // "09:00": true/false
    };
}

export default function Reserve() {
    const navigate = useNavigate();
    const [hasPickedDate, setHasPickedDate] = useState(false);

    // 전체 타임슬롯 (09:00~21:30)
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

    // RHF
    const { register, setValue, watch, handleSubmit } = useForm<FormValues>({
        defaultValues: { time: [] },
    });
    const selectedTimes = watch("time", []);

    // 날짜 / 가능시간 맵 / 로딩
    const [date, setDate] = useState<SelectedDate>(null);
    const [availableMap, setAvailableMap] = useState<Record<string, boolean>>(
        {}
    );
    const [loading, setLoading] = useState(false);

    // date를 항상 Date로 정규화
    const normalizedDate = useMemo(() => {
        const d = Array.isArray(date) ? date[0] : date;
        return d ?? null;
    }, [date]);

    // 날짜 바뀔 때마다 가능시간 조회
    useEffect(() => {
        const fetchAvailable = async () => {
            if (!normalizedDate) return;

            try {
                setLoading(true);
                const res = await axiosInstance.get<AvailableTimesResponse>(
                    "/reservations/available",
                    { params: { date: formatDate(normalizedDate) } }
                );
                setAvailableMap(res.data.result.available ?? {});
            } catch (e) {
                console.error("가능 시간 조회 실패:", e);
                setAvailableMap({});
            } finally {
                setLoading(false);
            }
        };
        void fetchAvailable();
    }, [normalizedDate]);

    // 오늘 이전 시각 막기
    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    const isPastTimeSlotToday = (time: string, selectedDate: Date) => {
        // time: "HH:mm"
        const [hh, mm] = time.split(":").map(Number);

        const slot = new Date(selectedDate);
        slot.setHours(hh, mm, 0, 0);

        const now = new Date();

        // 지금보다 이전이면 막기
        return slot < now;
    };

    const returnTimes = async (dateToReturn: Date, timesToReturn: string[]) => {
        if (timesToReturn.length === 0) return;

        await Promise.allSettled(
            timesToReturn.map((time) =>
                axiosInstance.post("/reservations/time/return", {
                    date: formatDate(dateToReturn),
                    time,
                })
            )
        );
    };

    const onSubmit = (data: FormValues) => {
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

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(55px,1fr))] gap-2">
                        {timeSlots.map((time) => {
                            const isSelected = selectedTimes.includes(time);

                            // availableMap[time] === true 일 때만 가능
                            const isAvailable = availableMap[time] === true;

                            // 오늘 이전 시간 막는 로직
                            const now = new Date();
                            const isToday = normalizedDate
                                ? isSameDay(normalizedDate, now)
                                : false;
                            const isPastTime = normalizedDate
                                ? isToday &&
                                  isPastTimeSlotToday(time, normalizedDate)
                                : false;

                            // 로딩 중이거나 오늘 또는 현재시간 이전이면 disabled
                            const isDisabled =
                                loading || !isAvailable || isPastTime;

                            return (
                                <button
                                    key={time}
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={() => {
                                        // 예외처리(비활성, 날짜없음)
                                        if (isDisabled) return;
                                        if (!normalizedDate) return;

                                        const prev = selectedTimes;
                                        const next = isSelected
                                            ? prev.filter((t) => t !== time)
                                            : [...prev, time];

                                        // optimistic UI
                                        setValue("time", next, {
                                            shouldValidate: true,
                                        });

                                        const url = isSelected
                                            ? "/reservations/time/return"
                                            : "/reservations/time";

                                        axiosInstance
                                            .post(url, {
                                                date: formatDate(
                                                    normalizedDate
                                                ),
                                                time,
                                            })
                                            .catch((error) => {
                                                console.error(
                                                    "예약 요청 실패:",
                                                    error
                                                );

                                                // 실패 시 정확한 롤백: 이전 상태로 복구
                                                setValue("time", prev, {
                                                    shouldValidate: true,
                                                });
                                            });
                                    }}
                                    className={`active:scale-[0.95] hover:bg-background-200 hover:border-none hover:text-inherit border rounded-[5px] body-t7 w-[55px] h-[25px] 
                  ${
                      isSelected
                          ? "bg-secondary text-white border-none"
                          : "border-background-200"
                  }
                  ${isDisabled ? "opacity-40 cursor-not-allowed" : ""} transition-all ease-in-out`}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                    <FormButton text="다음" type="submit" isLoading={loading} />
                </form>
            )}
        </div>
    );
}
