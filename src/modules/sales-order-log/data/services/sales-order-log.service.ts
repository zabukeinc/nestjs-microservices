import { BaseService } from '@base-module/data/services/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrderLogEntity } from '@sales-order-log-module/domain/entities/sales-order-log.entity';
import { LOG_CONNECTION_NAME } from 'src/modules/connection-name';
import { Repository } from 'typeorm';
import { SalesOrderLogModel } from '../models/sales-order-log.model';

@Injectable()
export class SalesOrderLogService extends BaseService<SalesOrderLogEntity> {
  constructor(
    @InjectRepository(SalesOrderLogModel, LOG_CONNECTION_NAME)
    private repo: Repository<SalesOrderLogEntity>,
  ) {
    super(repo);
  }
}
