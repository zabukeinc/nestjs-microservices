import { BaseJubelioService } from '@base-module/data/services/jubelio.service';
import { BaseAxiosGetAllParam } from '@base-module/domain/entities/base-axios-get-all-param.entity';
import { LogPayloadBuilderHelper } from '@base-module/helpers/log-payload-builder.helper';
import { makeGetParam } from '@base-module/helpers/make-get-param.helper';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CredentialService } from '@product-module/data/services/credential.service';
import { SalesOrderProducer } from '@sales-order-module/infrastructure/producers/sales-order.producer';
import { JUBELIO_HOST } from '@utils/global.util';

@Injectable()
export class SalesOrderService extends BaseJubelioService {
  constructor(
    protected httpService: HttpService,
    protected credentialServiceImpl: CredentialService,
    protected producer: SalesOrderProducer,
  ) {
    super(httpService);

    this.credentialService = credentialServiceImpl;
    this.logBuilder = new LogPayloadBuilderHelper(producer);
  }

  async getAllSalesOrders(
    params: BaseAxiosGetAllParam,
  ): Promise<ResponseEntity> {
    this.currentFunctionName = 'getAllSalesOrders';

    const url = '/sales/orders';

    console.log(params, 'parameters');
    const result = await this.get(url, params);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}${url}${makeGetParam(params)}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();

      this.config = await this.login();

      return await this.getAllSalesOrders(params);
    }

    logger.produce();
    return result;
  }

  async getSalesOrderById(id: number): Promise<ResponseEntity> {
    this.currentFunctionName = 'getSalesOrderById';

    const url = `/sales/orders/${id}`;

    const result = await this.get(url);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(url)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();

      return await this.getSalesOrderById(id);
    }

    logger.produce();
    return result;
  }
}
