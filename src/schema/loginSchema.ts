import z from "zod";

export const loginSchema = z.object({
    sno: z.string(),
    password: z.string(),
});

export type LoginType = z.infer<typeof loginSchema>;
