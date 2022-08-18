import { BaseEntity } from 'src/base/domain/entities/base.entity';
import { TransactionEntity } from './transaction.entity';

export interface TransactionItemEntity extends BaseEntity {
  transaction?: TransactionEntity;
  product_id: number;
  quantity: number;
  price: number;
  discount: number;
}
