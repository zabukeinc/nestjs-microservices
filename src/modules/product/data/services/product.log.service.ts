import { BaseLogService } from '@base-module/data/services/base.log.service';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductLogEntity } from '@product-module/domain/entities/log/product.log.entity';
import { PRODUCT_COMMAND_CONNECTION } from '@product-module/utils/product.connection';
import { Repository } from 'typeorm';
import { ProductLogModel } from '../models/product.log.model';

@Injectable()
export class ProductLogService extends BaseLogService<ProductLogEntity> {
  constructor(
    @InjectRepository(ProductLogModel, PRODUCT_COMMAND_CONNECTION)
    private repo: Repository<ProductLogEntity>,
  ) {
    super(repo);
  }

  transform(
    action: string,
    response: ResponseEntity,
    request: any,
  ): ProductLogEntity {
    return {
      action,
      id: null,
      request: JSON.stringify(request),
      response: JSON.stringify(response),
      status_code: response.status,
      created_at: new Date(),
      deleted_at: null,
      updated_at: new Date(),
      order_id: null,
    };
  }
}
