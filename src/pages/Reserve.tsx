import FormButton from "@/components/common/button/formButton";
import SubLogo from "@/components/common/logo/subLogo";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/customCalendar.css";
import type { _ } from "node_modules/tailwindcss/dist/colors-b_6i0Oi7";
import { formatToMonthYear } from "@/utils/utils";

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

export default function Reserve() {
    const [date, setDate] = useState<SelectedDate>(new Date());

    return (
        <div className="v-stack w-full gap-[35px]">
            <SubLogo />
            <Calendar
                formatDay={(_, date) =>
                    date.toLocaleString("en", { day: "numeric" })
                }
                onChange={setDate}
                locale="ko-KR"
                value={date}
                formatMonthYear={(_, date) => formatToMonthYear(date)}
            />
            <form className="flex flex-col gap-[30px]">
                <form className="grid w-full grid-cols-4 *:border *:rounded-[5px] *:border-background-200 body-t7 gap-[5px] *:w-[55px] *:h-[25px] *:place-self-center">
                    <button>09:30</button>
                    <button>10:00</button>
                    <button>10:30</button>
                    <button>11:00</button>
                    <button>11:30</button>
                </form>
                <FormButton
                    text="다음"
                    textColor="text-white"
                    bgColor="bg-secondary"
                    isBorder={false}
                />
            </form>
        </div>
    );
}
