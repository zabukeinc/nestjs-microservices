import { BaseModel } from '@base-module/data/models/base.model';
import { TransactionEntity } from '@user-module/domain/entities/consumers/transaction.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserModel } from '@user-module/data/models/user.model';

@Entity({ name: 'transactions' })
export class TransactionModel extends BaseModel implements TransactionEntity {
  @Column('json', { name: 'items' })
  items: string;

  @Column('float', { name: 'total' })
  total: number;

  @Column('int', { name: 'total_quantity' })
  total_quantity: number;

  @Column('date', { name: 'date' })
  date: Date;

  @Column('int', { name: 'user_id', nullable: true })
  user_id: number;

  @ManyToOne(() => UserModel, (model) => model.transactions, {
    cascade: ['update'],
  })
  @JoinColumn({ name: 'user_id' })
  user: UserModel;
}
