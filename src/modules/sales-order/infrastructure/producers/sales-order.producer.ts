import { BaseLogEntity } from '@base-module/domain/entities/base-log.entity';
import { BaseLogProducer } from '@base-module/infrastructure/producers/base-log.producer';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENT_NAME } from '@utils/microservice.util';
import { lastValueFrom } from 'rxjs';
import { HopeSalesOrderTopic } from './sales-order.topic';

@Injectable()
export class SalesOrderProducer extends BaseLogProducer {
  constructor(@Inject(KAFKA_CLIENT_NAME) public client: ClientKafka) {
    super(client, Object.values(HopeSalesOrderTopic));
  }

  async produceRequest(payload: BaseLogEntity): Promise<void> {
    lastValueFrom(
      this.client.send(
        HopeSalesOrderTopic.HOPE_SALES_ORDER_TOPIC,
        JSON.stringify(payload),
      ),
    );

    console.log(
      `[PRODUCE SALES ORDER LOGGER SEND] <==> [ACTION]:: ${payload.action} <==> [ENDPOINT]: ${payload.endpoint}`,
    );
  }
}
