import z from "zod";
import { passwordValidation, snoValidation } from "./common";

export const registerCompleteSchema = z.object({
    sno: snoValidation,
    password: passwordValidation,
});

export type RegisterCompleteType = z.infer<typeof registerCompleteSchema>;
