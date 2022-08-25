import { BaseLogEntity } from '@base-module/domain/entities/base-log.entity';
import { BaseLogProducer } from '@base-module/infrastructure/producers/base-log.producer';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENT_NAME } from '@utils/microservice.util';
import { lastValueFrom } from 'rxjs';
import { HopeInvoiceTopic } from './invoice.topic';

@Injectable()
export class InvoiceProducer extends BaseLogProducer {
  constructor(@Inject(KAFKA_CLIENT_NAME) public client: ClientKafka) {
    super(client, Object.values(HopeInvoiceTopic));
  }

  async produceRequest(payload: BaseLogEntity): Promise<void> {
    lastValueFrom(
      this.client.send(
        HopeInvoiceTopic.HOPE_INVOICE_TOPIC,
        JSON.stringify(payload),
      ),
    );

    console.log(
      `[PRODUCE INVOICE LOGGER SEND] <==> [ACTION]:: ${payload.action} <==> [ENDPOINT]: ${payload.endpoint}`,
    );
  }
}
