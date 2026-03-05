import FormButton from "../common/button/FormButton";

interface DeleteConfirmModalLayout {
    messageType: "계정" | "예약";
    onClick: () => void;
    isLoading: boolean;
}

export default function DeleteConfirmModalLayout({
    messageType,
    onClick,
    isLoading,
}: DeleteConfirmModalLayout) {
    const messageText = messageType === "계정" ? "탈퇴" : "삭제";
    return (
        <>
            <p className="body-t1 text-accent text-center">{messageText}안내</p>
            <div className="flex flex-col body-t3 text-center">
                <span>{messageText} 버튼 선택 시,</span>
                <span>
                    {messageType}은 {messageText}되며 복구되지 않습니다.
                </span>
            </div>
            <FormButton
                text={`${messageText}하기`}
                type="button"
                variant="accent"
                onClick={onClick}
                isLoading={isLoading}
            />
        </>
    );
}
