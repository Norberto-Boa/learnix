import { Injectable } from '@nestjs/common';
import { CreateDTO } from '../auth/dto/create.dto';
import { UsersRepository } from './repositories/user-repository.interface';
import type { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(data: CreateDTO) {
    const userAlreadyExist = await this.usersRepository.findByEmail(data.email);
    if (userAlreadyExist) {
      throw new Error('User already exists');
    }
    const user = await this.usersRepository.create(data);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    return user;
  }
}
