import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CredentialModel } from '@product-module/data/models/credential.model';
import { CredentialService } from '@product-module/data/services/credential.service';
import { ProductService } from '@product-module/data/services/product.service';
import { ProductOrchestrator } from '@product-module/domain/usecases/product.orchestrator';
import { ProductController } from '@product-module/infrastructure/controllers/product.controller';

export const MODELS = [CredentialModel];

export const PROVIDERS = [
  ProductOrchestrator,
  CredentialService,

  ProductService,
];

export const CONTROLLERS = [ProductController];

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

export const HOPE_COMMAND_CONNECTION = 'HOPE_COMMAND_CONNECTION';
export const DATABASE_CONFIGURATION: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  // password: '',
  database: 'itmi-nestjs',
  entities: MODELS,
  synchronize: true,
  name: HOPE_COMMAND_CONNECTION,
};
