import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { readFileSync } from 'fs';
import { JsonWebTokenError } from 'jsonwebtoken';
import { compare } from 'src/utils/hash';
import { UserEntity } from 'src/utils/services/user.entity';
import { UserService } from 'src/utils/services/user.service';

@Injectable()
export class AuthService {
  private readonly secrets: {
    privkey: Buffer;
    cert: Buffer;
  };

  private readonly secret: Buffer;

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
    /* this.secret = readFileSync(
      process.env.SSH_PRIVKEY || 'localhost-privkey.pem',
    ); */
    this.secrets = {
      privkey: readFileSync(process.env.SSH_PRIVKEY || 'localhost-privkey.pem'),
      cert: readFileSync(process.env.SSH_CERT || 'localhost-cert.pem'),
    };
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

  async login(user: any) {
    const payload = { username: user.login, sub: user.id };
    return await this.getTokens(payload);
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
        algorithms: ['RS512'],
        //secret: this.secret,
        secret: this.secrets.privkey,
        publicKey: this.secrets.cert,
      });
      return await this.getTokens({
        sub: payload['sub'],
        username: payload['username'],
      });
    } catch (err: unknown) {
      if (err instanceof JsonWebTokenError) {
        throw new ForbiddenException('Refresh token invalid');
      } else throw new Error(err['message'] || err);
    }
  }

  async getTokens(payload: object) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        algorithm: 'RS512',
        //secret: this.secret,
        privateKey: this.secrets.privkey,

        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      this.jwtService.signAsync(payload, {
        algorithm: 'RS512',
        //secret: this.secret,
        privateKey: this.secrets.privkey,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
