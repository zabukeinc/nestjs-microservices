import { ResponseEntity } from '@base-module/helpers/response.helper';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdjustmentOrchestrator } from '../../domain/usecases/adjustment.orchestrator';
import { AdjustmentDTO } from '../dto/adjustment.dto';

@Controller('adjustments')
@ApiTags('API HOPE-MS Adjustment to Jubelio')
export class AdjustmentController {
  constructor(protected orchestrator: AdjustmentOrchestrator) {}

  @Post()
  async createAdjustment(@Body() body: AdjustmentDTO): Promise<ResponseEntity> {
    return await this.orchestrator.createAdjustment(body);
  }

  @Get(':adjustmentId')
  async getStockAdjustments(
    @Param('adjustmentId') adjustmentId: number,
  ): Promise<ResponseEntity> {
    return await this.orchestrator.getStockAdjustment(adjustmentId);
  }
}
