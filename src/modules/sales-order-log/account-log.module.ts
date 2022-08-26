import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONTROLLERS, DB_CONFIG, MODELS, PROVIDERS } from '@utils/global.util';
import microserviceConfigUtil, {
  KAFKA_CLIENT_NAME,
} from '../../utils/microservice.util';
import { LOG_CONNECTION_NAME } from '../connection-name';

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
    TypeOrmModule.forRoot(DB_CONFIG),
    TypeOrmModule.forFeature(MODELS, LOG_CONNECTION_NAME),
  ],
  controllers: CONTROLLERS,
  providers: PROVIDERS,
})
export class SalesOrderLogModule {}
