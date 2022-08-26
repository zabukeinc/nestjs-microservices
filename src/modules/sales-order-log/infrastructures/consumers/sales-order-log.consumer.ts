import { BaseConsumer } from '@base-module/infrastructure/consumers/base.consumer';
import { Controller } from '@nestjs/common';
import { SalesOrderLogService } from '@sales-order-log-module/data/services/sales-order-log.service';
import { KAFKA_BROKER } from '@utils/global.util';
import { Kafka } from 'kafkajs';
import { HopeSalesOrderTopic } from './sales-order.topic';

@Controller('sales-order-log')
export class SalesOrderLogConsumer extends BaseConsumer {
  constructor(protected readonly service: SalesOrderLogService) {
    super(
      new Kafka({
        clientId: 'hope-log-sales-order-service',
        brokers: [KAFKA_BROKER],
      }).consumer({
        groupId: 'hope-log-sales-order-service',
      }),
    );
  }

  setTopics(): void {
    this.topics = [
      {
        topic: HopeSalesOrderTopic.HOPE_SALES_ORDER_TOPIC,
        execute: async (payload) => this.insert(payload),
      },
    ];
  }

  async insert(payload): Promise<void> {
    console.log(
      `[LOG-SERVICE-CONSUMER]=> CONSUME ${HopeSalesOrderTopic.HOPE_SALES_ORDER_TOPIC}`,
    );
    await this.service.save(payload);
  }
}
