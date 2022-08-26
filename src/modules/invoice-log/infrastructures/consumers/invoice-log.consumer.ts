import { BaseConsumer } from '@base-module/infrastructure/consumers/base.consumer';
import { InvoiceLogService } from '@invoice-log-module/data/services/invoice-log.service';
import { Controller } from '@nestjs/common';
import { KAFKA_BROKER } from '@utils/global.util';
import { Kafka } from 'kafkajs';
import { HopeInvoiceTopic } from './invoice.topic';

@Controller('invoice-log')
export class InvoiceLogConsumer extends BaseConsumer {
  constructor(protected readonly service: InvoiceLogService) {
    super(
      new Kafka({
        clientId: 'hope-log-invoice-service',
        brokers: [KAFKA_BROKER],
      }).consumer({
        groupId: 'hope-log-invoice-service',
      }),
    );
  }

  setTopics(): void {
    this.topics = [
      {
        topic: HopeInvoiceTopic.HOPE_INVOICE_TOPIC,
        execute: async (payload) => this.insert(payload),
      },
    ];
  }

  async insert(payload): Promise<void> {
    console.log(
      `[LOG-SERVICE-CONSUMER]=> CONSUME ${HopeInvoiceTopic.HOPE_INVOICE_TOPIC}`,
    );
    await this.service.save(payload);
  }
}
