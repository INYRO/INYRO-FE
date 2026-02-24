import axiosInstance from "@/api/axiosInstance";
import FormButton from "@/components/common/button/FormButton";
import Logo from "@/components/common/logo/Logo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface LocationState {
    time: string[];
    date: string;
}

export default function ReserveComplete() {
    const location = useLocation();
    const state = location.state as LocationState | null;
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.authState.user);

    const [participantList, setParticipantList] = useState(user?.name);
    const [purpose, setPurpose] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state) return;
        setIsLoading(true);
        try {
            await axiosInstance.post("/reservations", {
                date: state.date,
                participantList,
                purpose,
                timeSlots: state.time,
            });
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(openModal({ modalType: "reserveComplete" }));
            setIsLoading(false);
        }
    };

    return (
        <div className="v-stack w-full gap-[35px]">
            <Logo variant="sub" />
            <form
                onSubmit={(e) => void handleSubmit(e)}
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
                                {state?.time[0]} ~{" "}
                                {state?.time[state.time.length - 1]}
                            </span>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        예약자 명단
                    </span>
                    <input
                        value={participantList}
                        onChange={(e) => setParticipantList(e.target.value)}
                        className="border rounded-[10px] h-[60px] bg-stroke border-background-200 body-t6 p-2"
                    ></input>
                </section>
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        사용 목적
                    </span>
                    <input
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="border rounded-[10px] h-[60px] bg-stroke border-background-200 body-t6 p-2"
                    />
                </section>
                <FormButton
                    text="예약하기"
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </div>
    );
}
