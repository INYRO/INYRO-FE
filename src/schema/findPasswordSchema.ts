import z from "zod";
import { passwordValidation, snoValidation } from "./common";

export const findPasswordSchema = z.object({
    sno: snoValidation,
    password: passwordValidation,
});

export type FindPasswordType = z.infer<typeof findPasswordSchema>;
