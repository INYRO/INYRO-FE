// schema/common.ts (새 파일)
import z from "zod";

export const passwordValidation = z
    .string()
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다.")
    .regex(/^\S+$/, "공백은 사용할 수 없습니다.")
    .regex(
        /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{}\\:";',./?~`]+$/,
        "대/소문자, 숫자, 특수문자만 사용 가능합니다."
    )
    .regex(/^[^<>{}|;'"]+$/, "사용 불가능한 특수문자가 포함되어 있습니다.");

export const snoValidation = z.string().min(9, "학번은 숫자 9자리입니다.");
