import { BaseJubelioService } from '@base-module/data/services/jubelio.service';
import { LogPayloadBuilderHelper } from '@base-module/helpers/log-payload-builder.helper';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CredentialService } from '@product-module/data/services/credential.service';
import { AdjustmentDTO } from '../../infrastructure/dto/adjustment.dto';
import { AdjustmentProducer } from '../../infrastructure/producers/adjustment.producer';

@Injectable()
export class AdjustmentService extends BaseJubelioService {
  constructor(
    protected httpService: HttpService,
    protected credentialServiceImpl: CredentialService,
    protected producer: AdjustmentProducer,
  ) {
    super(httpService);

    this.credentialService = credentialServiceImpl;
    this.logBuilder = new LogPayloadBuilderHelper(producer);
  }

  async createAdjustment(body: AdjustmentDTO): Promise<ResponseEntity> {
    this.currentFunctionName = 'createAdjustment';
    const url = '/inventory/adjustments/';
    const result = await this.post(url, body);

    const logger = this.logBuilder
      .setAction('POST')
      .setEndpoint(url)
      .setRequest(body)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();

      return await this.createAdjustment(body);
    }

    logger.produce();
    return result;
  }

  async getStockAdjustment(adjustmentId: number): Promise<ResponseEntity> {
    this.currentFunctionName = 'getStockAdjustment';
    const url = `/inventory/adjustments/${adjustmentId}`;

    const result = await this.get(url);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(url)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();

      return await this.getStockAdjustment(adjustmentId);
    }

    logger.produce();
    return result;
  }
}
