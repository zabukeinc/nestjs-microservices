import { BaseModel } from 'src/base/data/models/base.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { UserModel } from './consumers/user.model';
import { TransactionItemModel } from './transaction-item.model';

@Entity({ name: 'transactions' })
export class TransactionModel extends BaseModel implements TransactionEntity {
  @Column('varchar', { name: 'code' })
  code: string;

  @Column('date', { name: 'date' })
  date: Date;

  @Column('float', { name: 'subtotal' })
  subtotal: number;

  @Column('float', { name: 'total' })
  total: number;

  @OneToMany(() => TransactionItemModel, model => model.transaction, {
    cascade: ['insert', 'update', 'remove']
  })
  items: TransactionItemModel[];

  @Column('int', { name: 'user_id', nullable: true })
  user_id?: number;

  @ManyToOne(() => UserModel, model => model.transactions, {
    onUpdate: 'CASCADE',
    cascade: ['update']
  })
  @JoinColumn({ name: 'user_id' })
  user: UserModel;
}
