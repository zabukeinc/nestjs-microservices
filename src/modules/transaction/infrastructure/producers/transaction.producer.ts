import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BaseProducer } from 'src/base/infrastructure/producers/base.producer';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { KAFKA_CLIENT_NAME } from '../../utils/microservice.config.util';
import { TransactionTopics } from '../topics';

@Injectable()
export class TransactionProducer extends BaseProducer {
  constructor(@Inject(KAFKA_CLIENT_NAME) public client: ClientKafka) {
    super(client, Object.values(TransactionTopics));
  }

  async created(entity: TransactionEntity): Promise<void> {
    lastValueFrom(
      this.client.send(TransactionTopics.HANDLE_TRANSACTION_CREATED, JSON.stringify(entity)),
    );
    console.log(TransactionTopics.HANDLE_TRANSACTION_CREATED, ' triggered');
  }

  async deleted(entity: TransactionEntity | number | string): Promise<void> {
    lastValueFrom(
      this.client.send(TransactionTopics.HANDLE_TRANSACTION_DELETED, JSON.stringify(entity)),
    );
    console.log(TransactionTopics.HANDLE_TRANSACTION_DELETED, ' triggered');
  }

  async changed(newEntity: TransactionEntity, oldEntity: TransactionEntity): Promise<void> {
    const data = {
      new: newEntity,
      old: oldEntity,
    };
    lastValueFrom(
      this.client.send(TransactionTopics.HANDLE_TRANSACTION_CHANGED, JSON.stringify(data)),
    );
    console.log(TransactionTopics.HANDLE_TRANSACTION_CHANGED, ' triggered');
  }
}
