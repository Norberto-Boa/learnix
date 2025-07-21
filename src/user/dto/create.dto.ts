import { email, z } from 'zod';

export const CreateSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export type CreateDTO = z.infer<typeof CreateSchema>;
