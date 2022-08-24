import { AccountProducer } from '@account-module/infrastructure/producers/account.producer';
import { BaseJubelioService } from '@base-module/data/services/jubelio.service';
import { BaseAxiosGetAllParam } from '@base-module/domain/entities/base-axios-get-all-param.entity';
import { LogPayloadBuilderHelper } from '@base-module/helpers/log-payload-builder.helper';
import { makeGetParam } from '@base-module/helpers/make-get-param.helper';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CredentialService } from '@product-module/data/services/credential.service';
import { JUBELIO_HOST } from '@utils/global.util';

@Injectable()
export class AccountService extends BaseJubelioService {
  constructor(
    protected httpService: HttpService,
    protected producer: AccountProducer,
    protected credentialServiceImpl: CredentialService,
  ) {
    super(httpService);

    this.credentialService = credentialServiceImpl;
    this.logBuilder = new LogPayloadBuilderHelper(producer);
  }

  private logBuilder: LogPayloadBuilderHelper;

  async getAccountInformation(): Promise<ResponseEntity> {
    this.currentFunctionName = 'getAccountInformation';
    const url = `/systemsetting/account-mapping`;
    const result = await this.get(url);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}${url}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();
      return await this.getAccountInformation();
    }

    logger.produce();

    return result;
  }

  async getLocations(params: BaseAxiosGetAllParam): Promise<ResponseEntity> {
    this.currentFunctionName = 'getLocations';
    const currentParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10,
    };

    const url = '/locations';

    const result = await this.get(url, currentParams);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}${url}${makeGetParam(params)}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();

      this.config = await this.login();

      return await this.getLocations(params);
    }

    logger.produce();

    return result;
  }
}
