import { BaseLogModel } from '@base-module/data/models/base-log.model';
import { SalesOrderLogEntity } from '@sales-order-log-module/domain/entities/sales-order-log.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'sales_orders__log' })
export class SalesOrderLogModel
  extends BaseLogModel
  implements SalesOrderLogEntity {}
