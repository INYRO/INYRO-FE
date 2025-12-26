import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";

interface FormInputProps {
    error?: string;
    name: string;
    isPlaceholder: boolean;
}

const _Input = (
    {
        isPlaceholder,
        name,
        error,
        ...rest
    }: FormInputProps & InputHTMLAttributes<HTMLElement>,
    ref: ForwardedRef<HTMLInputElement>
) => {
    const transfName = (name: string) => {
        if (name === "sno") {
            return "학번";
        }
        if (name === "password") {
            return "비밀번호";
        }
        if (name === "newPassword") {
            return "새 비밀번호 입력";
        }
        if (name === "newPasswordConfirmation") {
            return "비밀번호 재확인";
        }
        return name;
    };
    return (
        <div className="flex flex-col">
            <label
                className={`${isPlaceholder ? "hidden" : "flex"} btn-sub mb-[3px]`}
            >
                {transfName(name)}
            </label>
            <input
                ref={ref}
                name={name}
                {...rest}
                placeholder={isPlaceholder ? transfName(name) : ""}
                className={`h-[35px] ring-1  rounded-[10px] body-t6 px-[15px] bg-white read-only:bg-background-200 ${error ? "ring-accent" : "ring-background-200"} `}
            />
            <span
                className={`${error ? "flex" : "hidden"} flex-col body-t5 text-accent mt-[5px]`}
            >
                {error}
            </span>
        </div>
    );
};

export default forwardRef(_Input);
