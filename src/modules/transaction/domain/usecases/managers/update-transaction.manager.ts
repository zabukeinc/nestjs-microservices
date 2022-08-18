import { BaseUpdateManager } from 'src/base/domain/usecases/managers/base-update.manager';
import { TransactionService } from 'src/modules/transaction/data/services/transaction.service';
import { TransactionProducer } from 'src/modules/transaction/infrastructure/producers/transaction.producer';
import { TransactionEntity } from '../../entities/transaction.entity';


export class UpdateTransactionManager extends BaseUpdateManager<TransactionEntity> {
  constructor(
    protected service: TransactionService,
    protected producer: TransactionProducer,
    protected id: number,
    protected entity: TransactionEntity,
  ) {
    super(service, id, entity);
  }

  async prepareData(): Promise<void> {
    return;
  }

  async validation(): Promise<boolean> {
    return true;
  }

  async afterProcess(
    newEntity: TransactionEntity,
    oldEntity: TransactionEntity,
  ): Promise<void> {
    await this.producer.changed(newEntity, oldEntity);
  }
}
