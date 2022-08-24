import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import {
  AdjustmentEntity,
  AdjustmentItemEntity,
} from '../../domain/entities/adjustment.entity';

export class AdjustmentItemDTO implements AdjustmentItemEntity {
  @ApiProperty({ type: 'number' })
  item_adj_detail_id: number;

  @ApiProperty({ type: 'number' })
  item_id: number;

  @ApiProperty({ type: 'string', required: false })
  serial_no: string;

  @ApiProperty({ type: 'number' })
  qty_in_base: number;

  @ApiProperty({ type: 'number', required: false })
  uom_id: number;

  @ApiProperty({ type: 'string' })
  unit: string;

  @ApiProperty({ type: 'string' })
  cost: string;

  @ApiProperty({ type: 'number' })
  amount: number;

  @ApiProperty({ type: 'number', required: false })
  location_id: number;

  @ApiProperty({ type: 'number' })
  account_id: number;

  @ApiProperty({ type: 'string', required: false })
  description: string;

  @ApiProperty({ type: 'string', required: false })
  batch_no: string;
}

export class AdjustmentDTO implements AdjustmentEntity {
  @ApiProperty({ type: 'string' })
  item_adj_no: string;

  @ApiProperty({ type: 'number' })
  item_adj_id: number;

  @ApiProperty({ type: 'string', required: false })
  note: string;

  @ApiProperty({ type: 'number', required: true })
  qty: number;

  @ApiProperty({
    type: 'date',
    required: true,
    default: new Date().toJSON().slice(0, 10),
  })
  transaction_date: Date;

  @ApiProperty({ type: 'number', required: true })
  price: number;

  @ApiProperty({ type: 'string', required: false })
  description: string;

  @ApiProperty({ type: 'number' })
  location_id: number;

  @ApiProperty({ type: 'boolean' })
  is_opening_balance: boolean;

  @ApiProperty({ type: [AdjustmentItemDTO], required: false })
  @Type(() => AdjustmentItemDTO)
  @ValidateNested({ each: true })
  items: AdjustmentItemDTO[];

  id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
