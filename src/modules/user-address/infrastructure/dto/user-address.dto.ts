import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/base/infrastructure/dto/base.dto';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { UserAddressEntity } from '../../domain/entities/user-address.entity';

export class UserAddressDTO extends BaseDTO implements UserAddressEntity {
  user?: UserEntity;

  @ApiProperty({ type: 'number' })
  user_id?: number;

  @ApiProperty({ type: 'number' })
  latitude: number;

  @ApiProperty({ type: 'number' })
  longitude: number;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string', required: false })
  street_name: string;

  @ApiProperty({ type: 'string' })
  province: string;

  @ApiProperty({ type: 'string' })
  city: string;

  @ApiProperty({ type: 'string' })
  district: string;

  @ApiProperty({ type: 'string', required: false })
  sub_district: string;

  @ApiProperty({ type: 'string', required: false })
  address: string;

  @ApiProperty({ type: 'string', required: false })
  postal_code: string;

  @ApiProperty({ type: 'string', required: false })
  note: string;

  @ApiProperty({ type: 'boolean' })
  is_default: boolean;
}
