import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import FormButton from "../common/button/formButton";
import { useNavigate } from "react-router-dom";

export default function ReserveCompleteModal() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleClose = () => dispatch(closeModal());
    const handleSubmit = () => {
        void navigate("/mypage");
        void handleClose;
    };

    return (
        <>
            <div className="size-9 rounded-full bg-background-200 mx-auto" />
            <p className="body-t2 text-center">예약 되었습니다.</p>
            <form onSubmit={handleSubmit}>
                <FormButton
                    text="확인"
                    bgColor="bg-secondary"
                    textColor="text-white"
                    isBorder={true}
                />
            </form>
        </>
    );
}
