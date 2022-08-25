import { ResponseEntity } from '@base-module/helpers/response.helper';
import { BaseAxiosGetAllParamDTO } from '@base-module/infrastructure/dto/base-axios-get-all-param.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalesOrderOrchestrator } from '@sales-order-module/domain/usecases/sales-order.orchestrator';

@Controller('sales-orders')
@ApiTags('API HOPE-MS Sales Order to Jubelio')
export class SalesOrderController {
  constructor(protected orchestrator: SalesOrderOrchestrator) {}

  @Get()
  async getAllSalesOrders(
    @Query() params: BaseAxiosGetAllParamDTO,
  ): Promise<ResponseEntity> {
    return await this.orchestrator.getAllSalesOrders(params);
  }

  @Get(':id')
  async getSalesOrderById(@Param('id') id: number): Promise<ResponseEntity> {
    return await this.orchestrator.getSalesOrderById(id);
  }
}
