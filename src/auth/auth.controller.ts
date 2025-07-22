import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { LoginSchema, type LoginDTO } from './dto/login.dto';
import { CreateSchema, type CreateDTO } from './dto/create.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class authenticateController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() body: LoginDTO) {
    const { email, password } = body;

    const { accessToken } = await this.authService.login(email, password);

    return {
      access_token: accessToken,
    };
  }

  @Post('/register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateSchema))
  async register(@Body() body: CreateDTO) {
    const { name, email, password } = body;

    const { user } = await this.authService.register({
      name,
      email,
      password,
    });

    return {
      user: user.id,
      message: 'User registered successfully',
    };
  }
}
