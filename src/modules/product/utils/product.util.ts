import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CredentialModel } from '@product-module/data/models/credential.model';
import { ProductLogModel } from '@product-module/data/models/product.log.model';
import { CredentialService } from '@product-module/data/services/credential.service';
import { ProductLogService } from '@product-module/data/services/product-log.service';
import { ProductService } from '@product-module/data/services/product.service';
import { ProductOrchestrator } from '@product-module/domain/usecases/product.orchestrator';
import { ProductController } from '@product-module/infrastructure/controllers/product.controller';
import { PRODUCT_COMMAND_CONNECTION } from './product.connection';

export const PRODUCT_MODELS = [CredentialModel, ProductLogModel];

export const PRODUCT_PROVIDERS = [
  ProductOrchestrator,
  CredentialService,

  ProductLogService,
  ProductService,
];

export const PRODUCT_CONTROLLERS = [ProductController];

export const PRODUCT_DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  // password: '',
  database: 'itmi-hope-product',
  entities: PRODUCT_MODELS,
  synchronize: true,
  name: PRODUCT_COMMAND_CONNECTION,
};
