import { NotFoundException } from '@nestjs/common';
import { BaseDeleteManager } from 'src/base/domain/usecases/managers/base-delete.manager';
import { TransactionService } from 'src/modules/transaction/data/services/transaction.service';
import { TransactionProducer } from 'src/modules/transaction/infrastructure/producers/transaction.producer';
import { TransactionEntity } from '../../entities/transaction.entity';

export class DeleteTransactionManager extends BaseDeleteManager<TransactionEntity> {
  constructor(
    protected service: TransactionService,
    protected producer: TransactionProducer,
    protected id: number,
  ) {
    super(service, id);
  }

  async prepareData(): Promise<void> {
    return;
  }

  async validation(): Promise<boolean> {
    const existing = await this.service.show(this.id);

    if (!existing)
      throw new NotFoundException(
        `Transaction with id ${this.id} doesn't exist.`,
      );

    return true;
  }

  async afterProcess(entity: string | number): Promise<void> {
    await this.producer.deleted(entity);
  }
}
