import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import FormButton from "../common/button/formButton";

export default function ChangeReservationModal() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className="flex items-end gap-[5px]">
                <span className="body-t2">예약 변경</span>
            </div>
            <form className="flex flex-col gap-[15px]">
                <article className="flex flex-col gap-[5px]">
                    <input />
                    <input />
                </article>
                <FormButton
                    text="변경하기"
                    bgColor="bg-secondary"
                    isBorder={false}
                    textColor="text-white"
                    isLoading={isLoading}
                />
            </form>
        </>
    );
}
