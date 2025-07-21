import type { Prisma, User } from '@prisma/client';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: Prisma.UserCreateInput): Promise<void>;
}
