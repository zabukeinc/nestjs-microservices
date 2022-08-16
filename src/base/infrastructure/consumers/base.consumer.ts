import {
  BadRequestException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Consumer } from 'kafkajs';

export interface ExecuteFunctionEntity {
  topic: string;
  execute: (payload) => Promise<void>;
}
export abstract class BaseConsumer implements OnModuleInit, OnModuleDestroy {
  public topics: ExecuteFunctionEntity[] = [];

  constructor(public client: Consumer) {}

  async onModuleInit() {
    this.setTopics();
    await this.client.connect();
    await this.consumerSubscribeTopics();
    await this.consumerListenTopics();
  }

  async consumerSubscribeTopics(): Promise<void> {
    const topicStrings = this.topics.map((value) => value.topic);

    await this.client.subscribe({
      topics: topicStrings,
      fromBeginning: false,
    });
  }

  abstract setTopics(): void;

  async consumerListenTopics(): Promise<void> {
    await this.client.run({
      eachMessage: async ({ topic, message }) => {
        console.log('consumed', topic);
        await this.executeFunctions(
          topic,
          JSON.parse(message.value.toString()),
        );
      },
    });
  }

  async executeFunctions(currentTopic: string, payload: any): Promise<void> {
    const equalTopic = this.topics.find(
      (value) => value.topic === currentTopic,
    );

    if (!equalTopic)
      throw new BadRequestException(
        `${currentTopic} is not registered on consumer.`,
      );

    await equalTopic.execute(payload);
  }

  async onModuleDestroy() {
    await this.client.disconnect();
  }
}
