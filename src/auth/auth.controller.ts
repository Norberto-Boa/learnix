import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { LoginSchema, type LoginDTO } from './dto/login.dto';
import { UsersRepository } from 'src/user/repositories/user-repository.interface';

@Controller('/auth')
export class authenticateController {
  constructor(
    private jwt: JwtService,
    private usersRepository: UsersRepository,
  ) {}
  @Post('/login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() body: LoginDTO) {
    const { email, password } = body;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwt.sign({
      sub: user.id,
    });

    return {
      access_token: accessToken,
    };
  }
}
