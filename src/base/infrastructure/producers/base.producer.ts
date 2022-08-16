import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export abstract class BaseProducer implements OnModuleInit, OnModuleDestroy {
  constructor(public client: ClientKafka, public topics: string[]) {}

  async onModuleInit() {
    Object.values(this.topics).forEach((topic) => {
      this.client.subscribeToResponseOf(topic.toString());
    });

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
