import { BaseCreateManager } from '@base-module/domain/usecases/managers/base-create.manager';
import { UserService } from '@user-module/data/services/user.service';
import { UserProducer } from '@user-module/infrastructure/producers/user.producer';
import { UserEntity } from '../../entities/user.entity';

export class CreateUserManager extends BaseCreateManager<UserEntity> {
  constructor(
    protected service: UserService,
    protected producer: UserProducer,
    protected entity: UserEntity,
  ) {
    super(service, entity);
  }

  async prepareData(): Promise<void> {
    return;
  }

  async validation(): Promise<boolean> {
    return true;
  }

  async afterProcess(saved: UserEntity): Promise<void> {
    await this.producer.created(saved);
  }
}
