import { BaseEntity } from '@base-module/domain/entities/base.entity';
import { TransactionEntity } from './consumers/transaction.entity';
import { UserPinEntity } from './user-pin.entity';

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface UserEntity extends BaseEntity {
  refferal_id: number;
  name: string;
  phone_number: string;
  gender: UserGender;
  profile_picture: string;
  email: string;
  birthdate: Date;
  is_active: boolean;
  allergy: string;
  weight: number;
  partner_id: number;
  insurance_policy_number: string;
  insurance_member_number: string;
  diagnose: string;
  first_transaction_pharmapack: boolean;
  member_registered_by_type: string;
  first_transaction_jovee: boolean;
  created_by: string;
  updated_by: string;
  user_pin?: UserPinEntity;

  transactions?: TransactionEntity[];
}
