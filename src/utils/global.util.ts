import { AccountService } from '@account-module/data/services/account.service';
import { AccountOrchestrator } from '@account-module/domain/usecases/account.orchestrator';
import { AccountController } from '@account-module/infrastructure/controllers/account.controller';
import { AccountProducer } from '@account-module/infrastructure/producers/account.producer';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CredentialModel } from '@product-module/data/models/credential.model';
import { CredentialService } from '@product-module/data/services/credential.service';
import { ProductService } from '@product-module/data/services/product.service';
import { ProductOrchestrator } from '@product-module/domain/usecases/product.orchestrator';
import { ProductController } from '@product-module/infrastructure/controllers/product.controller';
import { ProductProducer } from '@product-module/infrastructure/producers/product.producer';
import { AdjustmentService } from 'src/modules/adjustment/data/services/adjustment.service';
import { AdjustmentOrchestrator } from 'src/modules/adjustment/domain/usecases/adjustment.orchestrator';
import { AdjustmentController } from 'src/modules/adjustment/infrastructure/controllers/adjustment.controller';
import { AdjustmentProducer } from 'src/modules/adjustment/infrastructure/producers/adjustment.producer';
import { HOPE_CONNECTION_NAME } from 'src/modules/connection-name';
import { PurchaseOrderService } from 'src/modules/purchase-order/data/services/purchase-order.service';
import { PurchaseOrderOrchestrator } from 'src/modules/purchase-order/domain/usecases/purchase-order.orchestrator';
import { PurchaseOrderController } from 'src/modules/purchase-order/infrastructure/controllers/purchase-order.controller';
import { PurchaseOrderProducer } from 'src/modules/purchase-order/infrastructure/producers/purchase-order.producer';

export const PORT = 3000;

export const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
export const KAFKA_RETRIES = process.env.KAFKA_RETRIES || 100000;
export const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || 'hope-service';
export const KAFKA_GROUP_ID = process.env.GROUP_ID || 'hope-consumer';
export const KAFKA_NAME = process.env.KAFKA_NAME || 'hope-service';

export const JUBELIO_HOST = 'https://api.jubelio.com';
export const JUBELIO_USER = 'technology@lifepack.id';
export const JUBELIO_PASSWORD = 'devItmi!123';
export const JUBELIO_PRODUCT_SYNC_SWITCH = 1;
export const JUBELIO_WEBHOOK_SECRET = 'jubelio-dev';
export const JUBELIO_TIMEOUT = 40000;

export const MODELS = [CredentialModel];

export const PROVIDERS = [
  CredentialService,

  ProductOrchestrator,
  ProductService,
  ProductProducer,

  AccountOrchestrator,
  AccountService,
  AccountProducer,

  AdjustmentOrchestrator,
  AdjustmentService,
  AdjustmentProducer,

  PurchaseOrderOrchestrator,
  PurchaseOrderService,
  PurchaseOrderProducer,
];

export const CONTROLLERS = [
  ProductController,
  AccountController,
  AdjustmentController,
  PurchaseOrderController,
];

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  // password: '',
  database: 'itmi-hope',
  entities: MODELS,
  synchronize: true,
  name: HOPE_CONNECTION_NAME,
};
