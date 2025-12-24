import { Link } from "react-router-dom";

interface LinkButtonProps {
    text: string;
    url: string;
    bgColor: string;
    textColor: string;
    isBorder: boolean;
    className?: string;
    fullWidth?: boolean;
}

export default function LinkButton({
    text,
    bgColor,
    url,
    textColor,
    isBorder,
    className,
    fullWidth = true,
}: LinkButtonProps) {
    const base = fullWidth
        ? "text-center w-full py-2 rounded-[10px]"
        : "rounded-[10px] flex items-center justify-center text-center";

    return (
        <Link
            to={url}
            className={`${base} ${isBorder ? "border" : ""} border-background-200 ${bgColor} ${className ?? ""}`}
        >
            <span className={`btn-main ${textColor}`}>{text}</span>
        </Link>
    );
}
