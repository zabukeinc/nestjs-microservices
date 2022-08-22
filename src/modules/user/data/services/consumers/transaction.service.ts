import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@base-module/data/services/base.service';
import { TransactionEntity } from '@user-module/domain/entities/consumers/transaction.entity';
import { USER_COMMAND_CONNECTION } from '@user-module/utils/connection-name.util';
import { Repository } from 'typeorm';
import { TransactionModel } from '../../models/consumers/transaction.model';

@Injectable()
export class TransactionService extends BaseService<TransactionEntity> {
  constructor(
    @InjectRepository(TransactionModel, USER_COMMAND_CONNECTION)
    public repository: Repository<TransactionEntity>,
  ) {
    super(repository);
  }
}
