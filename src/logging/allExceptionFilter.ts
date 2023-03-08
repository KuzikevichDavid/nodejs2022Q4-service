import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from 'src/logging/loggerService';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const reqBody = req.body;
    const path = httpAdapter.getRequestUrl(req);
    const method = httpAdapter.getRequestMethod(req);

    if (exception instanceof HttpException) {
      this.logger.warn({
        message: exception.message,
        method,
        path,
        reqBody,
        exception: exception.getResponse(),
      });
      httpAdapter.reply(
        ctx.getResponse(),
        exception.getResponse(),
        exception.getStatus(),
      );
    } else {
      const message = 'Internal server error';
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      const responseBody = {
        statusCode: httpStatus,
        message: message,
      };

      this.logger.error({
        message,
        method,
        path,
        reqBody,
        exception: { message: exception['message'], stack: exception['stack'] },
      });
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
}
