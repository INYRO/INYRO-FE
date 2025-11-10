import z from "zod";

export const registerSchema = z.object({
    sno: z.string(),
    password: z.string(),
});

export type RegisterType = z.infer<typeof registerSchema>;
