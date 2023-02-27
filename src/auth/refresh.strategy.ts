import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { Strategy, ExtractJwt } from 'passport-jwt';
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
    const user = await this.userService.get(payload.sub);
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    if (user?.refreshToken === refreshToken) {
      return { ...payload, refreshToken };
    }
    throw new ForbiddenException('refresh token in header invalid');
  }
}
