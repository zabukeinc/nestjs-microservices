import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import microserviceConfigUtil, {
  KAFKA_CLIENT_NAME,
} from '../../utils/microservice.util';
import { PRODUCT_LOG_CONNECTION_NAME } from './utils/product-log-connection.util';
import {
  PRODUCT_CONTROLLERS,
  PRODUCT_DB_CONFIG,
  PRODUCT_MODELS,
  PRODUCT_PROVIDERS,
} from './utils/product-log.util';

@Module({
  imports: [
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
    TypeOrmModule.forFeature(PRODUCT_MODELS, PRODUCT_LOG_CONNECTION_NAME),
  ],
  controllers: PRODUCT_CONTROLLERS,
  providers: PRODUCT_PROVIDERS,
})
export class ProductLogModule {}
