import { BaseService } from '@base-module/data/services/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductLogEntity } from '@product-log-module/domain/entities/product-log.entity';
import { LOG_CONNECTION_NAME } from 'src/modules/connection-name';
import { Repository } from 'typeorm';
import { ProductLogModel } from '../models/product-log.model';

@Injectable()
export class ProductLogService extends BaseService<ProductLogEntity> {
  constructor(
    @InjectRepository(ProductLogModel, LOG_CONNECTION_NAME)
    private repo: Repository<ProductLogEntity>,
  ) {
    super(repo);
  }
}
