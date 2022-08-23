import { ResponseEntity } from '@base-module/helpers/response.helper';
import { Injectable } from '@nestjs/common';
import { ProductService } from '@product-module/data/services/product.service';
import {
  GetAllProductMasterParamEntity,
  GetAllProductStockParamEntity,
} from '../entities/products/get-all-product-master-param.entity';
import { ProductEntity } from '../entities/products/product.entity';

@Injectable()
export class ProductOrchestrator {
  constructor(protected readonly service: ProductService) {}

  async getProductById(id: number): Promise<ResponseEntity> {
    return await this.service.getProductById(id);
  }

  async getProductCatalogByItemGroupId(id: number): Promise<ResponseEntity> {
    return await this.service.getProductCatalog(id);
  }

  async getAllProductMaster(
    params: GetAllProductMasterParamEntity,
  ): Promise<ResponseEntity> {
    return await this.service.getAllProductMaster({
      page: params.page,
      pageSize: params.pageSize,
      q: params?.q,
      sortBy: params?.sortBy,
      sortDirection: params?.sortDirection,
    });
  }

  async getAllProductStocks(
    params: GetAllProductStockParamEntity,
  ): Promise<ResponseEntity> {
    return await this.service.getProductStock({
      page: params.page,
      pageSize: params.pageSize,
      q: params?.q,
      sortBy: params?.sortBy,
      sortDirection: params?.sortDirection,
    });
  }

  async setProductToMaster(ids: number[]): Promise<ResponseEntity> {
    return await this.service.setProductToMaster(ids);
  }

  async upsertProduct(productEntity: ProductEntity): Promise<ResponseEntity> {
    return await this.service.createEditProduct(productEntity);
  }
}
