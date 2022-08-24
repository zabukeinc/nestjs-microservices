import { BaseAxiosGetAllParam } from '@base-module/domain/entities/base-axios-get-all-param.entity';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { Injectable } from '@nestjs/common';
import { PurchaseOrderService } from '../../data/services/purchase-order.service';
import { PurchaseOrderEntity } from '../entities/purchase-order.entity';

@Injectable()
export class PurchaseOrderOrchestrator {
  constructor(protected service: PurchaseOrderService) {}

  async getAllPurchaseOrders(
    params: BaseAxiosGetAllParam,
  ): Promise<ResponseEntity> {
    return await this.service.getAllPurchaseOrders(params);
  }

  async getPurchaseOrderById(id: number): Promise<ResponseEntity> {
    return await this.service.getPurchaseOrderById(id);
  }

  async upsertPurchaseOrder(
    body: PurchaseOrderEntity,
  ): Promise<ResponseEntity> {
    return await this.service.upsertPurchaseOrder(body);
  }
}
