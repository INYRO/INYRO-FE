import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import NeedLoginModal from "../modal/findPasswordModal";

export default function ModalLayout() {
    const dispatch = useAppDispatch();
    const { isOpen, modalType } = useAppSelector((state) => state.modal);
    const handleClose = () => dispatch(closeModal());

    if (!isOpen) return null;

    return (
        <div
            onClick={handleClose}
            className="z-10 absolute w-full h-full top-0 flex items-center justify-center bg-black/20"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="z-20 w-[250px] flex flex-col p-5 bg-white gap-[15px] rounded-[10px]"
            >
                {modalType === "findPassword" && <NeedLoginModal />}
            </div>
        </div>
    );
}
