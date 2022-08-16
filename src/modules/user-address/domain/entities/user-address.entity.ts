import { BaseEntity } from 'src/base/domain/entities/base.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export interface UserAddressEntity extends BaseEntity {
  user?: UserEntity;
  user_id?: number;

  latitude: number;
  longitude: number;
  name: string;
  street_name: string;
  province: string;
  city: string;
  district: string;
  sub_district: string;
  address: string;
  postal_code: string;
  note: string;
  is_default: boolean;
}
