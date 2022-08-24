import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import {
  PurchaseOrderEntity,
  PurchaseOrderItemEntity,
} from '../../domain/entities/purchase-order.entity';

export class PurchaseOrderItemDTO implements PurchaseOrderItemEntity {
  @ApiProperty({ type: 'number', required: false })
  purchaseorder_detail_id: number;

  @ApiProperty({ type: 'number', required: false })
  item_id: number;

  @ApiProperty({ type: 'string', required: false })
  item_code: string;

  @ApiProperty({ type: 'string', required: false })
  item_name: string;

  @ApiProperty({ type: 'number', required: false })
  description: number;

  @ApiProperty({ type: 'number', required: false })
  tax_id: number;

  @ApiProperty({ type: 'number', required: false })
  price: number;

  @ApiProperty({ type: 'number', required: false })
  buy_price: number;

  @ApiProperty({ type: 'number', required: false })
  original_price: number;

  @ApiProperty({ type: 'number', required: false })
  rate: number;

  @ApiProperty({ type: 'string', required: false })
  tax_name: string;

  @ApiProperty({ type: 'string', required: false })
  unit: string;

  @ApiProperty({ type: 'number', required: false })
  qty: number;

  @ApiProperty({ type: 'number', required: false })
  uom_id: number;

  @ApiProperty({ type: 'number', required: false })
  qty_in_base: number;

  @ApiProperty({ type: 'number', required: false })
  disc: number;

  @ApiProperty({ type: 'number', required: false })
  disc_amount: number;

  @ApiProperty({ type: 'number', required: false })
  tax_amount: number;

  @ApiProperty({ type: 'number', required: false })
  amount: number;

  @ApiProperty({ type: 'number', required: false })
  location_id: number;
}

export class PurchaseOrderDTO implements PurchaseOrderEntity {
  @ApiProperty({ type: 'number', required: false })
  purchaseorder_id: number;

  @ApiProperty({ type: 'string' })
  purchaseorder_no: string;

  @ApiProperty({ type: 'number', required: false })
  bill_id: number;

  @ApiProperty({ type: 'string', required: false })
  bill_no: string;

  @ApiProperty({ type: 'number', required: false })
  payment_method: number;

  @ApiProperty({ type: 'number', required: false })
  contact_id: number;

  @ApiProperty({ type: 'string' })
  supplier_name: string;

  @ApiProperty({
    type: 'date',
    required: false,
    default: new Date().toJSON().slice(0, 10),
  })
  transaction_date: Date;

  @ApiProperty({
    type: 'date',
    required: false,
    default: new Date().toJSON().slice(0, 10),
  })
  created_date: Date;

  @ApiProperty({
    type: 'date',
    required: false,
    default: new Date().toJSON().slice(0, 10),
  })
  last_modified: Date;

  @ApiProperty({ type: 'boolean', required: false })
  is_tax_included: boolean;

  @ApiProperty({ type: 'string', required: false })
  note: string;

  @ApiProperty({ type: 'number', required: false })
  sub_total: number;

  @ApiProperty({ type: 'number', required: false })
  total_disc: number;

  @ApiProperty({ type: 'number', required: false })
  total_tax: number;

  @ApiProperty({ type: 'number', required: false })
  grand_total: number;

  @ApiProperty({ type: 'number', required: false })
  ref_no: number;

  @ApiProperty({ type: 'number', required: false })
  location_id: number;

  @ApiProperty({ type: 'string', required: false })
  location_name: string;

  @ApiProperty({ type: 'number' })
  source: number;

  @ApiProperty({ type: 'boolean', required: false })
  is_closed: boolean;

  @ApiProperty({ type: 'string', required: false })
  close_reason: string;

  @ApiProperty({ type: [PurchaseOrderItemDTO], required: false })
  @Type(() => PurchaseOrderItemDTO)
  @ValidateNested({ each: true })
  items: PurchaseOrderItemDTO[];
}
