import { Controller } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { BaseConsumer } from 'src/base/infrastructure/consumers/base.consumer';
import { UserService } from 'src/modules/transaction/data/services/user.service';
import {
  KAFKA_BROKER,
  KAFKA_CLIENT_ID,
  KAFKA_GROUP_ID,
} from 'src/utils/global.util';
import { UserChangedManager } from './managers/user-changed.manager';
import { UserCreatedManager } from './managers/user-created.manager';
import { UserDeletedManager } from './managers/user-deleted.manager';
import { UserTopics } from './user.topics';

@Controller()
export class UserConsumer extends BaseConsumer {
  constructor(protected userService: UserService) {
    super(
      new Kafka({
        clientId: KAFKA_CLIENT_ID,
        brokers: [KAFKA_BROKER],
      }).consumer({
        groupId: KAFKA_GROUP_ID,
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
    new UserCreatedManager(this.userService, payload).execute();
    console.log('Consumed User Created', payload);
  }

  async updated(payload): Promise<void> {
    new UserChangedManager(this.userService, payload).execute();
    console.log('Consumed User Changed', payload);
  }

  async deleted(payload): Promise<void> {
    new UserDeletedManager(this.userService, payload).execute();
    console.log('Consumed User Deleted', payload);
  }
}
