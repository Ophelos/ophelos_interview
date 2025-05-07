import { z } from 'zod';

export const createStatementSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/)
      .transform((val) => parseInt(val, 10)),
    name: z.string(),
  }),
});

export type CreateStatementInput = z.infer<typeof createStatementSchema>;