import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const configUser = new DocumentBuilder()
    .setTitle('Users Module')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const submoduleUser = SwaggerModule.createDocument(app, configUser);
  SwaggerModule.setup('api', app, submoduleUser);

  const configUserAddress = new DocumentBuilder()
    .setTitle('Users Address Sub-Module')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const submoduleUserUserAddress = SwaggerModule.createDocument(
    app,
    configUserAddress,
  );
  SwaggerModule.setup('api', app, submoduleUserUserAddress);

  await app.listen(3001);
}
bootstrap();
