import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import type { CreateDTO } from './dto/create.dto';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register({ email, name, password }: CreateDTO) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await this.userService.createUser({
      email,
      name,
      password: hashedPassword,
    });

    return { user: newUser };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const accessToken = this.jwtService.sign({
      sub: user.id,
    });

    return {
      accessToken,
    };
  }
}
