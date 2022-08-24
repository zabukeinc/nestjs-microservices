import { BaseLogEntity } from '@base-module/domain/entities/base-log.entity';
import { BaseLogProducer } from '@base-module/infrastructure/producers/base-log.producer';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENT_NAME } from '@utils/microservice.util';
import { lastValueFrom } from 'rxjs';
import { HopePurchaseOrderTopic } from './purchase-order.topic';

@Injectable()
export class PurchaseOrderProducer extends BaseLogProducer {
  constructor(@Inject(KAFKA_CLIENT_NAME) public client: ClientKafka) {
    super(client, Object.values(HopePurchaseOrderTopic));
  }

  async produceRequest(payload: BaseLogEntity): Promise<void> {
    lastValueFrom(
      this.client.send(
        HopePurchaseOrderTopic.HOPE_PURCHASE_ORDER_TOPIC,
        JSON.stringify(payload),
      ),
    );

    console.log(
      `[PRODUCE ACCOUNT LOGGER SEND] <==> [ACTION]:: ${payload.action} <==> [ENDPOINT]: ${payload.endpoint}`,
    );
  }
}
