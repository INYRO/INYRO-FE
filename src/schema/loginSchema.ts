import z from "zod";
import { snoValidation, passwordValidation } from "./common";

export const loginSchema = z.object({
    sno: snoValidation,
    password: passwordValidation,
});

export type LoginType = z.infer<typeof loginSchema>;
