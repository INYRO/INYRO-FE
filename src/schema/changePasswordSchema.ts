import z from "zod";

export const changePasswordSchema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
