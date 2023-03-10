import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { DocModule } from './doc.module';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(+process.env.PORT || 4000);

  const options = {
    key: readFileSync(process.env.SSH_PRIVKEY || 'localhost-privkey.pem'),
    cert: readFileSync(process.env.SSH_CERT || 'localhost-cert.pem'),
  };

  const doc = await NestFactory.create(DocModule, {
    httpsOptions: options,
    cors: true,
  });
  await doc.listen(+process.env.DOC_PORT || 4001);
}
bootstrap();
