import { BaseEntity } from 'src/base/domain/entities/base.entity';
import { UserEntity } from './consumers/user.entity';
import { TransactionItemEntity } from './transaction-item.entity';

export interface TransactionEntity extends BaseEntity {
  code: string;
  date: Date;
  subtotal: number;
  total: number;
  items: TransactionItemEntity[];

  user_id?: number;
  user: UserEntity;
}
