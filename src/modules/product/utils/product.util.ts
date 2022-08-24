import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CredentialModel } from '@product-module/data/models/credential.model';
import { CredentialService } from '@product-module/data/services/credential.service';
import { ProductService } from '@product-module/data/services/product.service';
import { ProductOrchestrator } from '@product-module/domain/usecases/product.orchestrator';
import { ProductController } from '@product-module/infrastructure/controllers/product.controller';
import { ProductProducer } from '@product-module/infrastructure/producers/product.producer';
import { PRODUCT_COMMAND_CONNECTION } from './product.connection';

export const PRODUCT_MODELS = [CredentialModel];

export const PRODUCT_PROVIDERS = [
  ProductOrchestrator,
  CredentialService,

  ProductService,
  ProductProducer,
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
