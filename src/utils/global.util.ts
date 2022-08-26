export const PORT = 3001;

export const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
export const KAFKA_RETRIES = process.env.KAFKA_RETRIES || 100000;
export const KAFKA_CLIENT_ID =
  process.env.KAFKA_CLIENT_ID || 'hope-log-service';
export const KAFKA_GROUP_ID = process.env.GROUP_ID || 'hope-log-consumer';
export const KAFKA_NAME = process.env.KAFKA_NAME || 'hope-log-service';

export const JUBELIO_HOST = 'https://api.jubelio.com';
export const JUBELIO_USER = 'technology@lifepack.id';
export const JUBELIO_PASSWORD = 'devItmi!123';
export const JUBELIO_PRODUCT_SYNC_SWITCH = 1;
export const JUBELIO_WEBHOOK_SECRET = 'jubelio-dev';
export const JUBELIO_TIMEOUT = 40000;

import { AccountLogModel } from '@account-log-module/data/models/account-log.model';
import { AccountLogService } from '@account-log-module/data/services/account-log.service';
import { AccountLogConsumer } from '@account-log-module/infrastructures/consumers/account-log.consumer';
import { AdjustmentLogModel } from '@adjustment-log-module/data/models/adjustment-log.model';
import { AdjustmentLogService } from '@adjustment-log-module/data/services/adjustment-log.service';
import { AdjustmentLogConsumer } from '@adjustment-log-module/infrastructures/consumers/adjustment-log.consumer';
import { InvoiceLogModel } from '@invoice-log-module/data/models/invoice-log.model';
import { InvoiceLogService } from '@invoice-log-module/data/services/invoice-log.service';
import { InvoiceLogConsumer } from '@invoice-log-module/infrastructures/consumers/invoice-log.consumer';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductLogModel } from '@product-log-module/data/models/product-log.model';
import { ProductLogService } from '@product-log-module/data/services/product-log.service';
import { ProductLogConsumer } from '@product-log-module/infrastructures/consumers/product-log.consumer';
import { PurchaseOrderLogModel } from '@purchase-order-log-module/data/models/purchase-order-log.model';
import { PurchaseOrderLogService } from '@purchase-order-log-module/data/services/purchase-order-log.service';
import { PurchaseOrderLogConsumer } from '@purchase-order-log-module/infrastructures/consumers/purchase-order-log.consumer';
import { SalesOrderLogModel } from '@sales-order-log-module/data/models/sales-order-log.model';
import { SalesOrderLogService } from '@sales-order-log-module/data/services/sales-order-log.service';
import { SalesOrderLogConsumer } from '@sales-order-log-module/infrastructures/consumers/sales-order-log.consumer';
import { LOG_CONNECTION_NAME } from 'src/modules/connection-name';

export const MODELS = [
  ProductLogModel,
  AccountLogModel,
  AdjustmentLogModel,
  PurchaseOrderLogModel,
  SalesOrderLogModel,
  InvoiceLogModel,
];

export const PROVIDERS = [
  ProductLogService,
  AccountLogService,
  AdjustmentLogService,
  PurchaseOrderLogService,
  SalesOrderLogService,
  InvoiceLogService,
];

export const CONTROLLERS = [
  ProductLogConsumer,
  AccountLogConsumer,
  AdjustmentLogConsumer,
  PurchaseOrderLogConsumer,
  SalesOrderLogConsumer,
  InvoiceLogConsumer,
];

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  // password: 'root',
  database: 'itmi-hope-log',
  entities: MODELS,
  synchronize: true,
  name: LOG_CONNECTION_NAME,
};
