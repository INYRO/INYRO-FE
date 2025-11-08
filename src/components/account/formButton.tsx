interface LinkButtonProps {
    text: string;
    bgColor: string;
    textColor: string;
    isBorder: boolean;
}

export default function FormButton({
    text,
    bgColor,
    textColor,
    isBorder,
}: LinkButtonProps) {
    return (
        <button
            className={`text-center w-full py-2 rounded-[10px] ${isBorder && "border"} border-background-200 ${bgColor}`}
        >
            <span className={`btn-main ${textColor}`}>{text}</span>
        </button>
    );
}
