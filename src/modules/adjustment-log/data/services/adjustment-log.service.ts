import { AdjustmentLogEntity } from '@adjustment-log-module/domain/entities/adjustment-log.entity';
import { BaseService } from '@base-module/data/services/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LOG_CONNECTION_NAME } from 'src/modules/connection-name';
import { Repository } from 'typeorm';
import { AdjustmentLogModel } from '../models/adjustment-log.model';

@Injectable()
export class AdjustmentLogService extends BaseService<AdjustmentLogEntity> {
  constructor(
    @InjectRepository(AdjustmentLogModel, LOG_CONNECTION_NAME)
    private repo: Repository<AdjustmentLogEntity>,
  ) {
    super(repo);
  }
}
