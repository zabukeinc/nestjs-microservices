import { NotFoundException } from '@nestjs/common';
import { BaseCreateManager } from 'src/base/domain/usecases/managers/base-create.manager';
import { TransactionService } from 'src/modules/transaction/data/services/transaction.service';
import { UserService } from 'src/modules/transaction/data/services/user.service';
import { TransactionProducer } from 'src/modules/transaction/infrastructure/producers/transaction.producer';
import { TransactionEntity } from '../../entities/transaction.entity';

export class CreateTransactionManager extends BaseCreateManager<TransactionEntity> {
  constructor(
    protected service: TransactionService,
    protected userService: UserService,
    protected producer: TransactionProducer,
    protected entity: TransactionEntity,
  ) {
    super(service, entity);
  }

  async prepareData(): Promise<void> {
    const user = await this.userService.show(this.entity.user_id);

    if (!user) throw new NotFoundException('User not found');

    Object.assign(this.entity, { user });

    return;
  }

  async validation(): Promise<boolean> {
    return true;
  }

  async afterProcess(saved: TransactionEntity): Promise<void> {
    await this.producer.created(saved);
  }
}
