import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/web/app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('QMess')
    .setDescription('Description API application QMess')
    .setVersion('1.0.0')
    .addTag('QMess')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();
