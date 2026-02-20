/*
 * Form의 submit을 담당하는 공용 버튼 컴포넌트 입니다.
 *
 * LinkButton과 동일한 디자인 방식(variant)를 공유합니다.
 *
 * 버튼의 추가 스타일 레이아웃인 variant는 'primary'와 'outline'으로 정의됩니다.
 * - 'primary'는 초록 색상과 흰색 텍스트를 사용하는 시그니처 버튼이며,
 * - 'outline'은 흰 배경에 검은색 글씨, border를 쓰는 secondary 버튼입니다.
 *
 * 버튼의 variant 기본값은 'primary'이며,
 * 처음에 정의된 commonStyle + variant + 추가 className으로 버튼의 스타일이 결정됩니다.
 *
 * FormButton은 다음과 같은 props를 받습니다.
 * - text: 버튼 속 글자
 * - variant: 버튼의 타입
 * - isLoading: 로딩 판별 boolean
 * - type: button의 HTML type('button', 'submit', 'reset' 타입을 받음)
 * - onClick: 클릭 이벤트
 * - className: 추가 className
 */

// 타입 정의
// 버튼 종류를 타입으로 정의
type ButtonVariant = "primary" | "outline";
// 버튼 Props 타입 정의
interface FormButtonProps {
    text: string;
    variant?: ButtonVariant;
    isLoading?: boolean;
    type?: "button" | "submit" | "reset"; // 폼 버튼의 필수 요소
    onClick?: () => void; // 클릭 이벤트
    className?: string;
}

// variant 별로 적용될 Tailwind 클래스 맵핑
const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-secondary text-white", // isBorder가 false였던 스타일
    outline: "bg-white text-black border border-background-200", // isBorder가 true였던 스타일
};

export default function FormButton({
    text,
    variant = "primary", // 기본값은 primary
    isLoading = false,
    type = "button", // 기본값은 submit
    onClick,
    className,
}: FormButtonProps) {
    // 공통 스타일 정의
    const commonStyle =
        "text-center w-full py-2 rounded-[10px] transition-all duration-150 ease-out hover:brightness-75 active:scale-[0.98]";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={`${commonStyle} ${variantStyles[variant]} ${isLoading ? "brightness-75" : ""} ${className ?? ""}`}
        >
            <span className="btn-main">{isLoading ? "로딩 중..." : text}</span>
        </button>
    );
}
