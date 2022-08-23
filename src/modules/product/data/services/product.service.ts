import { ResponseEntity } from '@base-module/helpers/response.helper';
import { GetAllProductMasterParamEntity } from 'src/modules/product/domain/entities/products/get-all-product-master-param.entity';
import { HttpService } from '@nestjs/axios';
import { CredentialService } from '@product-module/data/services/credential.service';
import { Injectable } from '@nestjs/common';
import { BaseJubelioService } from '@base-module/data/services/jubelio.service';
import { ProductLogService } from './product.log.service';
import { JUBELIO_HOST } from '@utils/global.util';

@Injectable()
export class ProductService extends BaseJubelioService {
  constructor(
    protected httpService: HttpService,
    protected credentialServiceImpl: CredentialService,
    protected productLog: ProductLogService,
  ) {
    super(httpService);

    this.credentialService = credentialServiceImpl;
  }

  async getProductById(id: number): Promise<ResponseEntity> {
    const url = `/inventory/items/${id}`;
    const result = await this.get(url);
    if (this.isUnauthorized(result)) {
      await this.productLog.insertLog('GET', result, {
        url: `${JUBELIO_HOST}${url}`,
      });
      this.config = await this.login();
      return await this.getProductById(id);
    }

    await this.productLog.insertLog('GET', result, {
      url: `${JUBELIO_HOST}${url}`,
    });
    return result;
  }

  async getAllProductMaster(
    requestParam: GetAllProductMasterParamEntity,
  ): Promise<any> {
    const params: GetAllProductMasterParamEntity = {
      page: requestParam.page,
      pageSize: requestParam.pageSize,
      sortBy: 'item_name',
      sortDirection: 'ASC',
      q: requestParam?.q,
    };

    const url = '/inventory/items/masters';

    const result = await this.get(url, params);

    if (this.isUnauthorized(result)) {
      await this.productLog.insertLog('GET', result, {
        url: `${JUBELIO_HOST}${url}${this.makeParam(params)}`,
      });

      this.config = await this.login();

      return await this.getAllProductMaster(requestParam);
    }

    await this.productLog.insertLog('GET', result, {
      url: `${JUBELIO_HOST}${url}${this.makeParam(params)}`,
    });

    return result;
  }

  async getProductCatalog(itemGroupId: number): Promise<any> {
    const url = `/inventory/catalog/${itemGroupId}`;
    const result = await this.get(url);

    if (this.isUnauthorized(result)) {
      await this.productLog.insertLog('GET', result, {
        url: `${JUBELIO_HOST}${url}`,
      });
      this.config = await this.login();

      return await this.getProductCatalog(itemGroupId);
    }

    return result;
  }

  async getProductStock(
    params: GetAllProductMasterParamEntity & { q: string },
  ): Promise<ResponseEntity> {
    const result = await this.get('/inventory', params);

    if (this.isUnauthorized(result)) {
      this.config = await this.login();

      return await this.getProductStock(params);
    }

    return result;
  }

  async createEditProduct(data): Promise<ResponseEntity> {
    const url = '/inventory/catalog/';
    const result = await this.post(url, data);

    if (this.isUnauthorized(result)) {
      await this.productLog.insertLog('POST', result, {
        url: `${JUBELIO_HOST}${url}`,
        data,
      });
      this.config = await this.login();
      return await this.createEditProduct(data);
    }

    await this.productLog.insertLog('POST', result, {
      url: `${JUBELIO_HOST}${url}`,
      data,
    });
    return result;
  }

  async setProductToMaster(data): Promise<ResponseEntity> {
    const url = '/inventory/catalog/set-master';
    const result = await this.post(url, data);

    if (this.isUnauthorized(result)) {
      await this.productLog.insertLog('POST', result, {
        url: `${JUBELIO_HOST}${url}`,
        data,
      });
      this.config = await this.login();

      return await this.setProductToMaster(data);
    }

    return result;
  }
}
