import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";

interface FormInputProps {
    error?: string;
    name: string;
}

const _Input = (
    { name, error, ...rest }: FormInputProps & InputHTMLAttributes<HTMLElement>,
    ref: ForwardedRef<HTMLInputElement>
) => {
    const transfName = (name: string) => {
        if (name === "sno") {
            return "학번";
        }
        if (name === "password") {
            return "비밀번호";
        }
    };
    return (
        <div className="flex flex-col">
            <label className="btn-sub mb-[3px]">{transfName(name)}</label>
            <input
                ref={ref}
                name={name}
                {...rest}
                className={`h-[35px] ring-1  rounded-[10px] body-t6 px-[15px] bg-white read-only:bg-background-200 ${error ? "ring-accent" : "ring-background-200"} `}
            />
            <span
                className={`${!error && "hidden"} flex flex-col body-t5 text-accent mt-[5px]`}
            >
                {error}
            </span>
        </div>
    );
};

export default forwardRef(_Input);
