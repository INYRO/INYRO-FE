import SubLogo from "@/components/common/logo/subLogo";
import { useLocation } from "react-router-dom";

interface LocationState {
    data: {
        time: string[];
    };
}

export default function ReserveComplete() {
    const location = useLocation();
    const state = location.state as LocationState | null;
    return (
        <div className="v-stack w-full gap-[35px]">
            <SubLogo />
            <div className="flex flex-col gap-[30px]">
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        대표 예약자 정보
                    </span>
                    <div className="flex flex-col gap-[5px]">
                        <span className="body-t1">김수뭉</span>
                        <div className="flex body-t3 gap-1">
                            <span className="text-background-300">일정</span>
                            <span>10.4 (토)</span>
                            <span>|</span>
                            <span>12:00 ~ 14:00</span>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        예약자 명단
                    </span>
                    <input />
                </section>
                <section className="flex flex-col gap-[15px]">
                    <span className="body-t1 underline underline-offset-2">
                        사용 목적
                    </span>
                    <input />
                </section>
            </div>
        </div>
    );
}
