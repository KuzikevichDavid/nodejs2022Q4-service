import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { exit } from 'process';
import { AppModule } from './app.module';
import { LoggerService } from './logging/loggerService';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  const logger = app.get(LoggerService);
  app.useLogger(logger);

  process.on('uncaughtException', (error, origin) => {
    logger.errorSync(error.message, error.stack, origin);
    exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.errorSync('unhandledRejection', reason, promise);
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(+process.env.PORT || 4000);
}
bootstrap();
