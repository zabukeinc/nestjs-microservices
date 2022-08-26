import { BaseConsumer } from '@base-module/infrastructure/consumers/base.consumer';
import { Controller } from '@nestjs/common';
import { PurchaseOrderLogService } from '@purchase-order-log-module/data/services/purchase-order-log.service';
import { KAFKA_BROKER } from '@utils/global.util';
import { Kafka } from 'kafkajs';
import { HopePurchaseOrderTopic } from './purchase-order.topic';

@Controller('purchase-order-log')
export class PurchaseOrderLogConsumer extends BaseConsumer {
  constructor(protected readonly service: PurchaseOrderLogService) {
    super(
      new Kafka({
        clientId: 'hope-log-purchase-order-service',
        brokers: [KAFKA_BROKER],
      }).consumer({
        groupId: 'hope-log-purchase-order-service',
      }),
    );
  }

  setTopics(): void {
    this.topics = [
      {
        topic: HopePurchaseOrderTopic.HOPE_PURCHASE_ORDER_TOPIC,
        execute: async (payload) => this.insert(payload),
      },
    ];
  }

  async insert(payload): Promise<void> {
    console.log(
      `[LOG-SERVICE-CONSUMER]=> CONSUME ${HopePurchaseOrderTopic.HOPE_PURCHASE_ORDER_TOPIC}`,
    );
    await this.service.save(payload);
  }
}
