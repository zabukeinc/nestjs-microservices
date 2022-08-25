import { AdjustmentLogService } from '@adjustment-log-module/data/services/adjustment-log.service';
import { BaseConsumer } from '@base-module/infrastructure/consumers/base.consumer';
import { Controller } from '@nestjs/common';
import { KAFKA_BROKER } from '@utils/global.util';
import { Kafka } from 'kafkajs';
import { HopeAdjustmentTopic } from './adjustment.topic';

@Controller('adjustment-log')
export class AdjustmentLogConsumer extends BaseConsumer {
  constructor(protected readonly service: AdjustmentLogService) {
    super(
      new Kafka({
        clientId: 'hope-log-adjustment-service',
        brokers: [KAFKA_BROKER],
      }).consumer({
        groupId: 'hope-log-adjustment-service',
      }),
    );
  }

  setTopics(): void {
    this.topics = [
      {
        topic: HopeAdjustmentTopic.HOPE_ADJUSTMENT_TOPIC,
        execute: async (payload) => this.insert(payload),
      },
    ];
  }

  async insert(payload): Promise<void> {
    console.log(
      `[LOG-SERVICE-CONSUMER]=> CONSUME ${HopeAdjustmentTopic.HOPE_ADJUSTMENT_TOPIC}`,
    );
    await this.service.save(payload);
  }
}
