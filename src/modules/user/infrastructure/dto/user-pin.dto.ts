import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';
import { UserPinEntity } from '../../domain/entities/user-pin.entity';

export class UserPinDTO implements UserPinEntity {
  @ApiProperty({ type: 'number', required: true })
  user_id?: number;

  @ApiProperty({ type: 'string' })
  @MaxLength(10)
  pin: string;
}
