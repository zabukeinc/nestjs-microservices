import { BaseModel } from 'src/base/data/models/base.model';
import { UserEntity } from 'src/modules/transaction/domain/entities/consumers/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TransactionModel } from '../transaction.model';

@Entity({ name: 'users' })
export class UserModel extends BaseModel implements UserEntity {
  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'phone_number' })
  phone_number: string;

  @OneToMany(() => TransactionModel, (model) => model.user, {
    cascade: ['update'],
    onUpdate: 'CASCADE',
  })
  transactions: TransactionModel[];
}
