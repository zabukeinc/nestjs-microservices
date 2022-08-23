import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import microserviceConfigUtil, {
  KAFKA_CLIENT_NAME,
} from '@utils/microservice.util';
import { PRODUCT_COMMAND_CONNECTION } from './utils/product.connection';
import {
  PRODUCT_CONTROLLERS,
  PRODUCT_DB_CONFIG,
  PRODUCT_MODELS,
  PRODUCT_PROVIDERS,
} from './utils/product.util';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [microserviceConfigUtil],
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: KAFKA_CLIENT_NAME,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) =>
          configService.get('kafkaClientConfig'),
        inject: [ConfigService],
      },
    ]),
    TypeOrmModule.forRoot(PRODUCT_DB_CONFIG),
    TypeOrmModule.forFeature(PRODUCT_MODELS, PRODUCT_COMMAND_CONNECTION),
  ],
  controllers: PRODUCT_CONTROLLERS,
  providers: PRODUCT_PROVIDERS,
})
export class ProductModule {}
