import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import FormButton from "../common/button/FormButton";
import { useNavigate } from "react-router-dom";
import checkIcon from "@/assets/icons/icon_check.svg";

export default function ReserveCompleteModal() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void navigate("/mypage");
        dispatch(closeModal());
    };

    return (
        <>
            <img
                src={checkIcon}
                alt="check"
                className="size-9 rounded-full bg-background-200 mx-auto"
            />
            <p className="body-t2 text-center">예약 되었습니다.</p>
            <form onSubmit={onSubmit}>
                <FormButton text="확인" type="submit" />
            </form>
        </>
    );
}
