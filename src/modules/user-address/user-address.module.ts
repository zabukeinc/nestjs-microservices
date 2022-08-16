import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONTROLLERS, MODELS, PROVIDERS } from 'src/utils/global.util';
import { USER_COMMAND_CONNECTION } from '../user/utils/connection-name.util';
import microserviceConfigUtil, {
  KAFKA_CLIENT_NAME,
} from '../user/utils/microservice.config.util';

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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: process.env.MYSQL_PASSWORD,
      database: 'itmi-nestjs',
      entities: MODELS,
      synchronize: true,
      name: USER_COMMAND_CONNECTION,
    }),
    TypeOrmModule.forFeature(MODELS, USER_COMMAND_CONNECTION),
  ],
  controllers: CONTROLLERS,
  providers: PROVIDERS,
})
export class UserAddressModule {}
