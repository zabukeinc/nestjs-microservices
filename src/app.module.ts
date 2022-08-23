import { HttpModule, HttpService } from '@nestjs/axios';
import { Inject, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule } from '@nestjs/microservices';
import { UserModule } from '@user-module/user.module';
import microserviceConfigUtil, {
  KAFKA_CLIENT_NAME,
} from '@user-module/utils/microservice.config.util';
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

    // Sub Modules
    UserModule,
  ],
})
export class AppModule {
  constructor(@Inject(KAFKA_CLIENT_NAME) private clientKafka: ClientProxy) {
    console.log('App Loaded');
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.clientKafka.connect();
  }
}
