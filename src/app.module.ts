import { AccountLogModule } from '@account-log-module/account-log.module';
import { AdjustmentLogModule } from '@adjustment-log-module/adjustment-log.module';
import { InvoiceLogModule } from '@invoice-log-module/invoice-log.module';
import { HttpModule } from '@nestjs/axios';
import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule } from '@nestjs/microservices';
import { ProductLogModule } from '@product-log-module/product-log.module';
import { PurchaseOrderLogModule } from '@purchase-order-log-module/purchase-order-log.module';
import { SalesOrderLogModule } from '@sales-order-log-module/account-log.module';
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
    ProductLogModule,
    AccountLogModule,
    AdjustmentLogModule,
    PurchaseOrderLogModule,
    SalesOrderLogModule,
    InvoiceLogModule,
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
