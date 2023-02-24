import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_ANONYMOUS_KEY } from './anonymous.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    return super.handleRequest(err, user, info, context, status);
  }

  canActivate(context: ExecutionContext) {
    const isAllow = this.reflector.getAllAndOverride<boolean>(
      IS_ANONYMOUS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isAllow) {
      return true;
    }
    return super.canActivate(context);
  }
}
