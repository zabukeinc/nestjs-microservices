import { BadRequestException, Injectable } from '@nestjs/common';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { BaseOrchestrator } from 'src/base/domain/usecases/base.orchestrator';
import { TransactionService } from '../../data/services/transaction.service';
import { UserService } from '../../data/services/user.service';
import { TransactionProducer } from '../../infrastructure/producers/transaction.producer';
import { TransactionEntity } from '../entities/transaction.entity';
import { CreateTransactionManager } from './managers/create-transaction.manager';
import { DeleteTransactionManager } from './managers/delete-transaction.manager';
import { UpdateTransactionManager } from './managers/update-transaction.manager';

@Injectable()
export class TransactionOrchestrator extends BaseOrchestrator<TransactionEntity> {
  constructor(
    protected service: TransactionService,
    protected userService: UserService,
    protected producer: TransactionProducer,
  ) {
    super(service);
  }

  async show(id: number): Promise<TransactionEntity> {
    return await this.service.show(id);
  }

  async index(
    page: number,
    limit: number,
  ): Promise<Pagination<TransactionEntity, IPaginationMeta>> {
    return await this.service.index(
      {
        page,
        limit,
        route: 'transactions',
      },
      this.service.repository.createQueryBuilder('transactions'),
    );
  }

  async create(entity: TransactionEntity): Promise<TransactionEntity> {
    return await new CreateTransactionManager(
      this.service,
      this.userService,
      this.producer,
      entity,
    ).execute();
  }

  async update(id: number, entity: TransactionEntity): Promise<TransactionEntity> {
    return await new UpdateTransactionManager(
      this.service,
      this.producer,
      id,
      entity,
    ).execute();
  }

  async delete(id: number): Promise<string> {
    const deleted = await new DeleteTransactionManager(
      this.service,
      this.producer,
      id,
    ).execute();

    if (deleted) return 'Succesfully deleted';
    throw new BadRequestException('Error while deleting data');
  }
}
