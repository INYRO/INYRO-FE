import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import ChangePasswordModal from "./changePasswordModal";
import DeleteAccountModal from "./deleteAccountModal";
import FindPasswordModal from "./findPasswordModal";
import ReserveCompleteModal from "./reserveCompleteModal";
import ChangePasswordResetModal from "./changePasswordResetModal";
import DeleteReservationModal from "./deleteReservationModa";
import ChangeReservationModal from "./changeReservationModal";
import ChangeCompleteModal from "./changeCompleteModal";

export default function ModalLayout() {
    const dispatch = useAppDispatch();
    const { isOpen, modalType, reservationId, reservationDate } =
        useAppSelector((state) => state.modal);
    const handleClose = () => dispatch(closeModal());

    if (!isOpen) return null;

    return (
        <div
            onClick={handleClose}
            className="z-10 absolute w-full h-full top-0 flex items-center justify-center bg-black/20 animate-fade-in-out"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="z-20 w-[280px] flex flex-col p-5 bg-white gap-[15px] rounded-[10px]"
            >
                {modalType === "findPassword" && <FindPasswordModal />}
                {modalType === "changePassword" && <ChangePasswordModal />}
                {modalType === "deleteAccount" && <DeleteAccountModal />}
                {modalType === "reserveComplete" && <ReserveCompleteModal />}
                {modalType === "changeComplete" && <ChangeCompleteModal />}
                {modalType === "changePasswordReset" && (
                    <ChangePasswordResetModal />
                )}
                {modalType === "deleteReservation" && (
                    <DeleteReservationModal
                        reservationId={reservationId ?? undefined}
                    />
                )}
                {modalType === "changeReservation" && (
                    <ChangeReservationModal
                        reservationId={reservationId ?? undefined}
                        reservationDate={reservationDate ?? undefined}
                    />
                )}
            </div>
        </div>
    );
}
