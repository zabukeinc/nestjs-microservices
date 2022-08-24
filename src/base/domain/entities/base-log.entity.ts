import { BaseEntity } from './base.entity';

export interface BaseLogEntity extends BaseEntity {
  action: string;
  order_id?: number;
  request: string;
  response: string;
  status_code: number;
  endpoint?: string;
}
