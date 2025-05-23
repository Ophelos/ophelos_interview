import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
       email: z.string().email(),
       password: z.string(), 
    }),
});

export type LoginInput = z.infer<typeof loginSchema>;
