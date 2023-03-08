import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ServerResponse } from 'http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoggerService } from './loggerService';

export interface Response<T> {
  data: T;
}

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const reqBody = req.body;
    const path = httpAdapter.getRequestUrl(req);
    const method = httpAdapter.getRequestMethod(req);
    return next.handle().pipe(
      map((data) => {
        let responseData = data;
        if (data instanceof ServerResponse) {
          responseData = '{file stream}';
        }
        const res = ctx.getResponse();
        this.logger.log({
          method,
          path,
          reqBody,
          statusCode: res.statusCode,
          response: responseData,
        });
        return data;
      }),
      catchError((err) => {
        this.logger.warn({
          method,
          path,
          reqBody,
          statusCode: err.status,
          response: err.response,
        });
        return throwError(() => err);
      }),
    );
  }
}
