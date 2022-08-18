import { BaseEntity } from 'src/base/domain/entities/base.entity';

export interface UserEntity extends BaseEntity {
  name: string;
  phone_number: string;
}
