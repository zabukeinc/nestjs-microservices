import { AccountLogService } from '@account-log-module/data/services/account-log.service';
import { BaseConsumer } from '@base-module/infrastructure/consumers/base.consumer';
import { Controller } from '@nestjs/common';
import { KAFKA_BROKER } from '@utils/global.util';
import { Kafka } from 'kafkajs';
import { HopeAccountTopic } from './account.topic';

@Controller('account-log')
export class AccountLogConsumer extends BaseConsumer {
  constructor(protected readonly accountLogService: AccountLogService) {
    super(
      new Kafka({
        clientId: 'hope-log-account-service',
        brokers: [KAFKA_BROKER],
      }).consumer({
        groupId: 'hope-log-account-service',
      }),
    );
  }

  setTopics(): void {
    this.topics = [
      {
        topic: HopeAccountTopic.HOPE_ACCOUNT_LOG,
        execute: async (payload) => this.insert(payload),
      },
    ];
  }

  async insert(payload): Promise<void> {
    console.log(
      `[LOG-SERVICE-CONSUMER]=> CONSUME ${HopeAccountTopic.HOPE_ACCOUNT_LOG}`,
    );
    await this.accountLogService.save(payload);
  }
}
