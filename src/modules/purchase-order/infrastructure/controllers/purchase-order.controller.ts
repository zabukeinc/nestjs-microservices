import { ResponseEntity } from '@base-module/helpers/response.helper';
import { BaseAxiosGetAllParamDTO } from '@base-module/infrastructure/dto/base-axios-get-all-param.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PurchaseOrderOrchestrator } from '../../domain/usecases/purchase-order.orchestrator';
import { PurchaseOrderDTO } from '../dto/purchase-order.dto';

@Controller('purchase-orders')
@ApiTags('API HOPE-MS Purchase Order to Jubelio')
export class PurchaseOrderController {
  constructor(protected orchestrator: PurchaseOrderOrchestrator) {}

  @Post()
  async upsertPurchaseOrder(
    @Body() body: PurchaseOrderDTO,
  ): Promise<ResponseEntity> {
    return await this.orchestrator.upsertPurchaseOrder(body);
  }

  @Get()
  async getAllPurchaseOrders(
    @Param() params: BaseAxiosGetAllParamDTO,
  ): Promise<ResponseEntity> {
    return await this.orchestrator.getAllPurchaseOrders(params);
  }

  @Get(':id')
  async getPurchaseOrderById(@Param('id') id: number): Promise<ResponseEntity> {
    return await this.orchestrator.getPurchaseOrderById(id);
  }
}
