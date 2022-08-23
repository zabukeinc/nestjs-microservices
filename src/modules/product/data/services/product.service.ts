import { ResponseEntity } from '@base-module/helpers/response.helper';
import { GetAllProductMasterParamEntity } from 'src/modules/product/domain/entities/products/get-all-product-master-param.entity';
import { HttpService } from '@nestjs/axios';
import { CredentialService } from '@product-module/data/services/credential.service';
import { BaseJubelioService } from '@product-module/data/services/jubelio.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService extends BaseJubelioService {
  constructor(
    protected httpService: HttpService,
    protected credentialService: CredentialService,
  ) {
    super(httpService, credentialService);
  }

  async getProductById(id: number): Promise<ResponseEntity> {
    const result = await this.get(`/inventory/items/${id}`);

    if (this.isUnauthorized(result)) {
      this.config = await this.login();
      return await this.getProductById(id);
    }

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

    const result = await this.get('/inventory/items/masters', params);

    if (this.isUnauthorized(result)) {
      this.config = await this.login();

      return await this.getAllProductMaster(requestParam);
    }

    return result;
  }

  async getProductCatalog(itemGroupId: number): Promise<any> {
    const result = await this.get(`/inventory/catalog/${itemGroupId}`);

    if (this.isUnauthorized(result)) {
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
      this.config = await this.login();
      return await this.createEditProduct(data);
    }

    return result;
  }

  async setProductToMaster(data): Promise<ResponseEntity> {
    const result = await this.post('/inventory/catalog/set-master', data);

    if (this.isUnauthorized(result)) {
      this.config = await this.login();

      return await this.setProductToMaster(data);
    }

    return result;
  }
}
