import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductLogModel } from '@product-log-module/data/models/product-log.model';
import { ProductLogService } from '@product-log-module/data/services/product-log.service';
import { ProductLogConsumer } from '@product-log-module/infrastructures/consumers/product-log.consumer';
import { PRODUCT_LOG_CONNECTION_NAME } from './product-log-connection.util';

export const PRODUCT_MODELS = [ProductLogModel];

export const PRODUCT_PROVIDERS = [ProductLogService];

export const PRODUCT_CONTROLLERS = [ProductLogConsumer];

export const PRODUCT_DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  // password: '',
  database: 'itmi-hope-log-product',
  entities: PRODUCT_MODELS,
  synchronize: true,
  name: PRODUCT_LOG_CONNECTION_NAME,
};
