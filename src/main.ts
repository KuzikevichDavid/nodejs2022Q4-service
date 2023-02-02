import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(+process.env.PORT || 4000);
}
bootstrap();
