import z from "zod";
import { passwordValidation } from "./common";

export const changePasswordSchema = z
    .object({
        newPassword: passwordValidation,
        newPasswordConfirmation: z.string(),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
        message: "비밀번호가 일치하지 않습니다.",
    });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
