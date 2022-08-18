import { BaseModel } from "src/base/data/models/base.model";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TransactionItemEntity } from "../../domain/entities/transaction-item.entity";
import { TransactionEntity } from "../../domain/entities/transaction.entity";
import { TransactionModel } from "./transaction.model";

@Entity({ name: 'transaction_items' })
export class TransactionItemModel extends BaseModel implements TransactionItemEntity {
  @Column('int', { name: 'transaction_id', nullable: true })
  transaction_id: number;

  @ManyToOne(() => TransactionModel, model => model.items, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'transaction_id' })
  transaction?: TransactionEntity;

  @Column('int', { name: 'product_id' })
  product_id: number;

  @Column('int', { name: 'quantity' })
  quantity: number;

  @Column('float', { name: 'price' })
  price: number;

  @Column('float', { name: 'discount' })
  discount: number;

}