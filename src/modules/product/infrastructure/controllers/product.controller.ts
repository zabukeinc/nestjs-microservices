import { ResponseEntity } from '@base-module/helpers/response.helper';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllProductStockParamEntity } from '@product-module/domain/entities/products/get-all-product-master-param.entity';
import { ProductOrchestrator } from '@product-module/domain/usecases/product.orchestrator';
import { UpsertProductDTO } from '../dto/create-update-product.dto';
import { GetAllproductMasterParamDTO } from '../dto/get-all-product-master-param.dto';

@Controller('products')
@ApiTags('API HOPE-MS Product to Jubelio')
export class ProductController {
  constructor(protected orchestrator: ProductOrchestrator) {}

  @Get(':productId')
  async getProductById(
    @Param('productId') id: number,
  ): Promise<ResponseEntity> {
    try {
      return await this.orchestrator.getProductById(id);
    } catch (err) {
      return err;
    }
  }

  @Get('masters')
  async getAllProductMasters(
    @Param() params: GetAllproductMasterParamDTO,
  ): Promise<ResponseEntity> {
    try {
      return await this.orchestrator.getAllProductMaster(params);
    } catch (err) {
      return err;
    }
  }

  @Get('catalog/:itemGroupId')
  async getProductCatalog(
    @Param('itemGroupId') itemGroupId: number,
  ): Promise<ResponseEntity> {
    try {
      return await this.orchestrator.getProductCatalogByItemGroupId(
        itemGroupId,
      );
    } catch (err) {
      return err;
    }
  }

  @Get('stocks')
  async getAllProductStocks(
    @Param() params: GetAllProductStockParamEntity,
  ): Promise<ResponseEntity> {
    try {
      return await this.orchestrator.getAllProductStocks(params);
    } catch (err) {
      return err;
    }
  }

  @Post('set-to-master')
  async setProductToMaster(
    @Param('ids') ids: number[],
  ): Promise<ResponseEntity> {
    try {
      return await this.orchestrator.setProductToMaster(ids);
    } catch (err) {
      return err;
    }
  }

  @Post('')
  async upsertProduct(@Body() body: UpsertProductDTO): Promise<ResponseEntity> {
    try {
      return await this.orchestrator.upsertProduct(body);
    } catch (err) {
      return err;
    }
  }
}
