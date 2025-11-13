import z from "zod";
import { passwordValidation, snoValidation } from "./common";

export const registerSchema = z.object({
    sno: snoValidation,
    password: passwordValidation,
});

export type RegisterType = z.infer<typeof registerSchema>;
