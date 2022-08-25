import { BaseJubelioService } from '@base-module/data/services/jubelio.service';
import { BaseAxiosGetAllParam } from '@base-module/domain/entities/base-axios-get-all-param.entity';
import { LogPayloadBuilderHelper } from '@base-module/helpers/log-payload-builder.helper';
import { makeGetParam } from '@base-module/helpers/make-get-param.helper';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { InvoiceProducer } from '@invoice-module/infrastructure/producers/invoice.producer';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CredentialService } from '@product-module/data/services/credential.service';
import { JUBELIO_HOST } from '@utils/global.util';

@Injectable()
export class InvoiceService extends BaseJubelioService {
  constructor(
    protected httpService: HttpService,
    protected credentialServiceImpl: CredentialService,
    protected producer: InvoiceProducer,
  ) {
    super(httpService);

    this.credentialService = credentialServiceImpl;
    this.logBuilder = new LogPayloadBuilderHelper(producer);
  }

  async getAllInvoices(params: BaseAxiosGetAllParam): Promise<ResponseEntity> {
    this.currentFunctionName = 'getAllInvoices';
    const url = '/sales/invoices';

    const result = await this.get(url, params);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}${url}${makeGetParam(params)}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();

      this.config = await this.login();

      return await this.getAllInvoices(params);
    }

    logger.produce();
    return result;
  }
}
