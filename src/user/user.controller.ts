import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateDTO, CreateSchema } from '../auth/dto/create.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateSchema))
  async register(@Body() body: CreateDTO) {
    const { name, email, password } = body;

    const result = await this.userService.createUser({
      name,
      email,
      password,
    });

    if (!result) {
      throw new Error('User registration failed');
    }
  }
}
