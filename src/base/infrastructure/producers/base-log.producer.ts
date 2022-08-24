import { BaseLogEntity } from '@base-module/domain/entities/base-log.entity';
import { BaseProducer } from './base.producer';

export abstract class BaseLogProducer extends BaseProducer {
  abstract produceRequest(payload: BaseLogEntity): Promise<void>;
}
