import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseDTO } from 'src/base/infrastructure/dto/base.dto';
import { UserEntity } from '../../domain/entities/consumers/user.entity';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionItemDTO } from './transaction-item.dto';

export class TransactionDTO extends BaseDTO implements TransactionEntity {
  @ApiProperty({ type: 'string' })
  code: string;

  @ApiProperty({ type: 'date', default: new Date().toJSON().slice(0, 10) })
  date: Date;

  @ApiProperty({ type: 'number' })
  subtotal: number;

  @ApiProperty({ type: 'number' })
  total: number;

  @ApiProperty({ type: [TransactionItemDTO] })
  @ValidateNested({ each: true })
  @Type(() => TransactionItemDTO)
  items: TransactionItemDTO[];

  @ApiProperty({ type: 'number' })
  user_id: number;

  user: UserEntity;
}
