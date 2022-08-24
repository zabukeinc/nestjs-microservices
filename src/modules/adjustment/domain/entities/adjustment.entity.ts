import { BaseEntity } from '@base-module/domain/entities/base.entity';

export interface AdjustmentEntity extends BaseEntity {
  note: string;
  qty: number;
  transaction_date: Date;
  price: number;
  description: string;
  item_adj_no: string;
  item_adj_id: number;
  location_id: number;
  is_opening_balance: boolean;
  items: AdjustmentItemEntity[];
}

export interface AdjustmentItemEntity {
  item_adj_detail_id: number;
  item_id: number;
  serial_no: string;
  qty_in_base: number;
  uom_id: number;
  unit: string;
  cost: string;
  amount: number;
  location_id: number;
  account_id: number;
  description: string;
  batch_no: string;
}
