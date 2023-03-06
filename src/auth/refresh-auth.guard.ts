import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const refreshToken: string = req.body?.refreshToken;
    if (!refreshToken || refreshToken.length === 0)
      throw new UnauthorizedException('no refreshToken in body or it emty');
    return true;
  }
}
