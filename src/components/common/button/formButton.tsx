interface LinkButtonProps {
    text: string;
    bgColor: string;
    textColor: string;
    isBorder: boolean;
    isLoading?: boolean;
}

export default function FormButton({
    text,
    bgColor,
    textColor,
    isBorder,
    isLoading = false,
}: LinkButtonProps) {
    return (
        <button
            className={`text-center w-full py-2 rounded-[10px] ${isBorder && "border"} border-background-200 ${bgColor} transition-all duration-150 ease-out hover:brightness-75 active:scale-[0.98]`}
            disabled={isLoading}
        >
            <span className={`btn-main ${textColor}`}>
                {isLoading ? "로딩 중..." : text}
            </span>
        </button>
    );
}
