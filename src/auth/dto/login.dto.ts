import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
