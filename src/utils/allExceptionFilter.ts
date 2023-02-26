import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from 'src/logs/loggerService';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest()
    const reqBody = req.body;
    const path = httpAdapter.getRequestUrl(req)
    const method = httpAdapter.getRequestMethod(req)

    let message: string = 'Internal server error';
    let httpStatus: number;
    if (exception instanceof HttpException){
      message = exception.message;
      httpStatus = exception.getStatus()
    } else { 
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody = {
      statusCode: httpStatus,
      message: message,
    };

    this.logger.error({message, method, path, reqBody, exception});

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
