interface FormInputProps {
    label: string;
    isPlaceholder: boolean;
    isError: boolean;
}

export default function FormInput({
    label,
    isPlaceholder,
    isError,
}: FormInputProps) {
    return (
        <div className="flex flex-col gap-[3px]">
            {!isPlaceholder && <label className="btn-sub">{label}</label>}
            <input
                className="h-[35px] ring-1 ring-background-200 rounded-[10px] body-t6 px-[15px]"
                placeholder={isPlaceholder ? label : ""}
            />
        </div>
    );
}
