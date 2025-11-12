import z from "zod";
import { passwordValidation } from "./common";

export const changePasswordSchema = z
    .object({
        password: passwordValidation,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "비밀번호가 일치하지 않습니다.",
    });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
