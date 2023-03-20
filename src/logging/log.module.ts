import { Module } from '@nestjs/common';
import { LoggerService } from './loggerService';
import { LoggingInterceptor } from './loggingInterceptor';

@Module({
  providers: [LoggerService, LoggingInterceptor],
  exports: [LoggerService, LoggingInterceptor],
})
export class LoggerModule {}
