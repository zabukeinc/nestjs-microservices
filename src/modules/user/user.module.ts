import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONTROLLERS, MODELS, PROVIDERS } from 'src/utils/global.util';
import { USER_COMMAND_CONNECTION } from './utils/connection-name.util';
import microserviceConfigUtil, {
  KAFKA_CLIENT_NAME,
} from './utils/microservice.config.util';
import { DATABASE_CONFIGURATION } from 'src/utils/global.util';

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
    TypeOrmModule.forRoot(DATABASE_CONFIGURATION),
    TypeOrmModule.forFeature(MODELS, USER_COMMAND_CONNECTION),
  ],
  controllers: CONTROLLERS,
  providers: PROVIDERS,
})
export class UserModule {}
