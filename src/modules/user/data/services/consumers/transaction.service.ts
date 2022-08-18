import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/data/services/base.service';
import { TransactionEntity } from 'src/modules/user/domain/entities/consumers/transaction.entity';
import { USER_COMMAND_CONNECTION } from 'src/modules/user/utils/connection-name.util';
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
