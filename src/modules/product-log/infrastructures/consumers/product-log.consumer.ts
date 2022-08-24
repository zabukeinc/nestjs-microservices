import { BaseConsumer } from '@base-module/infrastructure/consumers/base.consumer';
import { Controller } from '@nestjs/common';
import { ProductLogService } from '@product-log-module/data/services/product-log.service';
import { KAFKA_BROKER } from '@utils/global.util';
import { Kafka } from 'kafkajs';
import { HopeProductTopic } from './product.topic';

@Controller('product-log')
export class ProductLogConsumer extends BaseConsumer {
  constructor(protected readonly productLogService: ProductLogService) {
    super(
      new Kafka({
        clientId: 'hope-log-product-service',
        brokers: [KAFKA_BROKER],
      }).consumer({
        groupId: 'hope-log-product-service',
      }),
    );
  }

  setTopics(): void {
    this.topics = [
      {
        topic: HopeProductTopic.HOPE_PRODUCT_LOG,
        execute: async (payload) => this.insert(payload),
      },
    ];
  }

  async insert(payload): Promise<void> {
    console.log(
      `[LOG-SERVICE-CONSUMER]=> CONSUME ${HopeProductTopic.HOPE_PRODUCT_LOG}`,
    );
    await this.productLogService.save(payload);
  }
}
