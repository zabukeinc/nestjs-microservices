import { Controller } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { BaseConsumer } from 'src/base/infrastructure/consumers/base.consumer';
import { TransactionService } from 'src/modules/user/data/services/consumers/transaction.service';
import { UserService } from 'src/modules/user/data/services/user.service';
import { TransactionChangedManager } from './managers/transaction-changed.manager';
import { TransactionCreatedManager } from './managers/transaction-created.manager';
import { TransactionDeletedManager } from './managers/transaction-deleted.manager';
import { TransactionTopics } from './transaction.topics';

@Controller()
export class TransactionConsumer extends BaseConsumer {
  constructor(
    protected transactionService: TransactionService,
    protected userService: UserService,
  ) {
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
        topic: TransactionTopics.HANDLE_TRANSACTION_CREATED,
        execute: async (payload) => await this.created(payload),
      },
      {
        topic: TransactionTopics.HANDLE_TRANSACTION_CHANGED,
        execute: async (payload) => await this.updated(payload),
      },
      {
        topic: TransactionTopics.HANDLE_TRANSACTION_DELETED,
        execute: async (payload) => await this.deleted(payload),
      },
    ];
  }

  async created(payload): Promise<void> {
    new TransactionCreatedManager(
      this.transactionService,
      this.userService,
      payload,
    ).execute();
    console.log('Consumed trx created', payload);
  }

  async updated(payload): Promise<void> {
    new TransactionChangedManager(this.transactionService, payload).execute();
    console.log('Consumed trx Changed', payload);
  }

  async deleted(payload): Promise<void> {
    new TransactionDeletedManager(this.transactionService, payload).execute();
    console.log('Consumed trx Deleted', payload);
  }
}
