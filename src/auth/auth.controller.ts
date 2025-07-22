import { Controller, Post, UsePipes } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { LoginSchema } from './dto/login.dto';

@Controller('/auth')
export class authenticateController {
  constructor(private jwt: JwtService) {}
  @Post('/login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login() {
    const token = this.jwt.sign({
      sub: 'user-id',
    });

    return token;
  }
}
