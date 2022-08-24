import { BaseJubelioService } from '@base-module/data/services/jubelio.service';
import { BaseAxiosGetAllParam } from '@base-module/domain/entities/base-axios-get-all-param.entity';
import { LogPayloadBuilderHelper } from '@base-module/helpers/log-payload-builder.helper';
import { makeGetParam } from '@base-module/helpers/make-get-param.helper';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CredentialService } from '@product-module/data/services/credential.service';
import { JUBELIO_HOST } from '@utils/global.util';
import { PurchaseOrderEntity } from '../../domain/entities/purchase-order.entity';
import { PurchaseOrderProducer } from '../../infrastructure/producers/purchase-order.producer';

@Injectable()
export class PurchaseOrderService extends BaseJubelioService {
  constructor(
    protected httpService: HttpService,
    protected credentialServiceImpl: CredentialService,
    protected producer: PurchaseOrderProducer,
  ) {
    super(httpService);

    this.credentialService = credentialServiceImpl;
    this.logBuilder = new LogPayloadBuilderHelper(producer);
  }

  async getPurchaseOrderById(id: number): Promise<ResponseEntity> {
    const url = `/purchase/orders/${id}`;

    const result = await this.get(url);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}${url}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();

      return await this.getPurchaseOrderById(id);
    }

    logger.produce();
    return result;
  }

  async getAllPurchaseOrders(
    params: BaseAxiosGetAllParam,
  ): Promise<ResponseEntity> {
    const url = '/purchase/orders';

    const result = await this.get(url, params);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}${url}${makeGetParam(params)}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();

      return this.getAllPurchaseOrders(params);
    }

    logger.produce();
    return result;
  }

  async upsertPurchaseOrder(
    body: PurchaseOrderEntity,
  ): Promise<ResponseEntity> {
    const url = '/purchase/orders/';

    const result = await this.post(url, body);

    const logger = this.logBuilder
      .setAction('POST')
      .setEndpoint(url)
      .setRequest(body)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();

      return await this.upsertPurchaseOrder(body);
    }

    logger.produce();
    return result;
  }
}
