import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { readFileSync } from 'fs';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS512'],
      secretOrKey: readFileSync(
        process.env.SSH_PRIVKEY || 'localhost-privkey.pem',
      ),
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.login };
  }
}
