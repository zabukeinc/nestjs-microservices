export interface PurchaseOrderItemEntity {
  purchaseorder_detail_id: number;
  item_id: number;
  item_code: string;
  item_name: string;
  description: number;
  tax_id: number;
  price: number;
  buy_price: number;
  original_price: number;
  rate: number;
  tax_name: string;
  unit: string;
  qty: number;
  uom_id: number;
  qty_in_base: number;
  disc: number;
  disc_amount: number;
  tax_amount: number;
  amount: number;
  location_id: number;
}

export interface PurchaseOrderEntity {
  purchaseorder_id: number;
  purchaseorder_no: string;
  bill_id: number;
  bill_no: string;
  payment_method: number;
  contact_id: number;
  supplier_name: string;
  transaction_date: Date;
  created_date: Date;
  last_modified: Date;
  is_tax_included: boolean;
  note: string;
  sub_total: number;
  total_disc: number;
  total_tax: number;
  grand_total: number;
  ref_no: number;
  location_id: number;
  location_name: string;
  source: number;
  is_closed: boolean;
  close_reason: string;
  items: PurchaseOrderItemEntity[];
}
