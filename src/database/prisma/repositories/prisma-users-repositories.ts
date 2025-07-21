import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/user/repositories/user-repository.interface';
import { PrismaService } from '../prisma.service';
import type { User } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
