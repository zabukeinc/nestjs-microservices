import { ResponseEntity } from '@base-module/helpers/response.helper';
import { Injectable } from '@nestjs/common';
import { AdjustmentService } from '../../data/services/adjustment.service';
import { AdjustmentEntity } from '../entities/adjustment.entity';

@Injectable()
export class AdjustmentOrchestrator {
  constructor(protected service: AdjustmentService) {}

  async createAdjustment(body: AdjustmentEntity): Promise<ResponseEntity> {
    return await this.service.createAdjustment(body);
  }

  async getStockAdjustment(adjustmentId: number): Promise<ResponseEntity> {
    return await this.service.getStockAdjustment(adjustmentId);
  }
}
