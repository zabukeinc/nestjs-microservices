import { ApiProperty } from '@nestjs/swagger';
import {
  Bundle,
  Channel,
  ProductEntity,
  ProductSku,
  Variation,
} from '@product-module/domain/entities/products/product.entity';

export class UpsertProductDTO implements ProductEntity {
  @ApiProperty({ type: 'string' })
  item_group_id: number;
  item_group_name: string;

  description: string;
  notes: string;
  sell_tax_id: number;
  buy_tax_id: number;
  sales_acct_id: number;
  cogs_acct_id: number;
  invt_acct_id: number;
  sell_this: boolean;
  buy_this: boolean;
  stock_this: boolean;
  dropship_this: boolean;
  uom_id: number;
  sell_unit: string;
  buy_unit: string;
  is_active: boolean;
  purch_acct_id: number;
  status: string;
  item_category_id: number;
  package_content: string;
  package_weight: number;
  package_height: number;
  package_width: number;
  package_length: number;
  variations: Variation[];
  sell_price: number;
  buy_price: number;
  last_modified: Date;
  brand_id: number;
  rop: number;
  is_favourite: boolean;
  use_single_image_set: boolean;
  use_serial_number: boolean;
  brand_name: string;
  sell_tax_name: string;
  buy_tax_name: string;
  sales_acct_name: string;
  invt_acct_name: string;
  cogs_acct_name: string;
  purch_acct_name: string;
  uom_name: string;
  product_skus: ProductSku[];
  channels: Channel[];
  min: number;
  max: number;
  selected_brand_name: string;
  bom_id?: any;
  store_priority_qty_treshold?: any;
  created_date: Date;
  lead_time?: any;
  is_po?: any;
  use_batch_number?: any;
  bundles: Bundle[];
}
