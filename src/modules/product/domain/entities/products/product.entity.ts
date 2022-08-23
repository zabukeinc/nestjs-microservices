export interface Variation {
  label: string;
  values: string[];
}

export interface VariationValue {
  label: string;
  value: string;
}

export interface Price {
  store_id: number;
  channel_id: number;
  sell_price: number;
}

export interface ChannelInfo {
  image_url: string;
  channel_id: number;
}

export interface Image {
  item_id: number;
  image_id: number;
  cloud_key: string;
  thumbnail: string;
  file_name: string;
  sequence_number: number;
  channel_info: ChannelInfo[];
}

export interface ProductSku {
  item_id: number;
  item_code: string;
  sell_price: number;
  end_qty: number;
  average_cost: number;
  amount: number;
  barcode?: any;
  variation_values: VariationValue[];
  prices: Price[];
  images: Image[];
}

export interface PickupPoint {
  code: string;
  name: string;
  updatedBy: string;
  createdDate: number;
  updatedDate: number;
}

export interface ExtraInfo {
  token: string;
  clientName: string;
  merchantId: string;
  clientSecret: string;
  pickupPoints: PickupPoint[];
  refreshToken: string;
  clientPassword: string;
  merchantPassword: string;
  merchantUserName: string;
}

export interface Channel {
  channel_id: number;
  channel_name: string;
  store_name: string;
  store_id: number;
  extra_info: ExtraInfo;
  channel_full_name: string;
  attributes: any[];
  channel_url: string;
  channel_category_id: number;
  sell_here: boolean;
  channel_item_id: number;
}

export interface Bundle {
  bom_comp_id: number;
  item_code: string;
  item_id: number;
  item_name: string;
  qty: number;
  thumbnail: string;
  unit?: any;
  uom_id: number;
}

export interface ProductEntity {
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
