import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BaseProducer } from 'src/base/infrastructure/producers/base.producer';
import { UserEntity } from '../../domain/entities/user.entity';
import { KAFKA_CLIENT_NAME } from '../../utils/microservice.config.util';
import { UserTopics } from '../topics';

@Injectable()
export class UserProducer extends BaseProducer {
  constructor(@Inject(KAFKA_CLIENT_NAME) public client: ClientKafka) {
    super(client, Object.values(UserTopics));
  }

  async created(entity: UserEntity): Promise<void> {
    lastValueFrom(
      this.client.send(UserTopics.HANDLE_USER_CREATED, JSON.stringify(entity)),
    );
    console.log(UserTopics.HANDLE_USER_CREATED, ' triggered');
  }

  async deleted(entity: UserEntity | number | string): Promise<void> {
    lastValueFrom(
      this.client.send(UserTopics.HANDLE_USER_DELETED, JSON.stringify(entity)),
    );
    console.log(UserTopics.HANDLE_USER_DELETED, ' triggered');
  }

  async changed(newEntity: UserEntity, oldEntity: UserEntity): Promise<void> {
    const data = {
      new: newEntity,
      old: oldEntity,
    };
    lastValueFrom(
      this.client.send(UserTopics.HANDLE_USER_CHANGED, JSON.stringify(data)),
    );
    console.log(UserTopics.HANDLE_USER_CHANGED, ' triggered');
  }
}
