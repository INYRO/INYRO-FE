import { Link } from "react-router-dom";

interface LinkButtonProps {
    text: string;
    url: string;
    bgColor: string;
    textColor: string;
    isBorder: boolean;
}

export default function LinkButton({
    text,
    bgColor,
    url,
    textColor,
    isBorder,
}: LinkButtonProps) {
    return (
        <Link
            className={`text-center w-full py-2 rounded-[10px] ${isBorder && "border"} border-background-200 ${bgColor}`}
            to={url}
        >
            <span className={`btn-main ${textColor}`}>{text}</span>
        </Link>
    );
}
