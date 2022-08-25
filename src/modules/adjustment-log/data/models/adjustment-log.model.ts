import { AdjustmentLogEntity } from '@adjustment-log-module/domain/entities/adjustment-log.entity';
import { BaseLogModel } from '@base-module/data/models/base-log.model';
import { Entity } from 'typeorm';

@Entity({ name: 'adjustment__log' })
export class AdjustmentLogModel
  extends BaseLogModel
  implements AdjustmentLogEntity {}
