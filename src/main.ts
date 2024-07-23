import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/web/app.module';
import cookieParser from 'cookie-parser';
import path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
