import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/data/services/base.service';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TRANSACTION_COMMAND_CONNECTION } from '../../utils/connection-name.util';
import { TransactionModel } from '../models/transaction.model';

@Injectable()
export class TransactionService extends BaseService<TransactionEntity> {
  constructor(
    @InjectRepository(TransactionModel, TRANSACTION_COMMAND_CONNECTION)
    public repository: Repository<TransactionEntity>,
  ) {
    super(repository);
  }

  relations = ['items', 'user'];
}
