/**
 * 프로젝트 전반에서 사용되는 공통 FormInput 컴포넌트입니다.
 * React Hook Form과의 원활한 연동을 위해 forwardRef를 사용하여 구현했습니다.
 *
 * 주요 기능은 다음과 같습니다.
 * - 기본 input 태그의 모든 속성(type, placeholder, disabled, onChange 등)을 그대로 상속받아 사용할 수 있습니다.
 * - label: 부모 컴포넌트에서 직접 라벨 텍스트를 주입받아 사용합니다.
 * - error: 검증 로직(Zod 등)에서 발생한 에러 메시지를 전달받아, 붉은 테두리와 함께 에러 문구를 하단에 렌더링합니다.
 * - isPlaceholder: true일 경우 label 텍스트를 placeholder로 활용하며 상단의 라벨은 숨김 처리합니다.
 */

import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";

// InputHTMLAttributes를 상속받아 기본 input 속성들(type, placeholder 등)을 모두 지원함
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    isPlaceholder?: boolean;
}

const _Input = (
    { isPlaceholder, label, name, error, className, ...rest }: FormInputProps,
    ref: ForwardedRef<HTMLInputElement>
) => {
    return (
        <div className="flex flex-col">
            {label && !isPlaceholder && (
                <label htmlFor={name} className="flex btn-sub mb-[3px]">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={name}
                name={name}
                placeholder={isPlaceholder ? label : rest.placeholder}
                {...rest}
                className={`h-[35px] ring-1  rounded-[10px] body-t7 px-[15px] bg-white read-only:bg-background-200 ${error ? "ring-accent" : "ring-background-200"} ${className || ""} `}
            />
            {error && (
                <span className="flex flex-col body-t5 text-accent mt-[5px]">
                    {error}
                </span>
            )}
        </div>
    );
};

export default forwardRef(_Input);
