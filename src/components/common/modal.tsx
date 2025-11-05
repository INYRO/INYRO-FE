import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";

export default function Modal() {
    const dispatch = useAppDispatch();
    const { isOpen, modalType } = useAppSelector((state) => state.modal);
    const handleClose = () => dispatch(closeModal());

    if (!isOpen) return null;

    return <div>{modalType === "login" && <></>}</div>;
}
