import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule } from '@nestjs/microservices';
import { MikroormModule as CustomModule } from './modules/mikroorm/mikroorm.module';
import microserviceConfigUtil, { KAFKA_CLIENT_NAME } from './utils/global.util';
@Module({
  imports: [
    MikroOrmModule.forRoot(),
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
    CustomModule,
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
