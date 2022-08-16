import { Controller } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { BaseConsumer } from 'src/base/infrastructure/consumers/base.consumer';
import { UserTopics } from '../topics';

@Controller()
export class TestConsumer extends BaseConsumer {
  constructor() {
    super(
      new Kafka({
        clientId: 'user-client-consumer',
        brokers: ['localhost:9092'],
      }).consumer({
        groupId: 'user-consumer',
      }),
    );
  }

  setTopics(): void {
    this.topics = [
      {
        topic: UserTopics.HANDLE_USER_CREATED,
        execute: async (payload) => await this.created(payload),
      },
      {
        topic: UserTopics.HANDLE_USER_CHANGED,
        execute: async (payload) => await this.updated(payload),
      },
      {
        topic: UserTopics.HANDLE_USER_DELETED,
        execute: async (payload) => await this.deleted(payload),
      },
    ];
  }

  async created(payload): Promise<void> {
    console.log('Consumed User Created', payload);
  }

  async updated(payload): Promise<void> {
    console.log('Consumed User Changed', payload);
  }

  async deleted(payload): Promise<void> {
    console.log('Consumed User Deleted', payload);
  }
}
