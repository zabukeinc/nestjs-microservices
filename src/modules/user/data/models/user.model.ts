import { BaseModel } from 'src/base/data/models/base.model';
import { UserAddressModel } from 'src/modules/user-address/data/models/user-address.model';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { UserEntity, UserGender } from '../../domain/entities/user.entity';
import { TransactionModel } from './consumers/transaction.model';
import { UserPinModel } from './user-pin.model';

@Entity({ name: 'users' })
export class UserModel extends BaseModel implements UserEntity {
  @Column('int', { name: 'refferal_id', nullable: true })
  refferal_id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'phone_number' })
  phone_number: string;

  @Column('enum', { name: 'gender', enum: UserGender })
  gender: UserGender;

  @Column('varchar', { name: 'profile_picture', nullable: true })
  profile_picture: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('date', { name: 'birthdate' })
  birthdate: Date;

  @Column('boolean', { name: 'is_active', default: true })
  is_active: boolean;

  @Column('varchar', { name: 'allergy', nullable: true })
  allergy: string;

  @Column('float', { name: 'weight', nullable: true })
  weight: number;

  @Column('int', { name: 'partner_id', nullable: true })
  partner_id: number;

  @Column('varchar', { name: 'insurance_policy_number', nullable: true })
  insurance_policy_number: string;

  @Column('varchar', { name: 'insurance_member_number', nullable: true })
  insurance_member_number: string;

  @Column('varchar', { name: 'diagnose', nullable: true })
  diagnose: string;

  @Column('boolean', { name: 'first_transaction_pharmapack', nullable: true })
  first_transaction_pharmapack: boolean;

  @Column('varchar', { name: 'member_registered_by_type', nullable: true })
  member_registered_by_type: string;

  @Column('boolean', { name: 'first_transaction_jovee', nullable: true })
  first_transaction_jovee: boolean;

  @Column('varchar', { name: 'created_by', nullable: true })
  created_by: string;

  @Column('varchar', { name: 'updated_by', nullable: true })
  updated_by: string;

  @OneToOne(() => UserPinModel, (model) => model.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  user_pin: UserPinModel;

  @OneToMany(() => UserAddressModel, (model) => model.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  user_addresses: UserAddressModel[];

  @OneToMany(() => TransactionModel, model => model.user, {
    onUpdate: 'CASCADE'
  })
  transactions: TransactionModel[]
}
