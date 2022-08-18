import { BaseEntity } from 'src/base/domain/entities/base.entity';

export interface TransactionEntity extends BaseEntity {
  items: string;
  total: number;
  total_quantity: number;
  date: Date;

  user_id?: number;
}
