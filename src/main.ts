import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { DocModule } from './doc.module';
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
    logger.error(error.message, error.stack, origin);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('unhandledRejection', reason);
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
