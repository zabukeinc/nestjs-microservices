import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './utils/global.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const configTransaction = new DocumentBuilder()
    .setTitle('Transactions Module')
    .setVersion('1.0')
    .addTag('Transactions')
    .build();
  const submoduleTransaction = SwaggerModule.createDocument(app, configTransaction);
  SwaggerModule.setup('api', app, submoduleTransaction);

  await app.listen(PORT);
}
bootstrap();
