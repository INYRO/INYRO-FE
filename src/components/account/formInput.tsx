interface FormInputProps {
    label: string;
    isPlaceholder: boolean;
    isError: boolean;
    disabled: boolean;
}

export default function FormInput({
    label,
    isPlaceholder,
    isError,
    disabled,
}: FormInputProps) {
    return (
        <div className="flex flex-col gap-[3px]">
            {!isPlaceholder && <label className="btn-sub">{label}</label>}
            <input
                className={`h-[35px] ring-1  rounded-[10px] body-t6 px-[15px] bg-white ${isError ? "ring-accent" : "ring-background-200"} disabled:bg-background-200`}
                disabled={disabled}
                placeholder={isPlaceholder ? label : ""}
            />
        </div>
    );
}
