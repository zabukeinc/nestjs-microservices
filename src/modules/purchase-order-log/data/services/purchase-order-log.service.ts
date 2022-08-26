import { BaseService } from '@base-module/data/services/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderLogEntity } from '@purchase-order-log-module/domain/entities/purchase-order-log.entity';
import { LOG_CONNECTION_NAME } from 'src/modules/connection-name';
import { Repository } from 'typeorm';
import { PurchaseOrderLogModel } from '../models/purchase-order-log.model';

@Injectable()
export class PurchaseOrderLogService extends BaseService<PurchaseOrderLogEntity> {
  constructor(
    @InjectRepository(PurchaseOrderLogModel, LOG_CONNECTION_NAME)
    private repo: Repository<PurchaseOrderLogEntity>,
  ) {
    super(repo);
  }
}
