import { BaseLogEntity } from '@base-module/domain/entities/base-log.entity';
import { BaseLogProducer } from '@base-module/infrastructure/producers/base-log.producer';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENT_NAME } from '@utils/microservice.util';
import { lastValueFrom } from 'rxjs';
import { HopeAdjustmentTopic } from './adjustment.topic';

@Injectable()
export class AdjustmentProducer extends BaseLogProducer {
  constructor(@Inject(KAFKA_CLIENT_NAME) public client: ClientKafka) {
    super(client, Object.values(HopeAdjustmentTopic));
  }

  async produceRequest(payload: BaseLogEntity): Promise<void> {
    lastValueFrom(
      this.client.send(
        HopeAdjustmentTopic.HOPE_ADJUSTMENT_LOG,
        JSON.stringify(payload),
      ),
    );

    console.log(
      `[PRODUCE Adjustment LOGGER SEND] <==> [ACTION]:: ${payload.action} <==> [ENDPOINT]: ${payload.endpoint}`,
    );
  }
}
