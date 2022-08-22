import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn } from 'class-validator';
import { BaseDTO } from '@base-module/infrastructure/dto/base.dto';
import { UserEntity, UserGender } from '../../domain/entities/user.entity';

export class UserDTO extends BaseDTO implements UserEntity {
  @ApiProperty({ type: 'number', required: false })
  refferal_id: number;

  @ApiProperty({
    type: 'string',
    required: true,
    maxLength: 100,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    pattern: '^([+]([0-9]{8,15}))$',
  })
  phone_number: string;

  @ApiProperty({ type: 'enum', enum: UserGender })
  @IsIn(Object.values(UserGender))
  gender: UserGender;

  @ApiProperty({ type: 'string', required: false, nullable: true })
  profile_picture: string;

  @ApiProperty({ type: 'string', required: false, default: 'mail@me.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'date',
    required: true,
    default: new Date().toJSON().slice(0, 10),
  })
  birthdate: Date;

  @ApiProperty({ type: 'boolean', required: true })
  is_active: boolean;

  @ApiProperty({ type: 'string', required: false })
  allergy: string;

  @ApiProperty({ type: 'number', required: false })
  weight: number;

  @ApiProperty({ type: 'number', required: false })
  partner_id: number;

  @ApiProperty({ type: 'string', required: false })
  insurance_policy_number: string;

  @ApiProperty({ type: 'string', required: false })
  insurance_member_number: string;

  @ApiProperty({ type: 'string', required: false })
  diagnose: string;

  @ApiProperty({ type: 'boolean', required: false })
  first_transaction_pharmapack: boolean;

  @ApiProperty({ type: 'string', required: false })
  member_registered_by_type: string;

  @ApiProperty({ type: 'boolean', required: false })
  first_transaction_jovee: boolean;

  @ApiProperty({ type: 'string', required: false })
  created_by: string;

  @ApiProperty({ type: 'string', required: false })
  updated_by: string;
}
