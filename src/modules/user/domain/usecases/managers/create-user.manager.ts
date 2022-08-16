import { BaseCreateManager } from 'src/base/domain/usecases/managers/base-create.manager';
import { UserService } from 'src/modules/user/data/services/user.service';
import { UserProducer } from 'src/modules/user/infrastructure/producers/user.producer';
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
