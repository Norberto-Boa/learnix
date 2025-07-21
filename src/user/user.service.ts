import { Injectable } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UsersRepository } from './repositories/user-repository.interface';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(data: CreateDTO) {
    const userAlreadyExist = await this.usersRepository.findByEmail(data.email);
    if (userAlreadyExist) {
      throw new Error('User already exists');
    }
    await this.usersRepository.create(data);

    return true;
  }
}
