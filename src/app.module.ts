import { HttpModule } from '@nestjs/axios';
import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule } from '@nestjs/microservices';
import { ProductModule } from '@product-module/product.module';
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

    // Sub Modules
    ProductModule,
  ],
})
export class AppModule {
  constructor(@Inject(KAFKA_CLIENT_NAME) private clientKafka: ClientProxy) {
    console.log('App Loaded');
  }

  async onApplicationBootstrap(): Promise<void> {
    // await this.clientKafka.connect();
  }
}
