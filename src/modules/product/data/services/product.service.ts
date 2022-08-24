import { ResponseEntity } from '@base-module/helpers/response.helper';
import { GetAllProductMasterParamEntity } from 'src/modules/product/domain/entities/products/get-all-product-master-param.entity';
import { HttpService } from '@nestjs/axios';
import { CredentialService } from '@product-module/data/services/credential.service';
import { Injectable } from '@nestjs/common';
import { BaseJubelioService } from '@base-module/data/services/jubelio.service';
import { JUBELIO_HOST } from '@utils/global.util';
import { ProductProducer } from '@product-module/infrastructure/producers/product.producer';
import { LogPayloadBuilderHelper } from '@base-module/helpers/log-payload-builder.helper';
import { makeGetParam } from '@base-module/helpers/make-get-param.helper';

@Injectable()
export class ProductService extends BaseJubelioService {
  constructor(
    protected httpService: HttpService,
    protected credentialServiceImpl: CredentialService,
    protected productLogProducer: ProductProducer,
  ) {
    super(httpService);

    this.credentialService = credentialServiceImpl;
    this.logBuilder = new LogPayloadBuilderHelper(productLogProducer);
  }

  protected logBuilder: LogPayloadBuilderHelper;

  async getProductById(id: number): Promise<ResponseEntity> {
    this.currentFunctionName = 'getProductById';

    const url = `/inventory/items/${id}`;
    const result = await this.get(url);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}${url}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();

      this.config = await this.login();
      return await this.getProductById(id);
    }

    logger.produce();
    return result;
  }

  async getAllProductMaster(
    requestParam: GetAllProductMasterParamEntity,
  ): Promise<ResponseEntity> {
    this.currentFunctionName = 'getAllProductMaster';

    const params: GetAllProductMasterParamEntity = {
      page: requestParam.page,
      pageSize: requestParam.pageSize,
      sortBy: 'item_name',
      sortDirection: 'ASC',
      q: requestParam?.q,
    };

    const url = '/inventory/items/masters';

    const result = await this.get(url, params);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}${url}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();

      this.config = await this.login();

      return await this.getAllProductMaster(requestParam);
    }

    logger.produce();
    return result;
  }

  async getProductCatalog(itemGroupId: number): Promise<ResponseEntity> {
    this.currentFunctionName = 'getProductCatalog';

    const url = `/inventory/catalog/${itemGroupId}`;
    const result = await this.get(url);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}${url}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();

      this.config = await this.login();

      return await this.getProductCatalog(itemGroupId);
    }

    logger.produce();
    return result;
  }

  async getProductStock(
    params: GetAllProductMasterParamEntity,
  ): Promise<ResponseEntity> {
    this.currentFunctionName = 'getProductStock';
    const result = await this.get('/inventory', params);

    const logger = this.logBuilder
      .setAction('GET')
      .setEndpoint(`${JUBELIO_HOST}/inventory${makeGetParam(params)}`)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();

      return await this.getProductStock(params);
    }

    logger.produce();
    return result;
  }

  async createEditProduct(data): Promise<ResponseEntity> {
    this.currentFunctionName = 'createEditProduct';

    const url = '/inventory/catalog/';
    const result = await this.post(url, data);
    const logger = this.logBuilder
      .setAction('POST')
      .setEndpoint(`${JUBELIO_HOST}${url}`)
      .setRequest(data)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();
      return await this.createEditProduct(data);
    }

    logger.produce();
    return result;
  }

  async setProductToMaster(data): Promise<ResponseEntity> {
    this.currentFunctionName = 'setProductToMaster';

    const url = '/inventory/catalog/set-master';
    const result = await this.post(url, data);
    const logger = this.logBuilder
      .setAction('POST')
      .setEndpoint(`${JUBELIO_HOST}${url}`)
      .setRequest(data)
      .setResponse(result);

    if (this.isUnauthorized(result)) {
      logger.produce();
      this.config = await this.login();

      return await this.setProductToMaster(data);
    }

    logger.produce();
    return result;
  }
}
