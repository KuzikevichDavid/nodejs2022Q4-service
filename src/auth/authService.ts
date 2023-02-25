import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { compare } from 'src/utils/hash';
import { UserEntity } from 'src/utils/services/user.entity';
import { UserService } from 'src/utils/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.get({ login: username });
    if (user && (await compare(pass, user.password))) {
      return instanceToPlain(user);
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(login: string, password: string) {
    const user = await this.usersService.get({ login });
    if (!user) {
      return this.usersService.create({
        login,
        password,
      });
    }
    return user;
  }
}
