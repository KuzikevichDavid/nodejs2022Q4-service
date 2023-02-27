import { ForbiddenException, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { JsonWebTokenError } from 'jsonwebtoken';
import { compare } from 'src/utils/hash';
import { UserEntity } from 'src/utils/services/user.entity';
import { UserService } from 'src/utils/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
  }

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

  async login(username: string, pass: string) {
    const user = await this.usersService.get({ login: username });
    if (!user || !(await compare(pass, user.password))) {
      throw new ForbiddenException('login or password are incorrect');
    }
    const payload = { username: user.login, sub: user.id };
    const tokens = await this.getTokens(payload);
    user.refreshToken = tokens.refreshToken;
    this.usersService.save(user);
    return tokens;
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

  async refresh(refreshToken: string) {
    try {
      const payload: object = this.jwtService.verify(refreshToken, {
        secret: process.env.SSH_CERT,
      });

      const user = await this.usersService.get(payload['sub']);
      if (refreshToken !== user.refreshToken)
        throw new UnauthorizedException('Refresh token in body invalid');
      const tokens = await this.getTokens({
        sub: payload['sub'],
        username: payload['username'],
      });
      user.refreshToken = tokens.refreshToken;
      this.usersService.save(user);
      return tokens;
    } catch (err: unknown) {
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Refresh token in body invalid');
      } else throw new Error(err['message'] || err);
    }
  }

  private async getTokens(payload: object) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SSH_CERT,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    })
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.SSH_CERT,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    })

    return {
      accessToken,
      refreshToken,
    };
  }
}
