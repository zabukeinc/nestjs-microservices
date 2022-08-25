import { BaseAxiosGetAllParam } from '@base-module/domain/entities/base-axios-get-all-param.entity';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { Injectable } from '@nestjs/common';
import { SalesOrderService } from '@sales-order-module/data/services/sales-order.service';

@Injectable()
export class SalesOrderOrchestrator {
  constructor(protected service: SalesOrderService) {}

  async getAllSalesOrders(
    params: BaseAxiosGetAllParam,
  ): Promise<ResponseEntity> {
    return await this.service.getAllSalesOrders(params);
  }

  async getSalesOrderById(id: number): Promise<ResponseEntity> {
    return await this.service.getSalesOrderById(id);
  }
}
