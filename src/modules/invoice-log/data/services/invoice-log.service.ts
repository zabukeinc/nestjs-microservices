import { BaseService } from '@base-module/data/services/base.service';
import { InvoiceLogEntity } from '@invoice-log-module/domain/entities/invoice-log.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LOG_CONNECTION_NAME } from 'src/modules/connection-name';
import { Repository } from 'typeorm';
import { InvoiceLogModel } from '../models/invoice-log.model';

@Injectable()
export class InvoiceLogService extends BaseService<InvoiceLogEntity> {
  constructor(
    @InjectRepository(InvoiceLogModel, LOG_CONNECTION_NAME)
    private repo: Repository<InvoiceLogEntity>,
  ) {
    super(repo);
  }
}
