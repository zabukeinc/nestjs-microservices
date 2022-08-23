import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONTROLLERS, MODELS, PROVIDERS } from '@utils/global.util';
import microserviceConfigUtil, {
  KAFKA_CLIENT_NAME,
} from '@utils/microservice.util';

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
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        // password: '',
        database: 'itmi-nestjs',
        entities: MODELS,
        synchronize: true,
        // name: HOPE_COMMAND_CONNECTION,
      }),
    }),
    TypeOrmModule.forFeature(MODELS),
  ],
  controllers: CONTROLLERS,
  providers: PROVIDERS,
})
export class ProductModule {}
