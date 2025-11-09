import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";

interface FormInputProps {
    error?: string;
    name: string;
}

const _Input = (
    { name, error, ...rest }: FormInputProps & InputHTMLAttributes<HTMLElement>,
    ref: ForwardedRef<HTMLInputElement>
) => {
    return (
        <div className="flex flex-col gap-[3px]">
            <label className="btn-sub">{name}</label>
            <input
                ref={ref}
                name={name}
                {...rest}
                className={`h-[35px] ring-1  rounded-[10px] body-t6 px-[15px] bg-white disabled:bg-background-200 ${error ? "ring-accent" : "ring-background-200"} `}
            />
        </div>
    );
};

export default forwardRef(_Input);
