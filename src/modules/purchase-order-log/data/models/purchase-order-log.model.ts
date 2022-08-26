import { BaseLogModel } from '@base-module/data/models/base-log.model';
import { PurchaseOrderLogEntity } from '@purchase-order-log-module/domain/entities/purchase-order-log.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'purchase_orders__log' })
export class PurchaseOrderLogModel
  extends BaseLogModel
  implements PurchaseOrderLogEntity {}
