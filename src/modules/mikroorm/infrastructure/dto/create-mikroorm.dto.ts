import { ApiProperty } from '@nestjs/swagger';
import { MikroormEntity } from '../../domain/entities/mikroorm.entity';

export class CreateMikroormDTO implements MikroormEntity {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  code: string;

  @ApiProperty({ type: 'number' })
  age: number;

  @ApiProperty({ type: 'number', required: false, nullable: true })
  id: number;

  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
