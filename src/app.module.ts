import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoggingInterceptor } from './logging/loggingInterceptor';
import { LoggerModule } from './logging/log.module';
import { AllExceptionsFilter } from './logging/allExceptionFilter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocModule } from './doc/doc.module';
import { MusicLibraryModule } from './musicLibrary/music.module';

@Module({
  imports: [AuthModule, LoggerModule, DocModule, MusicLibraryModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
