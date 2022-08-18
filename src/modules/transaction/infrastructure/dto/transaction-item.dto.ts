import { ApiProperty } from "@nestjs/swagger";
import { BaseDTO } from "src/base/infrastructure/dto/base.dto";
import { TransactionItemEntity } from "../../domain/entities/transaction-item.entity";
import { TransactionEntity } from "../../domain/entities/transaction.entity";

export class TransactionItemDTO extends BaseDTO implements TransactionItemEntity {
  transaction?: TransactionEntity;

  @ApiProperty({ type: 'number' })
  product_id: number;

  @ApiProperty({ type: 'number' })
  quantity: number;
  
  @ApiProperty({ type: 'number' })
  price: number;

  @ApiProperty({ type: 'number' })
  discount: number;
}