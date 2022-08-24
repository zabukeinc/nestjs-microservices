import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './utils/global.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const configUser = new DocumentBuilder()
    .setTitle('Hope Module')
    .setVersion('1.0')
    .addTag('Hope Module ITMI-Core')
    .build();
  const submoduleUser = SwaggerModule.createDocument(app, configUser);
  SwaggerModule.setup('api', app, submoduleUser);

  await app.listen(PORT);
}
bootstrap();
