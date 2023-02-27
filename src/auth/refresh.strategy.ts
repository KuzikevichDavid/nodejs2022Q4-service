import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { NotFound } from 'src/utils/errors/notFound.error';
import { UserService } from 'src/utils/services/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: readFileSync(process.env.SSH_CERT || 'localhost-cert.pem'),
      algorithms: ['RS512'],
    });
  }

  async validate(req: Request, payload: any) {
    try {
      const user = await this.userService.get(payload.sub);
      const refreshToken = req
        .get('Authorization')
        .replace('Bearer', '')
        .trim();
      if (user?.refreshToken === refreshToken) {
        return { ...payload, refreshToken };
      }
    } catch (err) {
      if (err instanceof NotFound) {
        throw new ForbiddenException('refresh token in header invalid');
      }
      throw err;
    }
    throw new ForbiddenException('refresh token in header invalid');
  }
}
